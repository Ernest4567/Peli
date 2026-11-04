import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = '02d5b54737cb26aadc79495e290aa08f';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resMovie = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
        const dataMovie = await resMovie.json();
        setMovie(dataMovie);

        const resCredits = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=es-MX`);
        const dataCredits = await resCredits.json();
        setCast(dataCredits.cast ? dataCredits.cast.slice(0, 6) : []);
      } catch (error) {
        console.error("Error al obtener detalles:", error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div className="loading">Cargando...</div>;

  return (
    <div className="movie-details">
      <Link to="/" className="back-btn">← Volver</Link>
      <div className="details-header">
        <img 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500'} 
          alt={movie.title} className="poster" 
        />
        <div className="info">
          <h2>{movie.title} ({movie.release_date?.substring(0, 4)})</h2>
          <p><strong>Puntuación:</strong> {movie.vote_average}</p>
          <p><strong>Resumen:</strong> {movie.overview}</p>
          
          <h3 className="cast-title">Actores Principales</h3>
          <div className="cast-grid">
            {cast.map(actor => (
              <div key={actor.id} className="actor-card">
                <img 
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200'} 
                  alt={actor.name} 
                />
                <p className="actor-name">{actor.name}</p>
                <p className="character">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}