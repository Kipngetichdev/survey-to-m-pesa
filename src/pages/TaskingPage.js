import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../services/firebase';
import TaskData from '../components/TaskData';
import SurveyCard from '../components/SurveyCard';

// Normalize category names for display
const normalizeCategoryName = (name) => name.replace(/Entertainment: |Science: /g, '');

const TaskingPage = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // Trigger manual refresh
  const navigate = useNavigate();
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) : 'General Knowledge';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name || user.email);
            toast.success(`Welcome back, ${userDoc.data().name || user.email}!`, {
              autoClose: 3000,
            });
          }
        } catch (error) {
          toast.error('Failed to fetch user data. Please try again.');
          console.error('User data fetch error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.error('Please log in to view tasks.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Trigger TaskData re-fetch
    localStorage.removeItem(`opentdb_surveys_${CATEGORIES.find((c) => normalizeCategoryName(c.name) === decodedCategory)?.id}`);
    toast.info('Refreshing tasks...');
  };

  // Static categories to match TaskData.js
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

  if (isLoading) {
    return (
      <div className="bg-secondary-light text-secondary-contrast min-h-screen flex items-center justify-center" aria-live="polite">
        <p className="text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary-light text-secondary-contrast min-h-screen">
      <section className="py-8 bg-primary-main text-primary-contrast text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome, {userName || 'User'}!
          </h2>
          <p className="text-base md:text-lg mt-2 max-w-2xl mx-auto">
            Complete tasks in {normalizeCategoryName(decodedCategory)} to earn M-Pesa rewards.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-main">
              {normalizeCategoryName(decodedCategory)} Tasks
            </h3>
            <button
              onClick={handleRefresh}
              className="bg-accent-main text-primary-contrast px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
              aria-label="Refresh tasks"
            >
              Refresh Tasks
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TaskData
              key={refreshKey} // Force re-render on refresh
              category={decodedCategory}
              user={auth.currentUser}
              renderTask={(task, isLoading) =>
                isLoading ? (
                  <SurveyCard key={`skeleton-task-${task.id || Math.random()}`} isLoading />
                ) : (
                  <SurveyCard key={task.id} item={task} type="task" />
                )
              }
              renderEmpty={() => (
                <p className="text-center text-base md:text-lg text-secondary-contrast col-span-full">
                  No tasks available for {normalizeCategoryName(decodedCategory)}. Try another category!
                </p>
              )}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskingPage;