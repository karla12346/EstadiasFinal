// AuthContext.jsx
// Esto nos ayudará a manejar el estado de usuario en toda la app.
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario en el localStorage al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          // Parseamos el usuario almacenado
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Opcional: validar token con el backend
          // await axios.get("http://localhost:5000/api/users/verify", {
          //   headers: { Authorization: `Bearer ${userData.token}` }
          // });
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        // Si hay error de validación, eliminamos datos
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { 
        email, 
        password 
      });
      
      // Verificamos que la respuesta tenga los datos necesarios
      if (!res.data || !res.data.name) {
        throw new Error("Respuesta del servidor incompleta");
      }
      
      // Guarda el usuario en el estado
      setUser(res.data);
      
      // Guarda el usuario en el localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      
      return res.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Mejoramos el mensaje de error
      if (error.response) {
        // El servidor respondió con un código de error
        throw new Error(error.response.data.message || "Error en las credenciales");
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        throw new Error("No se pudo conectar con el servidor");
      } else {
        // Ocurrió un error al configurar la solicitud
        throw error;
      }
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Elimina el usuario del estado
    localStorage.removeItem("user"); // Elimina el usuario del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};