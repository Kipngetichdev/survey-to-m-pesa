import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

// Utility functions
const decodeHtmlEntities = (str) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getRandomDuration = () => {
  const range = [1.5, 2];
  return (Math.random() * (range[1] - range[0]) + range[0]).toFixed(1) + ' min';
};

const generateUniqueRewards = (count) => {
  const rewards = new Set();
  const min = 4, max = 8;
  while (rewards.size < count) {
    const reward = (Math.random() * (max - min) + min).toFixed(2);
    rewards.add(reward);
  }
  return Array.from(rewards).map((reward) => `KES ${reward}`);
};

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

// Custom hook for OpenTDB API calls with retry logic
const useOpenTDBAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (endpoint, options = {}, retryCount = 0, maxRetries = 3) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://opentdb.com/${endpoint}`, options);
      
      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Rate limit hit, retrying after ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return apiCall(endpoint, options, retryCount + 1, maxRetries);
        } else {
          throw new Error('Max retries reached due to rate limiting');
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.response_code && data.response_code !== 0) {
        const errorMessages = {
          1: 'No results found for this category',
          2: 'Invalid parameter in API request',
          3: 'Session not found',
          4: 'Invalid token provided'
        };
        throw new Error(errorMessages[data.response_code] || `API error: ${data.response_code}`);
      }

      return data;
    } catch (err) {
      console.error(`OpenTDB API Error (${endpoint}):`, err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { apiCall, isLoading, error };
};

const TaskData = ({ renderTask, renderEmpty, category = 'General Knowledge', user }) => {
  const location = useLocation();
  const { categoryId: stateCategoryId, categoryName: stateCategoryName, displayName } = location.state || {};
  
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledCategories, setDisabledCategories] = useState({});
  const [categoryCooldowns, setCategoryCooldowns] = useState({});
  const [categories, setCategories] = useState([]);

  // Use state data if available, otherwise use props
  const effectiveCategory = stateCategoryName || category;
  const effectiveCategoryId = stateCategoryId;
  const effectiveDisplayName = displayName || effectiveCategory;

  const { apiCall, isLoading: apiLoading, error: apiError } = useOpenTDBAPI();

  // Normalize category names
  const normalizeCategoryName = (name) => name.replace(/Entertainment: |Science: /g, '');

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
        console.log('User cooldowns loaded:', Object.keys(disabled).length, 'categories disabled');
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

  // Fetch categories (used for metadata generation)
  const fetchCategories = useCallback(async () => {
    try {
      const cachedCategories = localStorage.getItem('opentdb_categories');
      if (cachedCategories) {
        const parsed = JSON.parse(cachedCategories);
        setCategories(parsed);
        return parsed;
      }

      const data = await apiCall('api_category.php');
      const allCategories = data.trivia_categories;
      
      // Cache and set categories
      localStorage.setItem('opentdb_categories', JSON.stringify(allCategories));
      setCategories(allCategories);
      return allCategories;
      
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Use minimal category data for metadata
      setCategories([{ id: effectiveCategoryId, name: effectiveCategory }]);
      return [{ id: effectiveCategoryId, name: effectiveCategory }];
    }
  }, [apiCall, effectiveCategoryId, effectiveCategory]);

  // Main function to fetch quizzes from OpenTDB
  const fetchQuizzesFromAPI = useCallback(async () => {
    if (!effectiveCategoryId) {
      throw new Error('No category ID provided');
    }

    console.log(`Fetching quizzes for category ${effectiveCategory} (ID: ${effectiveCategoryId})`);
    
    try {
      // Generate metadata first
      const allCategories = await fetchCategories();
      const metadata = getTierMetadata(allCategories);
      
      // Check cache first
      const cacheKey = `opentdb_quizzes_${effectiveCategoryId}`;
      const cachedQuizzes = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_timestamp`);
      const cacheExpiry = 30 * 60 * 1000; // 30 minutes
      
      if (cachedQuizzes && cacheTime && (Date.now() - parseInt(cacheTime)) < cacheExpiry) {
        try {
          const parsedQuizzes = JSON.parse(cachedQuizzes);
          if (parsedQuizzes.length > 0) {
            console.log(`Using cached quizzes for ${effectiveCategory}: ${parsedQuizzes.length} questions`);
            setSurveys(parsedQuizzes);
            return parsedQuizzes;
          }
        } catch (parseError) {
          console.log('Cache corrupted, fetching fresh data');
          localStorage.removeItem(cacheKey);
          localStorage.removeItem(`${cacheKey}_timestamp`);
        }
      }

      // Fetch fresh quizzes from OpenTDB
      const data = await apiCall(
        `api.php?amount=10&type=multiple&category=${effectiveCategoryId}`,
        { method: 'GET' }
      );

      if (!data.results || data.results.length === 0) {
        throw new Error('No questions available for this category');
      }

      // Process and transform API data
      const processedQuizzes = data.results.map((question, index) => {
        // Decode HTML entities
        const decodedQuestion = decodeHtmlEntities(question.question);
        const decodedCorrect = decodeHtmlEntities(question.correct_answer);
        const decodedIncorrect = question.incorrect_answers.map(decodeHtmlEntities);
        
        // Shuffle incorrect answers for variety
        const shuffledIncorrect = shuffleArray(decodedIncorrect);
        
        return {
          id: `quiz-${effectiveCategoryId}-${index}-${Date.now()}`,
          title: decodedQuestion,
          description: `Answer this ${question.difficulty} question about ${effectiveDisplayName}`,
          question: decodedQuestion,
          correct_answer: decodedCorrect,
          incorrect_answers: shuffledIncorrect,
          options: shuffleArray([...shuffledIncorrect, decodedCorrect]), // Shuffle all options
          reward: metadata.rewards[effectiveCategoryId] || `KES ${(4 + Math.random() * 4).toFixed(2)}`,
          type: 'quiz',
          category: effectiveCategory,
          displayCategory: effectiveDisplayName,
          categoryId: effectiveCategoryId,
          difficulty: question.difficulty,
          duration: metadata.duration,
          timestamp: Date.now(),
          source: 'opentdb',
          apiData: question // Keep original for reference
        };
      });

      // Cache the results
      localStorage.setItem(cacheKey, JSON.stringify(processedQuizzes));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

      console.log(`✅ Fetched ${processedQuizzes.length} fresh quizzes from OpenTDB`);
      setSurveys(processedQuizzes);
      return processedQuizzes;

    } catch (error) {
      console.error(`❌ Failed to fetch quizzes for ${effectiveCategory}:`, error);
      
      if (error.message.includes('No questions available')) {
        toast.warning(`${effectiveDisplayName} category is temporarily unavailable. Please try another category.`);
      } else {
        toast.error(`Failed to load ${effectiveDisplayName} quizzes. Please try again.`);
      }
      
      // Clear invalid cache
      const cacheKey = `opentdb_quizzes_${effectiveCategoryId}`;
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(`${cacheKey}_timestamp`);
      
      throw error;
    }
  }, [effectiveCategoryId, effectiveCategory, effectiveDisplayName, apiCall, fetchCategories]);

  // Main data loading effect
  useEffect(() => {
    console.log('=== TASKDATA INITIALIZATION ===');
    console.log('Category:', effectiveCategory);
    console.log('Category ID:', effectiveCategoryId);
    console.log('Display Name:', effectiveDisplayName);
    console.log('User:', user ? `${user.email} (authenticated)` : 'Not authenticated');

    if (!user) {
      console.log('No user - redirecting to login');
      toast.error('Please log in to continue.');
      return;
    }

    if (!effectiveCategoryId) {
      console.error('No category ID - cannot load quizzes');
      toast.error('Invalid category. Please select a category first.');
      return;
    }

    const loadQuizzes = async () => {
      try {
        setIsLoading(true);
        setSurveys([]); // Clear previous results
        
        console.log('Step 1: Loading user cooldowns...');
        await fetchUserHistory();
        
        console.log('Step 2: Loading quizzes from OpenTDB...');
        await fetchQuizzesFromAPI();
        
        console.log('✅ Quiz loading completed successfully');
        
      } catch (error) {
        console.error('❌ Quiz loading failed:', error);
        setSurveys([]); // Clear any partial results
        
        // Show empty state with retry option
        if (renderEmpty) {
          const retryAction = (
            <button
              onClick={fetchQuizzesFromAPI}
              className="underline hover:no-underline"
            >
              Try Again
            </button>
          );
          toast.error(
            `Failed to load ${effectiveDisplayName} quizzes. ${retryAction}`,
            { 
              autoClose: false,
              toastId: `quiz-load-error-${effectiveCategoryId}`
            }
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Add small delay to prevent flash of empty content
    const timer = setTimeout(() => {
      loadQuizzes();
    }, 100);

    return () => clearTimeout(timer);
  }, [effectiveCategoryId, user, fetchQuizzesFromAPI, renderEmpty, effectiveDisplayName]);

  // Show API errors
  useEffect(() => {
    if (apiError) {
      toast.error(`API Error: ${apiError}`);
    }
  }, [apiError]);

  // Loading state
  if (isLoading || apiLoading) {
    console.log('Showing loading state for:', effectiveDisplayName);
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, index) => (
          renderTask(
            { 
              id: `loading-${index}`, 
              title: 'Loading...',
              isLoading: true,
              category: effectiveDisplayName 
            }, 
            true
          )
        ))}
      </div>
    );
  }

  // Empty state
  if (surveys.length === 0 && !isLoading) {
    console.log('No quizzes available for:', effectiveDisplayName);
    return renderEmpty ? renderEmpty({
      categoryName: effectiveDisplayName,
      categoryId: effectiveCategoryId,
      retryAction: () => fetchQuizzesFromAPI()
    }) : null;
  }

  // Success state - render quizzes
  console.log(`Rendering ${surveys.length} quizzes for ${effectiveDisplayName}`);
  console.log('Quiz sources:', surveys.map(q => q.source).filter(Boolean));
  
  return (
    <div className="space-y-4">
      {surveys.map((quiz) => 
        renderTask(
          {
            ...quiz,
            isDisabled: disabledCategories[effectiveCategoryId],
            cooldownSeconds: categoryCooldowns[effectiveCategoryId],
          },
          false
        )
      )}
    </div>
  );
};

export default TaskData;