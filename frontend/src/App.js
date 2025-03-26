import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate
import './App.css';

// Importar los componentes de las páginas
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Inicio from './components/inicio';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Redirige la ruta principal ("/") directamente al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </div>
  );
}

export default App;