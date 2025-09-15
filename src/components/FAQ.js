import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: "How can I become a member?", a: "Sign up for free on our website, it takes less than 2 minutes." },
    { q: "What if I forgot my password?", a: "Use the 'Forgot Password' link on the login page to reset it." },
    { q: "Why am I not receiving any survey invitations?", a: "Ensure your profile is complete and check your email settings." },
    { q: "How can I withdraw my money?", a: "Cash out via M-Pesa, PayPal, or bank transfer once you reach the threshold." },
    { q: "Why am I not qualified for a survey?", a: "Some surveys target specific demographics; keep checking for new ones." },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-primary-main text-primary-contrast">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 rounded-lg shadow-sm">
              <button
                className="w-full text-left p-5 bg-primary-dark rounded-lg flex justify-between items-center hover:bg-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-medium">{faq.q}</span>
                <span className="text-xl font-semibold">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="p-5 bg-secondary-light text-secondary-contrast rounded-b-lg text-base leading-relaxed animate-fadeIn"
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-lg">
          Still have questions?{' '}
          <a
            href="#contact"
            className="underline hover:text-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;