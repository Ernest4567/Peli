import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const API_KEY = '02d5b54737cb26aadc79495e290aa08f';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = async (query) => {
    const endpoint = query 
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-MX` 
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX`;
    
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error en la API:", error);
    }
  };

  useEffect(() => {
    fetchMovies('');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchQuery);
  };

  return (
    <div className="home-page">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Buscar película..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}