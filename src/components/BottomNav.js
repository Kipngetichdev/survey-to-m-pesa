import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll, faChartBar, faPen, faWallet, faHome } from '@fortawesome/free-solid-svg-icons';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = location.pathname;

  const navItems = [
    { id: 'surveys', label: 'Surveys', icon: faPoll, path: '/surveys' },
    { id: 'insights', label: 'Insights', icon: faChartBar, path: '/insights' },
    { id: 'writer', label: 'Writer', icon: faPen, path: '/writer' },
    { id: 'wallet', label: 'Wallet', icon: faWallet, path: '/wallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-main text-primary-contrast border-t border-secondary-main shadow-md md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeRoute === item.path ? 'text-accent-main' : 'text-secondary-contrast hover:text-accent-light'
            }`}
            aria-label={item.label}
            role="tab"
            aria-selected={activeRoute === item.path}
          >
            <FontAwesomeIcon icon={item.icon} className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;