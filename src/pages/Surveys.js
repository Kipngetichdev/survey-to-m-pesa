import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../services/firebase';
import SurveyCard from '../components/SurveyCard';

// OpenTDB categories (use exact API names)
const CATEGORIES = [
  'General Knowledge',
  'Entertainment: Books',
  'Entertainment: Film',
  'Entertainment: Music',
  'Science & Nature',
  'Sports',
  'History',
  'Geography',
  'Art',
];

// Normalize category names for display
const normalizeCategoryName = (name) => name.replace(/Entertainment: |Science: /g, '');

const Surveys = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

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
        }
      } else {
        toast.error('Please log in to view categories.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-secondary-light text-secondary-contrast min-h-screen">
      <section className="py-8 bg-primary-main text-primary-contrast text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome, {userName || 'User'}!
          </h2>
          <p className="text-base md:text-lg mt-2 max-w-2xl mx-auto">
            Explore categories and complete tasks to earn M-Pesa rewards.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-main text-center mb-8">
            Available Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <SurveyCard
                key={category}
                item={{ name: normalizeCategoryName(category) }}
                type="category"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Surveys;