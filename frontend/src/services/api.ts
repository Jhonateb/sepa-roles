import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: 'http://localhost:3000', // La URL base de tu backend NestJS
});

// --- INTERCEPTORES ---
// Imagina que son "guardianes" que vigilan cada petición.

// 1. Guardián de SALIDA (Request Interceptor)
// Se ejecuta ANTES de que cualquier petición sea enviada.
api.interceptors.request.use(
  (config) => {
    // Obtiene el token del store de Zustand
    const token = useAuthStore.getState().token;
    if (token) {
      // Si el token existe, lo añade a la cabecera 'Authorization'
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Si hay un error al configurar la petición, lo rechaza
    return Promise.reject(error);
  }
);

// 2. Guardián de ENTRADA (Response Interceptor)
// Se ejecuta DESPUÉS de recibir una respuesta, especialmente si es un error.
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la devuelve
    return response;
  },
  (error) => {
    // Si la respuesta es un error 401 (No Autorizado)...
    if (error.response?.status === 401) {
      // ...significa que el token es inválido o ha expirado.
      // ¡Cerramos la sesión del usuario!
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;