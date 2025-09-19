import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const SurveyCard = ({ item, type = 'survey', isLoading = false, onClick }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-primary-contrast rounded-xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
      </div>
    );
  }

  const isSurvey = type === 'survey';
  const isCategory = type === 'category';
  
  // Category-specific rendering
  if (isCategory) {
    const title = item.name;
    const description = item.description || `Explore ${title.toLowerCase()} quizzes`;
    const questionCount = item.questionCount || '100+';
    const Icon = item.icon || ChevronRightIcon;

    const handleCategoryClick = () => {
      if (onClick && typeof onClick === 'function') {
        onClick(item);
      } else {
        // Fallback navigation
        const encodedCategoryName = encodeURIComponent(item.fullName || title);
        navigate(`/surveys/${encodedCategoryName}`, {
          state: { 
            categoryId: item.id, 
            categoryName: item.fullName || title,
            displayName: title,
            description: description
          }
        });
      }
    };

    return (
      <div 
        className="bg-primary-contrast rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
        onClick={handleCategoryClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick()}
      >
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-primary-main group-hover:text-accent-main transition-colors" />
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {questionCount} questions
          </span>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary-main mb-2 group-hover:text-accent-main transition-colors">
            {title}
          </h3>
          <p className="text-sm text-secondary-contrast line-clamp-2">
            {description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-accent-light text-accent-main text-xs font-medium px-3 py-1 rounded-full">
            Free
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            ~2 min
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary-main group-hover:text-accent-main">
            Start Quiz
          </span>
          <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-accent-main transition-colors" />
        </div>
      </div>
    );
  }

  // Survey/Quiz rendering
  const title = item.title || item.name || 'Untitled Quiz';
  const description = item.description || 'Answer this quiz question to earn rewards';
  const reward = item.reward || 'KES 4.00';
  const category = item.displayCategory || item.category || 'General';
  const difficulty = item.difficulty || 'medium';
  const duration = item.duration || '1.5 min';
  const isDisabled = item.isDisabled || false;
  const cooldownSeconds = item.cooldownSeconds;

  // Format remaining cooldown time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Difficulty color mapping
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'hard': return { bg: 'bg-red-100', text: 'text-red-800' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const handleClick = () => {
    if (isDisabled) {
      toast.info(`This category is on cooldown. Available in ${formatTime(cooldownSeconds)}.`);
      return;
    }

    if (isSurvey) {
      // For surveys, you might want to navigate to a survey completion page
      toast.info(`Starting ${title}... (Survey functionality to be implemented)`);
      return;
    }

    // For quizzes, navigate to quiz page or trigger quiz start
    if (onClick && typeof onClick === 'function') {
      onClick(item);
    } else {
      // Default navigation to quiz player
      const quizId = item.id;
      navigate(`/quiz/${quizId}`, { state: { quiz: item } });
    }
  };

  const difficultyColors = getDifficultyColor(difficulty);
  const buttonDisabled = isDisabled;

  return (
    <div className="bg-primary-contrast rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {/* Category Badge */}
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full mb-2 inline-block">
            {category}
          </span>
          
          {/* Title */}
          <h4 className="text-lg font-semibold text-primary-main mb-1 line-clamp-1">
            {title}
          </h4>
          
          {/* Status indicator for disabled */}
          {isDisabled && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <LockClosedIcon className="h-4 w-4 mr-1" />
              On cooldown
            </div>
          )}
        </div>
        
        {/* Disabled indicator */}
        {isDisabled && (
          <div className="ml-2">
            <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-secondary-contrast mb-4 line-clamp-2">
        {description}
      </p>

      {/* Metadata tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Reward */}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CurrencyDollarIcon className="h-3 w-3 mr-1" />
          {reward}
        </span>
        
        {/* Difficulty */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors.bg} ${difficultyColors.text}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
        
        {/* Duration */}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <ClockIcon className="h-3 w-3 mr-1" />
          {duration}
        </span>
      </div>

      {/* Cooldown timer */}
      {isDisabled && cooldownSeconds && (
        <div className="mb-4 p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 font-mono">
            Available in <span className="font-bold text-red-600">{formatTime(cooldownSeconds)}</span>
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 transform ${
          buttonDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-accent-main text-primary-contrast hover:bg-accent-dark hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg'
        } focus:outline-none focus:ring-2 focus:ring-accent-main focus:ring-offset-2`}
        onClick={handleClick}
        disabled={buttonDisabled}
        aria-label={`Start ${title} quiz`}
      >
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={buttonDisabled 
                ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                : "M5 13l4 4L19 7"
              }
            />
          </svg>
          {buttonDisabled ? 'On Cooldown' : 'Start Quiz'}
        </span>
      </button>
    </div>
  );
};

export default SurveyCard;