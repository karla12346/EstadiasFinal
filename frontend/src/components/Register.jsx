import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      alert("Registro exitoso");
      navigate("/login"); // Redirige al login después de registrarse
    } catch (error) {
      console.error("Error al registrar", error);
      alert("Hubo un error al registrarse");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
      <p style={styles.text}>
        ¿Ya tienes una cuenta?{" "}
        <button onClick={() => navigate("/login")} style={styles.link}>
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

// Estilos en un objeto
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
    backgroundColor: "#10b981",
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

export default Register;
