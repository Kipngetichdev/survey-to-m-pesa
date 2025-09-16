import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';

const Wallet = () => {
  const [balance, setBalance] = useState(50);
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-09-10', description: 'Survey Reward', amount: 25 },
    { id: 2, date: '2025-09-12', description: 'Survey Reward', amount: 15 },
    { id: 3, date: '2025-09-15', description: 'Withdrawal', amount: -20 },
  ]);
  const navigate = useNavigate();

  // Redirect unauthenticated users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error('Please log in to access your wallet.');
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-secondary-light text-secondary-contrast min-h-screen">
      <section className="py-8 bg-primary-main text-primary-contrast text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Wallet</h3>
          <p className="text-base md:text-lg mt-2 max-w-2xl mx-auto">
            Check your earnings, redeem rewards, or view transaction history.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-contrast p-6 sm:p-8 rounded-lg shadow-md mb-6">
            <h4 className="text-lg font-semibold text-secondary-contrast">Current Balance</h4>
            <p className="text-2xl font-bold text-accent-main">KES {balance.toFixed(2)}</p>
          </div>
          <div className="bg-primary-contrast p-6 sm:p-8 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-secondary-contrast mb-4">Transaction History</h4>
            {transactions.length === 0 ? (
              <p className="text-secondary-contrast">No transactions available.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-secondary-main">
                    <th className="py-2 text-secondary-contrast">Date</th>
                    <th className="py-2 text-secondary-contrast">Description</th>
                    <th className="py-2 text-secondary-contrast">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-secondary-main">
                      <td className="py-2 text-secondary-contrast">{tx.date}</td>
                      <td className="py-2 text-secondary-contrast">{tx.description}</td>
                      <td className={`py-2 ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}KES {Math.abs(tx.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wallet;