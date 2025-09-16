import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';

const Writer = () => {
  const [formData, setFormData] = useState({
    question: '',
    correctAnswer: '',
    incorrectAnswers: ['', '', ''],
    category: 'General Knowledge',
    difficulty: 'easy',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error('Please log in to access the writer tool.');
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e, index) => {
    if (e.target.name === 'incorrectAnswers') {
      const newIncorrectAnswers = [...formData.incorrectAnswers];
      newIncorrectAnswers[index] = e.target.value;
      setFormData({ ...formData, incorrectAnswers: newIncorrectAnswers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.question ||
      !formData.correctAnswer ||
      formData.incorrectAnswers.some((ans) => !ans)
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    try {
      // Placeholder for API call (e.g., to OpenTDB or Firebase)
      console.log('Submitting question:', formData);
      toast.success('Question submitted successfully!');
      setFormData({
        question: '',
        correctAnswer: '',
        incorrectAnswers: ['', '', ''],
        category: 'General Knowledge',
        difficulty: 'easy',
      });
    } catch (error) {
      toast.error('Failed to submit question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary-light text-secondary-contrast min-h-screen">
      <section className="py-8 bg-primary-main text-primary-contrast text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Writer</h3>
          <p className="text-base md:text-lg mt-2 max-w-2xl mx-auto">
            Create new survey questions for the platform.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-secondary-contrast mb-1">
                Question
              </label>
              <input
                id="question"
                name="question"
                type="text"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter your question"
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Question"
                required
              />
            </div>
            <div>
              <label htmlFor="correctAnswer" className="block text-secondary-contrast mb-1">
                Correct Answer
              </label>
              <input
                id="correctAnswer"
                name="correctAnswer"
                type="text"
                value={formData.correctAnswer}
                onChange={handleChange}
                placeholder="Enter the correct answer"
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Correct Answer"
                required
              />
            </div>
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label htmlFor={`incorrectAnswer${index}`} className="block text-secondary-contrast mb-1">
                  Incorrect Answer {index + 1}
                </label>
                <input
                  id={`incorrectAnswer${index}`}
                  name="incorrectAnswers"
                  type="text"
                  value={formData.incorrectAnswers[index]}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Enter incorrect answer ${index + 1}`}
                  className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                  aria-label={`Incorrect Answer ${index + 1}`}
                  required
                />
              </div>
            ))}
            <div>
              <label htmlFor="category" className="block text-secondary-contrast mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Category"
              >
                <option value="General Knowledge">General Knowledge</option>
                <option value="Entertainment: Books">Entertainment: Books</option>
                <option value="Science & Nature">Science & Nature</option>
                <option value="History">History</option>
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-secondary-contrast mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-4 border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
                aria-label="Difficulty"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg focus:outline-none shadow-md transition-all duration-200 transform hover:scale-105 ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent-main text-primary-contrast hover:bg-accent-light focus:ring-2 focus:ring-accent-main'
              }`}
              aria-label="Submit Question"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-primary-contrast"
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
                  Submitting...
                </>
              ) : (
                'Submit Question'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Writer;