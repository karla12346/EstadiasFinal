import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./DropdownMenu"; // Importa el menú desplegable

const API_URL = "http://localhost:5000/api/lotificaciones"; // Asegúrate de que esta URL sea correcta

const Lotificacion = () => {
  const [lotificaciones, setLotificaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    sucursal_idsucursal: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener todas las lotificaciones
  const fetchLotificaciones = async () => {
    try {
      const response = await axios.get(API_URL);
      setLotificaciones(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo lotificaciones:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotificaciones();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Insertar o actualizar una lotificación
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Actualizar lotificación
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        // Insertar nueva lotificación
        await axios.post(API_URL, formData);
      }
      setFormData({ nombre: "", sucursal_idsucursal: "" });
      setEditId(null);
      fetchLotificaciones(); // Recargar la lista
    } catch (error) {
      console.error("Error al guardar lotificación:", error);
    }
  };

  // Editar una lotificación
  const handleEdit = (lotificacion) => {
    setEditId(lotificacion._id);
    setFormData({
      nombre: lotificacion.nombre,
      sucursal_idsucursal: lotificacion.sucursal_idsucursal,
    });
  };

  // Eliminar una lotificación
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta lotificación?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchLotificaciones(); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar lotificación:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Lotificaciones</h1>
        <DropdownMenu /> {/* Menú desplegable */}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>ID de la Sucursal</label>
          <input
            type="text"
            name="sucursal_idsucursal"
            value={formData.sucursal_idsucursal}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de lotificaciones */}
      {loading ? (
        <p style={styles.loadingText}>Cargando lotificaciones...</p>
      ) : (
        <div style={styles.lotificacionesList}>
          {lotificaciones.length === 0 ? (
            <p style={styles.noLotificacionesText}>No hay lotificaciones registradas.</p>
          ) : (
            lotificaciones.map((lotificacion) => (
              <div key={lotificacion._id} style={styles.lotificacionCard}>
                <div>
                  <p style={styles.lotificacionNombre}>Nombre: {lotificacion.nombre}</p>
                  <p style={styles.lotificacionSucursal}>
                    Sucursal ID: {lotificacion.sucursal_idsucursal}
                  </p>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handleEdit(lotificacion)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(lotificacion._id)}
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
    maxWidth: "800px",
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
  noLotificacionesText: {
    textAlign: "center",
    color: "#718096",
  },
  lotificacionesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  lotificacionCard: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lotificacionNombre: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  lotificacionSucursal: {
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

export default Lotificacion;