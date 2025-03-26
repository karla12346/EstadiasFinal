// frontend/src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto por la URL de tu backend
});

export default instance;
