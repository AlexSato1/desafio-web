// src/components/CountryCard.jsx
import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={country.flags.svg} 
        alt={`Bandeira de ${country.name.common}`} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {country.name.common}
        </h2>
        <p className="text-gray-600">
          <span className="font-semibold">Região:</span> {country.region}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">População:</span> {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;