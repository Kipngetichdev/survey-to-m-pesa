import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Message sent! (Simulated)');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary-light text-secondary-contrast">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary-main tracking-tight">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-lg leading-relaxed">
              Fill out the form, and our team will respond within 24 hours.
            </p>
            <ul className="space-y-3 text-base">
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:support@surveypesa.co.ke"
                  className="hover:text-accent-light transition-colors duration-200"
                >
                  support@surveypesa.co.ke
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:+254700123456"
                  className="hover:text-accent-light transition-colors duration-200"
                >
                  +254 700 123 456
                </a>
              </li>
              <li>
                <strong>Address:</strong> Nairobi, Kenya
              </li>
              <li>
                <strong>Live Chat:</strong> Monday - Friday, 8AM - 6PM EAT
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 bg-primary-contrast border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
              aria-label="Full Name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-primary-contrast border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
              aria-label="Email"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-4 bg-primary-contrast border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
              aria-label="Subject"
            />
            <textarea
              name="message"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 bg-primary-contrast border border-secondary-main rounded-lg text-secondary-contrast focus:outline-none focus:ring-2 focus:ring-accent-main transition-shadow duration-200"
              rows="5"
              aria-label="Message"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto bg-accent-main text-primary-contrast px-6 py-3 rounded-lg hover:bg-accent-light focus:ring-2 focus:ring-accent-main focus:outline-none shadow-md transition-all duration-200 transform hover:scale-105"
              aria-label="Send Message"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;