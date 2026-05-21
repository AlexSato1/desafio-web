export const getCountries = async () => {
  try {
    // Adicionamos ?fields para baixar apenas o que vamos usar
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,region,population,cca3,flags"
    );
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    return []; // Retorna array vazio para não quebrar o .map() no App.jsx
  }
};