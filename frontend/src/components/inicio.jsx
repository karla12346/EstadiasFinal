import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu"; // Importamos el menú desplegable

const Inicio = () => {
  const { user, loading } = useAuth();

  // Efecto para depuración: muestra el estado de autenticación en la consola
  useEffect(() => {
    console.log("Estado de autenticación:", { user, loading });
  }, [user, loading]);

  // Muestra un mensaje de carga mientras se verifica la autenticación
  if (loading) {
    return <div style={styles.loadingContainer}>Cargando...</div>;
  }

  // Muestra un mensaje si el usuario no ha iniciado sesión
  if (!user && !loading) {
    return (
      <div style={styles.authContainer}>
        <h2 style={styles.title}>No has iniciado sesión</h2>
        <p style={styles.text}>Por favor, inicia sesión para continuar.</p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/login")}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  // Renderiza la interfaz principal cuando el usuario está autenticado
  return (
    <div style={styles.mainContainer}>
      {/* Barra de navegación */}
      <nav style={styles.navbar}>
        <DropdownMenu />
      </nav>

      {/* Contenido principal */}
      <div style={styles.contentContainer}>
        <h2 style={styles.title}>Bienvenido, {user?.name || "Usuario"}</h2>
        <p style={styles.text}>Gracias por usar nuestra aplicación.</p>

        {/* Información de depuración */}
        <div style={styles.debugContainer}>
          <h3 style={styles.debugTitle}>Información de depuración:</h3>
          <pre style={styles.debugText}>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#1a202c",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    padding: "20px",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  authContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#2d3748",
  },
  text: {
    fontSize: "16px",
    color: "#4a5568",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#3182ce",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  debugContainer: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#e2e8f0",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "600px",
    textAlign: "left",
  },
  debugTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#2d3748",
  },
  debugText: {
    fontSize: "14px",
    color: "#4a5568",
    fontFamily: "monospace",
    overflowX: "auto",
  },
};

export default Inicio;