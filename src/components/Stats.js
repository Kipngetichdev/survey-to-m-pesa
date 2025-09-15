import React from 'react';
import { FaUsers, FaClipboardCheck, FaMoneyBillWave } from 'react-icons/fa';

const Stats = () => (
  <section className="bg-secondary-light text-secondary-contrast py-16">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4 md:px-6">
      <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <FaUsers className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Active Users" />
        <h3 className="text-4xl md:text-5xl font-extrabold text-primary-main mb-2">10K+</h3>
        <p className="text-lg md:text-xl">Active Users</p>
      </div>
      <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <FaClipboardCheck className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Surveys Done" />
        <h3 className="text-4xl md:text-5xl font-extrabold text-primary-main mb-2">50K+</h3>
        <p className="text-lg md:text-xl">Surveys Done</p>
      </div>
      <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <FaMoneyBillWave className="w-12 h-12 mx-auto mb-4 text-primary-main" aria-label="Paid Out" />
        <h3 className="text-4xl md:text-5xl font-extrabold text-primary-main mb-2">2M+</h3>
        <p className="text-lg md:text-xl">Paid Out</p>
      </div>
    </div>
  </section>
);

export default Stats;