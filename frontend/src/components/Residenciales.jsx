import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

const API_URL = "http://localhost:5000/api/residenciales";

const Residenciales = () => {
  const { user } = useAuth();
  const [residenciales, setResidenciales] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({ 
    nombre: "", 
    sucursal_idsucursal: "" 
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener residenciales y sucursales
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resResidenciales, resSucursales] = await Promise.all([
        fetch(API_URL, {
          headers: { Authorization: `Bearer ${user?.token}` }
        }),
        fetch("http://localhost:5000/api/sucursales", {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
      ]);

      if (!resResidenciales.ok || !resSucursales.ok) {
        throw new Error("Error al obtener datos");
      }

      const [dataResidenciales, dataSucursales] = await Promise.all([
        resResidenciales.json(),
        resSucursales.json()
      ]);

      setResidenciales(dataResidenciales);
      setSucursales(dataSucursales);
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      setFormData({ nombre: "", sucursal_idsucursal: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Editar residencial
  const handleEdit = (residencial) => {
    setEditId(residencial._id);
    setFormData({
      nombre: residencial.nombre,
      sucursal_idsucursal: residencial.sucursal_idsucursal._id || residencial.sucursal_idsucursal
    });
  };

  // Eliminar residencial
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este residencial?")) return;

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

  // Estilos en línea (como en tu ejemplo)
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
    noResidencialesText: {
      textAlign: "center",
      color: "#718096",
    },
    residencialesList: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f7fafc",
      textAlign: "left",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#4a5568",
      borderBottom: "1px solid #e2e8f0",
    },
    tableCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #e2e8f0",
    },
    actionButton: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
      marginRight: "8px",
    },
    editButton: {
      backgroundColor: "#ecc94b",
      color: "#ffffff",
    },
    deleteButton: {
      backgroundColor: "#f56565",
      color: "#ffffff",
    },
    errorMessage: {
      backgroundColor: "#fed7d7",
      color: "#9b2c2c",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Residenciales</h1>
        <DropdownMenu />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div style={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre del Residencial</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Sucursal</label>
              <select
                name="sucursal_idsucursal"
                value={formData.sucursal_idsucursal}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Seleccionar sucursal</option>
                {sucursales.map(sucursal => (
                  <option key={sucursal._id} value={sucursal._id}>
                    {sucursal.nombre}
                  </option>
                ))}
              </select>
            </div>
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

      {/* Lista de residenciales */}
      {loading ? (
        <p style={styles.loadingText}>Cargando residenciales...</p>
      ) : residenciales.length === 0 ? (
        <p style={styles.noResidencialesText}>No hay residenciales registrados.</p>
      ) : (
        <div style={styles.residencialesList}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Nombre</th>
                <th style={styles.tableHeader}>Sucursal</th>
                <th style={styles.tableHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {residenciales.map((residencial) => (
                <tr key={residencial._id}>
                  <td style={styles.tableCell}>{residencial.nombre}</td>
                  <td style={styles.tableCell}>
                    {residencial.sucursal_idsucursal?.nombre || "Sin sucursal"}
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEdit(residencial)}
                      style={{ ...styles.actionButton, ...styles.editButton }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(residencial._id)}
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
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

export default Residenciales;