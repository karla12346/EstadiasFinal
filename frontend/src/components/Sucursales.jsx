import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

const API_URL = "http://localhost:5000/api/sucursales";

// Lista de municipios de Aguascalientes
const MUNICIPIOS_AGS = [
  { id: 1, nombre: "Aguascalientes" },
  { id: 2, nombre: "Asientos" },
  { id: 3, nombre: "Calvillo" },
  { id: 4, nombre: "Cosío" },
  { id: 5, nombre: "El Llano" },
  { id: 6, nombre: "Jesús María" },
  { id: 7, nombre: "Pabellón de Arteaga" },
  { id: 8, nombre: "Rincón de Romos" },
  { id: 9, nombre: "San Francisco de los Romo" },
  { id: 10, nombre: "San José de Gracia" },
  { id: 11, nombre: "Tepezalá" }
];

const Sucursales = () => {
  const { user } = useAuth();
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({ 
    nombre: "", 
    direccion: "",
    municipio: "" 
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Obtener sucursales
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      
      if (!response.ok) throw new Error("Error al cargar sucursales");

      const data = await response.json();
      setSucursales(data);
      setError("");
    } catch (err) {
      setError("Error obteniendo datos: " + err.message);
      console.error("Error en fetchData:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la operación");
      }

      setFormData({ nombre: "", direccion: "", municipio: "" });
      setEditId(null);
      setSuccess(editId ? "Sucursal actualizada" : "Sucursal creada");
      fetchData();
    } catch (err) {
      setError("Error: " + err.message);
      console.error("Error en handleSubmit:", err);
    } finally {
      setLoading(false);
    }
  };

  // Editar sucursal
  const handleEdit = (sucursal) => {
    setFormData({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      municipio: sucursal.municipio || ""
    });
    setEditId(sucursal._id);
  };

  // Eliminar sucursal
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta sucursal?")) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      if (!response.ok) throw new Error("Error al eliminar");

      setSuccess("Sucursal eliminada correctamente");
      fetchData();
    } catch (err) {
      setError("Error al eliminar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Sucursales</h1>
        <DropdownMenu />
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div style={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div style={styles.successMessage}>
          <p>{success}</p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de la Sucursal</label>
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
          <label style={styles.label}>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Municipio</label>
          <select
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Seleccionar municipio</option>
            {MUNICIPIOS_AGS.map(municipio => (
              <option key={municipio.id} value={municipio.nombre}>
                {municipio.nombre}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.buttonContainer}>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ nombre: "", direccion: "", municipio: "" });
                setEditId(null);
              }}
              style={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Procesando...' : editId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>

      {/* Lista de sucursales */}
      {loading ? (
        <p style={styles.loadingText}>Cargando sucursales...</p>
      ) : sucursales.length === 0 ? (
        <p style={styles.noDataText}>No hay sucursales registradas.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Nombre</th>
                <th style={styles.tableHeader}>Dirección</th>
                <th style={styles.tableHeader}>Municipio</th>
                <th style={styles.tableHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sucursales.map((sucursal) => (
                <tr key={sucursal._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{sucursal.nombre}</td>
                  <td style={styles.tableCell}>{sucursal.direccion}</td>
                  <td style={styles.tableCell}>{sucursal.municipio || "No especificado"}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEdit(sucursal)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(sucursal._id)}
                      style={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Estilos (se mantienen igual que en tu versión original)
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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
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
  cancelButton: {
    backgroundColor: "#e2e8f0",
    color: "#4a5568",
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
    padding: "20px",
  },
  noDataText: {
    textAlign: "center",
    color: "#718096",
    padding: "20px",
  },
  errorMessage: {
    backgroundColor: "#fed7d7",
    color: "#9b2c2c",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  successMessage: {
    backgroundColor: "#f0fff4",
    color: "#276749",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  tableContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f7fafc",
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "500",
    color: "#4a5568",
    borderBottom: "1px solid #e2e8f0",
  },
  tableRow: {
    borderBottom: "1px solid #e2e8f0",
    "&:hover": {
      backgroundColor: "#f7fafc",
    },
  },
  tableCell: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#4a5568",
  },
  editButton: {
    backgroundColor: "#ecc94b",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "8px",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#f56565",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
};

export default Sucursales;