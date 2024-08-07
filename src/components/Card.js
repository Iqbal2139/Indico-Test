// src/components/Card.js
import React from 'react';

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="border rounded shadow-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-[600px] object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;
