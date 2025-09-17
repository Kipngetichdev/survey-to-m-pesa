import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

// Static categories to match Surveys.js
const CATEGORIES = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 17, name: 'Science & Nature' },
  { id: 21, name: 'Sports' },
  { id: 23, name: 'History' },
  { id: 22, name: 'Geography' },
  { id: 25, name: 'Art' },
];

// Generate random duration for free tier (1.5–2 min)
const getRandomDuration = () => {
  const range = [1.5, 2];
  return (Math.random() * (range[1] - range[0]) + range[0]).toFixed(1) + ' min';
};

// Generate unique rewards for free tier (KES 4–8)
const generateUniqueRewards = (count) => {
  const rewards = new Set();
  const min = 4,
    max = 8;
  while (rewards.size < count) {
    const reward = (Math.random() * (max - min) + min).toFixed(2);
    rewards.add(reward);
  }
  return Array.from(rewards).map((reward) => `KES ${reward}`);
};

// Get or set fixed duration and rewards for free tier
const getTierMetadata = (categories = []) => {
  const key = 'freeTierMetadata';
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  const metadata = {
    duration: getRandomDuration(),
    rewards: categories.reduce((acc, category, index) => {
      acc[category.id] = generateUniqueRewards(categories.length)[index] || `KES 4.00`;
      return acc;
    }, {}),
  };
  localStorage.setItem(key, JSON.stringify(metadata));
  return metadata;
};

const TaskData = ({ renderTask, renderEmpty, category = 'General Knowledge', user }) => {
  const [surveys, setSurveys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [disabledCategories, setDisabledCategories] = useState({});
  const [categoryCooldowns, setCategoryCooldowns] = useState({});

  // Normalize category names by removing prefixes
  const normalizeCategoryName = (name) => name.replace(/Entertainment: |Science: /g, '');

  // Fetch categories from OpenTDB
  const fetchCategories = async (retryCount = 0, maxRetries = 3) => {
    console.log('Fetching categories...');
    const cachedCategories = JSON.parse(localStorage.getItem('opentdb_categories'));
    if (cachedCategories && cachedCategories.length > 0) {
      console.log('Using cached categories:', cachedCategories.map((c) => c.name));
      setCategories(cachedCategories);
      setCategoriesLoaded(true);
      return;
    }

    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 5000;
          console.log(`Rate limit hit for categories, retrying after ${delay}ms (attempt ${retryCount + 1})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchCategories(retryCount + 1, maxRetries);
        } else {
          throw new Error('Max retries reached for OpenTDB categories API');
        }
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.trivia_categories || data.trivia_categories.length === 0) {
        throw new Error('No categories returned from OpenTDB API');
      }
      const allCategories = data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
      const metadata = getTierMetadata(allCategories);
      const processedCategories = allCategories.map((category) => ({
        ...category,
        name: normalizeCategoryName(category.name),
        duration: metadata.duration,
        reward: metadata.rewards[category.id] || `KES 4.00`,
        tier: 'free',
      }));
      setCategories(processedCategories);
      localStorage.setItem('opentdb_categories', JSON.stringify(processedCategories));
      setCategoriesLoaded(true);
      console.log('Categories fetched and cached:', processedCategories.map((c) => c.name));
    } catch (error) {
      toast.error('Failed to fetch categories. Using cached data or fallback.');
      console.error('Error fetching OpenTDB categories:', error);
      const cachedCategories = JSON.parse(localStorage.getItem('opentdb_categories'));
      if (cachedCategories && cachedCategories.length > 0) {
        setCategories(cachedCategories);
        setCategoriesLoaded(true);
      } else {
        const staticCategories = CATEGORIES.map((cat) => ({
          ...cat,
          name: normalizeCategoryName(cat.name),
          duration: getRandomDuration(),
          reward: `KES ${((Math.random() * (8 - 4) + 4).toFixed(2))}`,
          tier: 'free',
        }));
        setCategories(staticCategories);
        setCategoriesLoaded(true);
        console.log('Using static categories:', staticCategories.map((c) => c.name));
      }
    }
  };

  // Fetch user history for cooldowns
  const fetchUserHistory = async () => {
    if (!user) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const history = userDoc.data().history || [];
        const now = new Date();
        const disabled = {};
        const cooldowns = {};
        history.forEach(({ categoryId, completedAt }) => {
          if (completedAt) {
            const completedTime = new Date(completedAt);
            const diffSeconds = (now - completedTime) / 1000;
            const cooldownDuration = 5 * 60; // 5 minutes
            if (diffSeconds < cooldownDuration) {
              disabled[categoryId] = true;
              cooldowns[categoryId] = Math.ceil(cooldownDuration - diffSeconds);
            }
          }
        });
        setDisabledCategories(disabled);
        setCategoryCooldowns(cooldowns);
        console.log('User history fetched:', { disabled, cooldowns });
      }
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };

  // Update countdown timers
  useEffect(() => {
    if (Object.keys(categoryCooldowns).length === 0) return;

    const timer = setInterval(() => {
      setCategoryCooldowns((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((categoryId) => {
          const remainingSeconds = updated[categoryId] - 1;
          if (remainingSeconds <= 0) {
            delete updated[categoryId];
            setDisabledCategories((prevDisabled) => {
              const newDisabled = { ...prevDisabled };
              delete newDisabled[categoryId];
              return newDisabled;
            });
          } else {
            updated[categoryId] = remainingSeconds;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [categoryCooldowns]);

  // Fetch surveys from OpenTDB
  const fetchSurveys = async (retryCount = 0, maxRetries = 3) => {
    if (!categoriesLoaded) {
      console.log('Waiting for categories to load');
      return;
    }

    setIsLoading(true);
    setSurveys([]); // Clear previous surveys
    console.log(`Starting fetch for category: ${category}`);

    const cachedCategories = JSON.parse(localStorage.getItem('opentdb_categories')) || categories;
    const selectedCategory = cachedCategories.find((cat) => cat.name === normalizeCategoryName(category)) ||
                            CATEGORIES.find((cat) => cat.name === normalizeCategoryName(category));
    if (!selectedCategory) {
      toast.error(`Category "${category}" not found.`);
      console.error(`Category "${category}" not found in categories:`, cachedCategories.map((c) => c.name));
      setIsLoading(false);
      return;
    }
    const categoryId = selectedCategory.id;
    const cacheKey = `opentdb_surveys_${categoryId}`;
    console.log(`Fetching surveys for category: ${category} (ID: ${categoryId})`);

    // Clear cache to force fresh fetch
    localStorage.removeItem(cacheKey);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${categoryId}`
      );
      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 5000;
          console.log(`Rate limit hit, retrying after ${delay}ms (attempt ${retryCount + 1})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchSurveys(retryCount + 1, maxRetries);
        } else {
          throw new Error('Max retries reached for OpenTDB API');
        }
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.response_code === 0) {
        const metadata = getTierMetadata(cachedCategories);
        const surveysData = data.results.map((q, index) => ({
          id: `opentdb-${categoryId}-${index}-${Date.now()}`,
          title: q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
          description: 'Answer this multiple-choice question to earn rewards.',
          reward: metadata.rewards[categoryId] || `KES 4.00`,
          type: 'survey',
          category: normalizeCategoryName(q.category),
          categoryId: categoryId,
          difficulty: q.difficulty,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          duration: metadata.duration,
          timestamp: Date.now(),
        }));
        setSurveys(surveysData);
        localStorage.setItem(cacheKey, JSON.stringify(surveysData));
        console.log(`Surveys fetched for category ID ${categoryId}:`, surveysData.length);
      } else {
        throw new Error('OpenTDB API error: Response code ' + data.response_code);
      }
    } catch (error) {
      toast.error('Failed to fetch surveys. Please try again.');
      console.error(`Error fetching surveys for category ${category}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('TaskData useEffect triggered with category:', category);
    setSurveys([]); // Reset surveys
    setIsLoading(true);
    fetchCategories().then(() => {
      fetchUserHistory();
      fetchSurveys();
    });
  }, [category, user]); // Re-run on category or user change

  if (isLoading) {
    console.log('Rendering loading state for category:', category);
    return (
      <>
        {Array(3)
          .fill()
          .map((_, index) => renderTask({ id: `loading-${index}` }, true))}
      </>
    );
  }

  if (surveys.length === 0 && renderEmpty) {
    console.log('No surveys available for category:', category);
    return renderEmpty();
  }

  console.log('Rendering surveys:', surveys.length);
  return surveys.map((survey) =>
    renderTask(
      {
        ...survey,
        isDisabled: disabledCategories[survey.categoryId],
        cooldownSeconds: categoryCooldowns[survey.categoryId],
      },
      false
    )
  );
};

export default TaskData;