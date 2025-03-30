import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, icon, link, onClick }) => {
  const content = (
    <div className="card h-full flex flex-col">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="card-title">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
    </div>
  );

  return link ? (
    <Link to={link} className="hover:no-underline">
      {content}
    </Link>
  ) : (
    <div onClick={onClick} className="cursor-pointer">
      {content}
    </div>
  );
};

export default Card;