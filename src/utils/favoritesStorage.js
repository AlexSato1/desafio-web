// src/utils/favoritesStorage.js
const FAVORITES_KEY = 'country_favorites';

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const addFavorite = (countryCode, countryName) => {
  try {
    const favorites = getFavorites();
    if (!favorites.find(fav => fav.code === countryCode)) {
      favorites.push({ code: countryCode, name: countryName });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = (countryCode) => {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.code !== countryCode);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const isFavorite = (countryCode) => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.code === countryCode);
};

export const clearFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
};
