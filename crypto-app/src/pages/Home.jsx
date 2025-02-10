// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:5256/api/profil', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setProfile(data);
      console.log(data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Home</h1>
      {profile && (
        <div>
          <p><strong>Identifiant : </strong>{profile.identifiant}</p>
          <p><strong>Solde : </strong>{profile.solde} $</p>

          
        </div>
      )}

      {!profile && (
        <div>
            <Link className="btn btn-primary" to="/signup">Inscription</Link>
            <Link className="btn btn-primary mx-5" to="/login">Connection</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
