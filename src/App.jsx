import React, { useState, useEffect, useMemo } from "react";
import { getCountries } from "./services/countryService";
import CountryFilters from "./components/CountryFilters";
import CountryCard from "./components/CountryCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [continent, setContinent] = useState("All");
  const [order, setOrder] = useState("none");

  useEffect(() => {
    // Busca os dados apenas uma vez ao montar o componente
    getCountries().then((data) => {
      if (data) setCountries(data);
    });
  }, []);

  const processedCountries = useMemo(() => {
    // Criamos uma cópia para não mutar o estado original
    let result = [...countries];

    // 1. Filtro por Busca (Verifica se name e common existem para evitar erro)
    if (searchTerm.trim() !== "") {
      result = result.filter((c) =>
        c.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filtro por Continente
    if (continent !== "All") {
      result = result.filter((c) => c.region === continent);
    }

    // 3. Ordenação por População
    if (order === "asc") {
      result.sort((a, b) => (a.population || 0) - (b.population || 0));
    } else if (order === "desc") {
      result.sort((a, b) => (b.population || 0) - (a.population || 0));
    }

    return result;
  }, [countries, searchTerm, continent, order]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          World Explorer
        </h1>
        
        <div className="space-y-4 mb-8">
          <SearchBar setSearchTerm={setSearchTerm} />
          
          <CountryFilters 
            setContinent={setContinent} 
            setOrder={setOrder} 
          />
        </div>

        {processedCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedCountries.map((country) => (
              <CountryCard key={country.cca3 || country.name.common} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-xl italic">Nenhum país encontrado com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;