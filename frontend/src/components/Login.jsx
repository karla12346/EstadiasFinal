import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Importa useAuth
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const { login } = useAuth(); // Usa el hook useAuth para acceder a la función login
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia el error anterior
    try {
      await login(email, password); // Intenta iniciar sesión
      navigate("/inicio"); // Redirige a la página de inicio después del login exitoso
    } catch (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo."); // Muestra un mensaje de error
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra el error si existe */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
      <p style={styles.text}>
        ¿No tienes una cuenta?{" "}
        <button onClick={() => navigate("/register")} style={styles.link}>
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  form: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  text: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;