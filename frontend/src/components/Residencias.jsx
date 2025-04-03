import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

const API_URL = "http://localhost:5000/api/residencias";

const Residencias = () => {
  const { user } = useAuth();
  const [residencias, setResidencias] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [formData, setFormData] = useState({ 
    estatus: "Libre", // Cambiado de precioventa a estatus
    modelo_idmodelo: "",
    hora: "" // Nuevo campo para la hora
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener datos
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resResidencias, resModelos] = await Promise.all([
        fetch(API_URL, {
          headers: { Authorization: `Bearer ${user?.token}` }
        }),
        fetch("http://localhost:5000/api/modelos-residencia", {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
      ]);

      if (!resResidencias.ok || !resModelos.ok) {
        throw new Error("Error al obtener datos");
      }

      const [dataResidencias, dataModelos] = await Promise.all([
        resResidencias.json(),
        resModelos.json()
      ]);

      setResidencias(dataResidencias);
      setModelos(dataModelos);
      setError("");
    } catch (err) {
      setError("Error obteniendo datos: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
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
        throw new Error(errorData.message || "Error en la petición");
      }

      setFormData({ estatus: "Libre", modelo_idmodelo: "", hora: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Editar residencia
  const handleEdit = (residencia) => {
    setEditId(residencia._id);
    setFormData({
      estatus: residencia.estatus || "Libre",
      modelo_idmodelo: residencia.modelo_idmodelo._id || residencia.modelo_idmodelo,
      hora: residencia.hora || ""
    });
  };

  // Eliminar residencia
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta residencia?")) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      fetchData();
    } catch (err) {
      setError("Error al eliminar: " + err.message);
    } finally {
      setLoading(false);
    }
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
    formRow: {
      display: "flex",
      gap: "20px",
      marginBottom: "16px"
    },
    formGroup: {
      flex: 1,
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
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #e2e8f0",
      fontSize: "14px",
      backgroundColor: "white",
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
      ":hover": {
        backgroundColor: "#3182ce"
      }
    },
    loadingText: {
      textAlign: "center",
      color: "#4a5568",
    },
    noResidenciasText: {
      textAlign: "center",
      color: "#718096",
    },
    residenciasList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    residenciaCard: {
      backgroundColor: "#ffffff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    residenciaInfo: {
      flex: 1,
    },
    residenciaTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#2d3748",
      marginBottom: "8px",
    },
    residenciaDetail: {
      fontSize: "14px",
      color: "#718096",
      marginBottom: "4px",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "uppercase"
    },
    actions: {
      display: "flex",
      gap: "8px",
    },
    editButton: {
      backgroundColor: "#3182ce",
      color: "#ffffff",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
      ":hover": {
        backgroundColor: "#2c5282"
      }
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
      ":hover": {
        backgroundColor: "#c53030"
      }
    },
  };

  // Estilos dinámicos para los estatus
  const getStatusStyle = (status) => {
    switch(status) {
      case "Cita":
        return { ...styles.statusBadge, backgroundColor: "#f6e05e", color: "#744210" };
      case "Vendido":
        return { ...styles.statusBadge, backgroundColor: "#f56565", color: "white" };
      case "Libre":
      default:
        return { ...styles.statusBadge, backgroundColor: "#68d391", color: "white" };
    }
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Residencias</h1>
        <DropdownMenu />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div style={{
          backgroundColor: "#fed7d7",
          color: "#9b2c2c",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          {/* Columna 1 - Estatus */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Estatus *</label>
            <select
              name="estatus"
              value={formData.estatus}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="Libre">Libre</option>
              <option value="Cita">Cita</option>
              <option value="Vendido">Vendido</option>
            </select>
          </div>

          {/* Columna 2 - Hora */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Hora (opcional)</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          {/* Modelo de Residencia */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Modelo de Residencia *</label>
            <select
              name="modelo_idmodelo"
              value={formData.modelo_idmodelo}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Seleccionar modelo</option>
              {modelos.map(modelo => (
                <option key={modelo._id} value={modelo._id}>
                  {modelo.folio} - {modelo.metrosconstruccion}m²
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Procesando..." : editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de residencias */}
      {loading ? (
        <p style={styles.loadingText}>Cargando residencias...</p>
      ) : residencias.length === 0 ? (
        <p style={styles.noResidenciasText}>No hay residencias registradas.</p>
      ) : (
        <div style={styles.residenciasList}>
          {residencias.map((residencia) => (
            <div key={residencia._id} style={styles.residenciaCard}>
              <div style={styles.residenciaInfo}>
                <p style={styles.residenciaTitle}>
                  Modelo: {residencia.modelo_idmodelo?.folio || "N/A"}
                </p>
                <p style={styles.residenciaDetail}>
                  <span style={getStatusStyle(residencia.estatus)}>
                    {residencia.estatus || "Libre"}
                  </span>
                  {residencia.hora && ` - Hora: ${residencia.hora}`}
                </p>
                <p style={styles.residenciaDetail}>
                  Construcción: {residencia.modelo_idmodelo?.metrosconstruccion || "N/A"} m²
                </p>
                <p style={styles.residenciaDetail}>
                  Cuartos: {residencia.modelo_idmodelo?.cuartos || "N/A"}
                </p>
              </div>
              <div style={styles.actions}>
                <button
                  onClick={() => handleEdit(residencia)}
                  style={styles.editButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(residencia._id)}
                  style={styles.deleteButton}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Residencias;