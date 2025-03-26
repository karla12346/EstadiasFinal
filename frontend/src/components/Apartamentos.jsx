import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCog, faSignOutAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/apartamentos"; // Ruta corregida

const Apartamentos = () => {
  const { user, logout } = useAuth(); // Obtén el usuario autenticado y la función logout
  const [apartamentos, setApartamentos] = useState([]);
  const [formData, setFormData] = useState({ precioventa: "", modeloApartamento_idmodelo: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú desplegable
  const navigate = useNavigate(); // Hook para redireccionar

  // Obtener la lista de apartamentos
  const fetchApartamentos = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Incluye el token en los headers
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApartamentos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo apartamentos:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchApartamentos();
  }, [fetchApartamentos]); // Ejecuta fetchApartamentos cuando cambie

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar o actualizar apartamento
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Incluye el token en los headers
        },
        body: JSON.stringify({
          precioventa: Number(formData.precioventa), // Convertir a número
          modeloApartamento_idmodelo: formData.modeloApartamento_idmodelo, // Texto
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error("Error en la petición");
      }

      setFormData({ precioventa: "", modeloApartamento_idmodelo: "" });
      setEditId(null);
      fetchApartamentos(); // Recargar lista
    } catch (error) {
      console.error("Error al guardar apartamento:", error);
    }
  };

  // Eliminar apartamento
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este apartamento?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`, // Incluye el token en los headers
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      fetchApartamentos();
    } catch (error) {
      console.error("Error al eliminar apartamento:", error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (apartamento) => {
    setEditId(apartamento._id);
    setFormData({
      precioventa: apartamento.precioventa,
      modeloApartamento_idmodelo: apartamento.modeloApartamento_idmodelo, // Texto
    });
  };

  // Funciones para el menú desplegable
  const handleProfileClick = () => {
    setIsMenuOpen(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setIsMenuOpen(false);
    navigate("/configuracion");
  };

  const handleApartmentsClick = () => {
    setIsMenuOpen(false);
    navigate("/apartamentos"); // Redirige a la sección de apartamentos
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Apartamentos</h1>
        <div style={styles.menuContainer}>
          {/* Botón de menú */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.menuButton}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div style={styles.dropdownMenu}>
              <ul style={styles.menuList}>
                <li onClick={handleProfileClick} style={styles.menuItem}>
                  <FontAwesomeIcon icon={faUser} style={styles.iconBlue} />
                  <span style={styles.menuText}>Perfil</span>
                </li>
                <li onClick={handleSettingsClick} style={styles.menuItem}>
                  <FontAwesomeIcon icon={faCog} style={styles.iconGreen} />
                  <span style={styles.menuText}>Configuración</span>
                </li>
                <li onClick={handleApartmentsClick} style={styles.menuItem}>
                  <FontAwesomeIcon icon={faBuilding} style={styles.iconPurple} />
                  <span style={styles.menuText}>Apartamentos</span>
                </li>
                <li onClick={handleLogoutClick} style={{ ...styles.menuItem, ...styles.menuItemRed }}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={styles.iconRed} />
                  <span style={styles.menuText}>Cerrar sesión</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Precio de Venta</label>
          <input
            type="number"
            name="precioventa"
            value={formData.precioventa}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Modelo Apartamento</label>
          <input
            type="text"
            name="modeloApartamento_idmodelo"
            value={formData.modeloApartamento_idmodelo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de apartamentos */}
      {loading ? (
        <p style={styles.loadingText}>Cargando apartamentos...</p>
      ) : (
        <div style={styles.apartmentsList}>
          {apartamentos.length === 0 ? (
            <p style={styles.noApartmentsText}>No hay apartamentos registrados.</p>
          ) : (
            apartamentos.map((apt) => (
              <div key={apt._id} style={styles.apartmentCard}>
                <div>
                  <p style={styles.apartmentPrice}>${apt.precioventa}</p>
                  <p style={styles.apartmentModel}>Modelo: {apt.modeloApartamento_idmodelo}</p>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handleEdit(apt)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(apt._id)}
                    style={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Estilos
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  menuContainer: {
    position: "relative",
  },
  menuButton: {
    padding: "10px",
    borderRadius: "50%",
    backgroundColor: "#2d3748",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: "40px",
    width: "200px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 50,
  },
  menuList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  menuItemRed: {
    color: "#e53e3e",
  },
  menuText: {
    marginLeft: "12px",
    fontSize: "14px",
    color: "#2d3748",
  },
  iconBlue: {
    color: "#3182ce",
    width: "16px",
    height: "16px",
  },
  iconGreen: {
    color: "#38a169",
    width: "16px",
    height: "16px",
  },
  iconRed: {
    color: "#e53e3e",
    width: "16px",
    height: "16px",
  },
  iconPurple: {
    color: "#805ad5",
    width: "16px",
    height: "16px",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#4a5568",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
  },
  submitButton: {
    backgroundColor: "#4299e1",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  loadingText: {
    textAlign: "center",
    color: "#4a5568",
  },
  noApartmentsText: {
    textAlign: "center",
    color: "#718096",
  },
  apartmentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  apartmentCard: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  apartmentPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  apartmentModel: {
    fontSize: "14px",
    color: "#718096",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    backgroundColor: "#ecc94b",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#f56565",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
};

export default Apartamentos;