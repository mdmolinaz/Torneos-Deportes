import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, icon, link, onClick, children, className = '' }) => {
  const cardContent = (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`} style={{ display: 'block' }}>
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <div className="card-content" style={{ display: 'block !important' }}>
        {children}
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="hover:no-underline">
      {cardContent}
    </Link>
  ) : (
    <div onClick={onClick} className="cursor-pointer">
      {cardContent}
    </div>
  );
};

export default Card;