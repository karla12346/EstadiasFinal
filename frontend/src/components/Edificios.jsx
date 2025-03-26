import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu"; // Importa el menú desplegable

const API_URL = "http://localhost:5000/api/edificios"; // Ruta corregida

const Edificios = () => {
  const { user } = useAuth(); // Obtén el usuario autenticado
  const [edificios, setEdificios] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", sucursal_idsucursal: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener la lista de edificios
  const fetchEdificios = useCallback(async () => {
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
      setEdificios(data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo edificios:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEdificios();
  }, [fetchEdificios]); // Ejecuta fetchEdificios cuando cambie

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar o actualizar edificio
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error("Error en la petición");
      }

      setFormData({ nombre: "", sucursal_idsucursal: "" });
      setEditId(null);
      fetchEdificios(); // Recargar lista
    } catch (error) {
      console.error("Error al guardar edificio:", error);
    }
  };

  // Eliminar edificio
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este edificio?")) return;

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

      fetchEdificios();
    } catch (error) {
      console.error("Error al eliminar edificio:", error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (edificio) => {
    setEditId(edificio._id);
    setFormData({
      nombre: edificio.nombre,
      sucursal_idsucursal: edificio.sucursal_idsucursal._id, // Asegúrate de que sea el ID correcto
    });
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Edificios</h1>
        <DropdownMenu /> {/* Menú desplegable */}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre del Edificio</label>
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

      {/* Lista de edificios */}
      {loading ? (
        <p style={styles.loadingText}>Cargando edificios...</p>
      ) : (
        <div style={styles.edificiosList}>
          {edificios.length === 0 ? (
            <p style={styles.noEdificiosText}>No hay edificios registrados.</p>
          ) : (
            edificios.map((edificio) => (
              <div key={edificio._id} style={styles.edificioCard}>
                <div>
                  <p style={styles.edificioNombre}>{edificio.nombre}</p>
                  <p style={styles.edificioSucursal}>
                    Sucursal: {edificio.sucursal_idsucursal?.nombre || "Sin sucursal"}
                  </p>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handleEdit(edificio)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(edificio._id)}
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
  noEdificiosText: {
    textAlign: "center",
    color: "#718096",
  },
  edificiosList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  edificioCard: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  edificioNombre: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  edificioSucursal: {
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

export default Edificios;