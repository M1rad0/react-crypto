// src/pages/Login.jsx
import { useState } from 'react';
import ValidationModal from '../components/ValidationModal'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate= useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const formData = new URLSearchParams();
        formData.append('emailOrIdentifiant', username);
        formData.append('motDePasse', password);
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
          const data = await response.json();

        if (response.status === 400) {
          throw new Error(data.message);
        }
        throw new Error('Login failed');
      }
      const data = await response.text();

      localStorage.setItem('token', data);
      // handle successful login
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleValidation = async (email,code) => {
    try {
        const formData = new URLSearchParams();
        formData.append('codeValidation', code);

        const response = await fetch('http://localhost:8000/login/sendCodeLogin', {
        
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const data=await response.json();
        if(data.errorCode==2004){
            throw new Error(data.message);
        }else if(data.errorCode==2003){
            setShowModal(false);
            throw new Error(data.message);
        }
        throw new Error("Validation échouée pour cause inconnue")
      }
      setShowModal(false);
      // handle successful validation (e.g., redirect to login or home page)
      navigate("/Home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5 col-5">
        <h1 className="mb-4">Login</h1>
        <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary">Login</button>
            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
        <ValidationModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleValidation={handleValidation}
            email=""
        />
    </div>

  );
};

export default Login;