import React, { useState, useEffect } from 'react';
import { getCountryByCode } from '../services/countryService';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favoritesStorage';

const CountryDetails = ({ countryCode, onClose }) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      const data = await getCountryByCode(countryCode);
      setCountry(data);
      setFav(isFavorite(countryCode));
      setLoading(false);
    };
    fetchCountry();
  }, [countryCode]);

  const toggleFavorite = () => {
    if (fav) {
      removeFavorite(countryCode);
    } else {
      addFavorite(countryCode, country.name);
    }
    setFav(!fav);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!country) return <div className="text-center py-8">Country not found</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="float-right text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          ×
        </button>

        <div className="flex gap-6">
          {country.flag && (
            <img 
              src={country.flag} 
              alt={`${country.name} flag`}
              className="w-40 h-32 object-cover rounded"
            />
          )}
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{country.name}</h2>
            <p className="text-gray-600 mb-4">{country.official}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Region</p>
                <p>{country.region}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Subregion</p>
                <p>{country.subregion || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Population</p>
                <p>{country.population?.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Area</p>
                <p>{country.area?.toLocaleString()} km²</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Capital</p>
                <p>{country.capital || 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Code</p>
                <p>{country.cca3}</p>
              </div>
            </div>

            <button
              onClick={toggleFavorite}
              className={`mt-6 w-full py-2 px-4 rounded font-semibold transition ${
                fav
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {fav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
