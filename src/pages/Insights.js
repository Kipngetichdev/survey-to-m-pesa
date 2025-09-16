import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Insights = () => {
  const [stats, setStats] = useState({
    surveysTaken: 0,
    correctAnswers: 0,
    rewardsEarned: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error('Please log in to access insights.');
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch user stats from Firebase
  useEffect(() => {
    if (stats.surveysTaken !== 0) return;

    const fetchStats = async () => {
      if (!auth.currentUser) return;
      setIsLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setStats({
            surveysTaken: data.surveysTaken || 10,
            correctAnswers: data.correctAnswers || 7,
            rewardsEarned: data.rewardsEarned || 50,
          });
        } else {
          toast.error('No user data found.');
          setStats({
            surveysTaken: 10,
            correctAnswers: 7,
            rewardsEarned: 50,
          });
        }
      } catch (error) {
        toast.error('Failed to load insights. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Chart data and options
  const chartData = {
    labels: ['Surveys Taken', 'Correct Answers', 'Rewards Earned'],
    datasets: [
      {
        label: 'User Stats',
        data: [stats.surveysTaken, stats.correctAnswers, stats.rewardsEarned],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderColor: ['#1d4ed8', '#059669', '#d97706'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Statistics',
      },
    },
  };

  return (
    <div className="bg-secondary-light text-secondary-contrast min-h-screen">
      <section className="py-8 bg-primary-main text-primary-contrast text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Insights</h3>
          <p className="text-base md:text-lg mt-2 max-w-2xl mx-auto">
            View your survey performance, trends, and personalized recommendations.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center" aria-busy="true">
              <svg
                className="animate-spin h-8 w-8 text-accent-main"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <div
              className="bg-primary-contrast p-6 sm:p-8 rounded-lg shadow-md"
              aria-label="User statistics bar chart"
              style={{ height: '300px' }}
            >
              {stats.surveysTaken === 0 ? (
                <p className="text-secondary-contrast">No data available.</p>
              ) : (
                <Bar data={chartData} options={chartOptions} />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Insights;