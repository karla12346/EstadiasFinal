import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";

const API_URL = "http://localhost:5000/api/lotificaciones";

const Lotificacion = () => {
  const [lotificaciones, setLotificaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    sucursal_idsucursal: "",
    descripcion: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLotificaciones = async () => {
    try {
      const response = await axios.get(API_URL);
      setLotificaciones(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo lotificaciones:", error);
      setError("Error al cargar lotificaciones");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotificaciones();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.nombre || !formData.sucursal_idsucursal) {
      setError("Nombre y Sucursal ID son campos requeridos");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ nombre: "", sucursal_idsucursal: "", descripcion: "" });
      setEditId(null);
      fetchLotificaciones();
    } catch (error) {
      console.error("Error al guardar lotificación:", error);
      setError(error.response?.data?.message || "Error al guardar lotificación");
    }
  };

  const handleEdit = (lotificacion) => {
    setEditId(lotificacion._id);
    setFormData({
      nombre: lotificacion.nombre,
      sucursal_idsucursal: lotificacion.sucursal_idsucursal,
      descripcion: lotificacion.descripcion || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta lotificación?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchLotificaciones();
    } catch (error) {
      console.error("Error al eliminar lotificación:", error);
      setError("Error al eliminar lotificación");
    }
  };

  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Lotificaciones</h1>
        <DropdownMenu />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div style={styles.errorAlert}>
          <p>{error}</p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="nombre">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="sucursal_idsucursal">
            Sucursal ID *
          </label>
          <input
            type="text"
            name="sucursal_idsucursal"
            id="sucursal_idsucursal"
            value={formData.sucursal_idsucursal}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Descripción opcional de la lotificación"
          />
        </div>

        <div style={styles.formActions}>
          <button
            type="submit"
            style={editId ? styles.updateButton : styles.submitButton}
          >
            {editId ? (
              <>
                <i className="fas fa-save" style={styles.icon}></i> Actualizar
              </>
            ) : (
              <>
                <i className="fas fa-plus" style={styles.icon}></i> Agregar
              </>
            )}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ nombre: "", sucursal_idsucursal: "", descripcion: "" });
              }}
              style={styles.cancelButton}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de lotificaciones */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Cargando lotificaciones...</p>
        </div>
      ) : (
        <div style={styles.listContainer}>
          {lotificaciones.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No hay lotificaciones registradas.</p>
            </div>
          ) : (
            lotificaciones.map((lotificacion) => (
              <div key={lotificacion._id} style={styles.card}>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{lotificacion.nombre}</h3>
                  <p style={styles.cardSubtitle}>Sucursal ID: {lotificacion.sucursal_idsucursal}</p>
                  {lotificacion.descripcion && (
                    <p style={styles.cardDescription}>{lotificacion.descripcion}</p>
                  )}
                </div>
                <div style={styles.cardActions}>
                  <button
                    onClick={() => handleEdit(lotificacion)}
                    style={styles.editButton}
                  >
                    <i className="fas fa-edit" style={styles.icon}></i> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(lotificacion._id)}
                    style={styles.deleteButton}
                  >
                    <i className="fas fa-trash" style={styles.icon}></i> Eliminar
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

// Estilos CSS
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2d3748"
  },
  errorAlert: {
    backgroundColor: "#fee2e2",
    borderLeft: "4px solid #dc2626",
    color: "#b91c1c",
    padding: "16px",
    marginBottom: "24px",
    borderRadius: "4px"
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px"
  },
  formGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#4a5568",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    transition: "border-color 0.3s",
    boxSizing: "border-box"
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    minHeight: "100px",
    resize: "vertical",
    boxSizing: "border-box"
  },
  formActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  submitButton: {
    backgroundColor: "#38a169",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s"
  },
  updateButton: {
    backgroundColor: "#3182ce",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s"
  },
  cancelButton: {
    backgroundColor: "#718096",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s"
  },
  editButton: {
    backgroundColor: "#4299e1",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s"
  },
  deleteButton: {
    backgroundColor: "#e53e3e",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s"
  },
  icon: {
    fontSize: "14px"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0"
  },
  spinner: {
    border: "3px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#3182ce",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    marginBottom: "16px"
  },
  loadingText: {
    color: "#4a5568",
    fontSize: "16px"
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  emptyState: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  emptyText: {
    color: "#718096",
    fontSize: "16px"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.2s"
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "4px"
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "8px"
  },
  cardDescription: {
    fontSize: "14px",
    color: "#4a5568",
    marginTop: "8px"
  },
  cardActions: {
    display: "flex",
    gap: "8px"
  }
};

// Agregar animación para el spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Lotificacion;