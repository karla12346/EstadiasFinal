import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext'; // Importar AuthProvider en lugar de AuthContext
import reportWebVitals from './reportWebVitals';
import Inicio from './components/inicio';
import Apartamentos from './components/Apartamentos';
import Edificios from './components/Edificios';
import Lotes from './components/Lotes';
import Lotificacion from './components/Lotificacion';
import ModeloApartamento from './components/ModeloApartamento';
import ModelosResidencia from './components/ModelosResidencia';
import Residencias from './components/Residencias';
import Residenciales from './components/Residenciales';
import Sucursales from './components/Sucursales';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/apartamentos" element={<Apartamentos/>}/>
          <Route path='/edificios' element={<Edificios/>}/>
          <Route path='/lotes' element={<Lotes/>}/>
          <Route path='/lotificacion' element={<Lotificacion/>}/>
          <Route path='/modeloapartamento' element={<ModeloApartamento/>}/>
          <Route path='/modeloresidencial' element={<ModelosResidencia/>}/>
          <Route path='/recidencias' element={<Residencias/>}/>
          <Route path='/recidenciales' element={<Residenciales/>}/>
          <Route path='/sucursales' element={<Sucursales/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();