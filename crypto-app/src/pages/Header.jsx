// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-light border-bottom mb-4">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link className="navbar-brand" to="/home">Crypto</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>    
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;