// src/pages/Signup.jsx
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import ValidationModal from '../components/ValidationModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('identifiant', username);
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch('http://localhost:5256/api/inscription', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleValidation = async (email, code) => {
    try {
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('codeValidation', code);

        const response = await fetch('http://localhost:8000/inscription/valider', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        const data=await response.json();
        if(data.errorCode==2000){
            throw new Error('Code de validation erroné');
        }
        throw new Error("Validation échouée pour cause inconnue")
      }
      setShowModal(false);
      // handle successful validation (e.g., redirect to login or home page)
      navigate("/Login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container col-5 mt-5">
      <h1 className="mb-4">S'inscrire</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input 
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">Prénom</label>
          <input 
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
      <ValidationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleValidation={handleValidation}
        email={email}
      />
    </div>
  );
};

export default Signup;