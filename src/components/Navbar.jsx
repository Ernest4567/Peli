import { Link } from 'react-router-dom';

export default function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎬 Directorio TMDb</Link>
      <div className="theme-switch-wrapper">
        <span>{isDarkMode ? '🌙' : '☀️'}</span>
        <label className="theme-switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
}