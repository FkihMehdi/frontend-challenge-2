import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
