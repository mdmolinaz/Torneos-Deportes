import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          {description && (
            <p className="text-gray-600 mt-2 text-base md:text-lg">
              {description}
            </p>
          )}
        </div>
        
        <div className="space-y-6 md:space-y-8">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;