import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sin+Imagen';

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.substring(0, 4)}</p>
        </div>
      </Link>
    </div>
  );
}