import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SurveyCard = ({ item, type = 'survey', isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-primary-contrast rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
      </div>
    );
  }

  const isSurvey = type === 'survey';
  const isCategory = type === 'category';
  const title = item.title || item.name; // Use name for categories
  const description = isCategory
    ? `Test your knowledge in ${item.name} with fun quizzes!`
    : item.description;
  const reward = item.reward || 'KES 4.00';
  const status = item.status || 'Pending';
  const category = item.category || item.name || 'General';
  const difficulty = item.difficulty || 'Medium';
  const duration = item.duration || '1.5 min';
  const isDisabled = item.isDisabled || false;

  // Format remaining cooldown time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleClick = () => {
    if (isDisabled || (!isSurvey && status === 'Completed')) {
      toast.info(`${isSurvey ? 'Participating in' : isCategory ? 'Starting' : 'Completing'} ${title} is not available yet.`);
    } else if (isSurvey) {
      toast.info(`Participating in ${title} (Not implemented yet)`);
    } else {
      // Navigate to TaskingPage with the category
      navigate(`/tasks/${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="bg-primary-contrast rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-medium text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full inline-block mb-2">
            {category}
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-primary-main">
            {isSurvey ? 'Survey: ' : isCategory ? 'Category: ' : 'Task: '} {title}
          </h4>
        </div>
        {isDisabled && (
          <span className="text-gray-500 text-sm" aria-label="Category locked">
            🔒
          </span>
        )}
      </div>
      <p className="text-sm md:text-base text-secondary-contrast mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-block bg-accent-light text-accent-main text-xs font-medium px-2.5 py-0.5 rounded-full">
          Reward: {reward}
        </span>
        {isSurvey ? (
          <span
            className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
              difficulty === 'easy'
                ? 'bg-green-100 text-green-800'
                : difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        ) : !isCategory ? (
          <span
            className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
              status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Status: {status}
          </span>
        ) : null}
        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Duration: {duration}
        </span>
      </div>
      {isDisabled && (
        <p className="text-sm text-gray-500 mb-4" role="alert">
          Available again in {formatTime(item.cooldownSeconds || 300)}
        </p>
      )}
      <button
        className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-main ${
          (!isSurvey && status === 'Completed') || isDisabled
            ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
            : 'bg-accent-main text-primary-contrast hover:bg-accent-light'
        }`}
        aria-label={`${isSurvey ? 'Participate in' : isCategory ? 'Start' : 'Complete'} ${title}`}
        onClick={handleClick}
        disabled={(!isSurvey && status === 'Completed') || isDisabled}
      >
        {isSurvey ? (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            Take Survey
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {isCategory ? 'Start Category' : 'Complete Task'}
          </>
        )}
      </button>
    </div>
  );
};

export default SurveyCard;