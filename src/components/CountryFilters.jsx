import React from "react";

const CountryFilters = ({ setContinent, setOrder }) => {
  const continents = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white shadow-sm rounded-lg">
      <div className="flex-1">
        <label htmlFor="continent" className="block text-sm font-medium text-gray-700 mb-1">
          Filtrar por Continente
        </label>
        <select
          id="continent"
          onChange={(e) => setContinent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {continents.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
          Ordenar por População
        </label>
        <select
          id="order"
          onChange={(e) => setOrder(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="none">Padrão</option>
          <option value="asc">Menor População</option>
          <option value="desc">Maior População</option>
        </select>
      </div>
    </div>
  );
};

export default CountryFilters;