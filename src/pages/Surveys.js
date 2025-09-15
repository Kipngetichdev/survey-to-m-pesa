import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../services/firebase';

const Surveys = () => {
  const [userName, setUserName] = useState('');
  const [surveys, setSurveys] = useState([]);
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
          const querySnapshot = await getDocs(collection(db, 'surveys'));
          const surveysData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSurveys(surveysData);
        } catch (error) {
          toast.error('Failed to fetch data. Please try again.');
        }
      } else {
        toast.error('Please log in to view surveys.');
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
            Explore and participate in surveys to earn M-Pesa rewards.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-main text-center mb-8">
            Available Surveys
          </h3>
          {surveys.length === 0 ? (
            <p className="text-center text-base md:text-lg text-secondary-contrast">
              No surveys available at the moment. Check back later!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-primary-contrast rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h4 className="text-xl font-semibold text-primary-main mb-2">{survey.title}</h4>
                  <p className="text-base text-secondary-contrast mb-4">{survey.description}</p>
                  <p className="text-base font-medium text-accent-main">
                    Reward: KES {survey.reward}
                  </p>
                  <button
                    className="mt-4 w-full bg-accent-main text-primary-contrast px-4 py-2 rounded-lg hover:bg-accent-light focus:ring-2 focus:ring-accent-main focus:outline-none transition-all duration-200 transform hover:scale-105"
                    aria-label={`Participate in ${survey.title}`}
                    onClick={() => toast.info(`Participating in ${survey.title} (Not implemented yet)`)}
                  >
                    Take Survey
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Surveys;