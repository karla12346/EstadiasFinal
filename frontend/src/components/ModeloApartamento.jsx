import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";

const API_URL = "http://localhost:5000/api/modelos-apartamento";

const ModeloApartamento = () => {
  const [modelos, setModelos] = useState([]);
  const [formData, setFormData] = useState({
    metrosconstruccion: "",
    niveles: "",
    cuartos: "",
    baños: "",
    folio: "",
    partida: "",
    direccionDicabi: "",
    longitud: "",
    latitud: "",
    numero: "",
    edificio_idedificio: "",
    edificio_sucursal_idsucursal: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchModelos = async () => {
    try {
      const response = await axios.get(API_URL);
      setModelos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo modelos:", error);
      setError("Error al cargar modelos de apartamento");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModelos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'metrosconstruccion' || name === 'niveles' || 
               name === 'cuartos' || name === 'baños' ? 
               (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.metrosconstruccion || !formData.niveles) {
      setError("Metros de construcción y niveles son campos requeridos");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      resetForm();
      fetchModelos();
    } catch (error) {
      console.error("Error al guardar modelo:", error.response?.data);
      setError(error.response?.data?.message || "Error al guardar modelo");
    }
  };

  const resetForm = () => {
    setFormData({
      metrosconstruccion: "",
      niveles: "",
      cuartos: "",
      baños: "",
      folio: "",
      partida: "",
      direccionDicabi: "",
      longitud: "",
      latitud: "",
      numero: "",
      edificio_idedificio: "",
      edificio_sucursal_idsucursal: "",
    });
    setEditId(null);
  };

  const handleEdit = (modelo) => {
    setEditId(modelo._id);
    setFormData({
      metrosconstruccion: modelo.metrosconstruccion,
      niveles: modelo.niveles,
      cuartos: modelo.cuartos,
      baños: modelo.baños,
      folio: modelo.folio,
      partida: modelo.partida,
      direccionDicabi: modelo.direccionDicabi,
      longitud: modelo.longitud,
      latitud: modelo.latitud,
      numero: modelo.numero,
      edificio_idedificio: modelo.edificio_idedificio,
      edificio_sucursal_idsucursal: modelo.edificio_sucursal_idsucursal,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este modelo?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchModelos();
    } catch (error) {
      console.error("Error al eliminar modelo:", error);
      setError("Error al eliminar modelo");
    }
  };

  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Modelos de Apartamento</h1>
        <DropdownMenu />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div style={styles.errorAlert}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Metros de construcción *</label>
            <input
              type="number"
              name="metrosconstruccion"
              value={formData.metrosconstruccion}
              onChange={handleChange}
              style={styles.input}
              required
              min="0"
              step="0.01"
              placeholder="Ej: 120.50"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Niveles *</label>
            <input
              type="number"
              name="niveles"
              value={formData.niveles}
              onChange={handleChange}
              style={styles.input}
              required
              min="1"
              placeholder="Ej: 2"
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cuartos</label>
            <input
              type="number"
              name="cuartos"
              value={formData.cuartos}
              onChange={handleChange}
              style={styles.input}
              min="0"
              placeholder="Ej: 3"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Baños</label>
            <input
              type="number"
              name="baños"
              value={formData.baños}
              onChange={handleChange}
              style={styles.input}
              min="0"
              placeholder="Ej: 2"
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Folio</label>
            <input
              type="text"
              name="folio"
              value={formData.folio}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: FOL-12345"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Partida</label>
            <input
              type="text"
              name="partida"
              value={formData.partida}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: PART-67890"
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Dirección Dicabi</label>
          <input
            type="text"
            name="direccionDicabi"
            value={formData.direccionDicabi}
            onChange={handleChange}
            style={styles.input}
            placeholder="Ej: Calle Principal #123"
          />
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Longitud</label>
            <input
              type="text"
              name="longitud"
              value={formData.longitud}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: -99.133208"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Latitud</label>
            <input
              type="text"
              name="latitud"
              value={formData.latitud}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: 19.432608"
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Número</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: 101"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ID del Edificio</label>
            <input
              type="text"
              name="edificio_idedificio"
              value={formData.edificio_idedificio}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: 123"
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>ID de la Sucursal</label>
          <input
            type="text"
            name="edificio_sucursal_idsucursal"
            value={formData.edificio_sucursal_idsucursal}
            onChange={handleChange}
            style={styles.input}
            placeholder="Ej: 456"
          />
        </div>

        <div style={styles.formActions}>
          <button
            type="submit"
            style={editId ? styles.updateButton : styles.submitButton}
          >
            {editId ? "Actualizar Modelo" : "Agregar Modelo"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              style={styles.cancelButton}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      {/* Lista de modelos */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Cargando modelos...</p>
        </div>
      ) : (
        <div style={styles.listContainer}>
          {modelos.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No hay modelos registrados.</p>
            </div>
          ) : (
            modelos.map((modelo) => (
              <div key={modelo._id} style={styles.card}>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{modelo.metrosconstruccion} m² - {modelo.niveles} niveles</h3>
                  <div style={styles.cardDetails}>
                    <p><strong>Cuartos:</strong> {modelo.cuartos || 'No especificado'}</p>
                    <p><strong>Baños:</strong> {modelo.baños || 'No especificado'}</p>
                    <p><strong>Folio:</strong> {modelo.folio || 'No especificado'}</p>
                    <p><strong>Partida:</strong> {modelo.partida || 'No especificado'}</p>
                    <p><strong>Dirección:</strong> {modelo.direccionDicabi || 'No especificado'}</p>
                    {modelo.latitud && modelo.longitud && (
                      <p><strong>Coordenadas:</strong> {modelo.latitud}, {modelo.longitud}</p>
                    )}
                    <p><strong>Número:</strong> {modelo.numero || 'No especificado'}</p>
                    <p><strong>Edificio ID:</strong> {modelo.edificio_idedificio || 'No especificado'}</p>
                    <p><strong>Sucursal ID:</strong> {modelo.edificio_sucursal_idsucursal || 'No especificado'}</p>
                  </div>
                </div>
                <div style={styles.cardActions}>
                  <button
                    onClick={() => handleEdit(modelo)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(modelo._id)}
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

// Estilos CSS
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7fafc",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #e2e8f0"
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#2d3748",
    margin: "0"
  },
  errorAlert: {
    backgroundColor: "#fee2e2",
    borderLeft: "4px solid #dc2626",
    color: "#b91c1c",
    padding: "16px",
    marginBottom: "24px",
    borderRadius: "4px"
  },
  errorText: {
    margin: "0",
    fontWeight: "500"
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px"
  },
  formRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "16px",
    flexWrap: "wrap"
  },
  formGroup: {
    flex: "1",
    minWidth: "250px",
    marginBottom: "16px"
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
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    ":focus": {
      outline: "none",
      borderColor: "#3182ce",
      boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.2)"
    }
  },
  formActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap"
  },
  submitButton: {
    backgroundColor: "#38a169",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#2f855a"
    }
  },
  updateButton: {
    backgroundColor: "#3182ce",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#2c5282"
    }
  },
  cancelButton: {
    backgroundColor: "#718096",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#4a5568"
    }
  },
  editButton: {
    backgroundColor: "#3182ce",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#2c5282"
    }
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
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#c53030"
    }
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#3182ce",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    marginBottom: "16px"
  },
  loadingText: {
    color: "#4a5568",
    fontSize: "16px",
    fontWeight: "500"
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  emptyState: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  emptyText: {
    color: "#718096",
    fontSize: "16px",
    margin: "0"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { sm: "center" },
    transition: "transform 0.2s, box-shadow 0.2s",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }
  },
  cardContent: {
    flex: "1",
    marginBottom: { xs: "16px", sm: "0" }
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2d3748",
    margin: "0 0 12px 0"
  },
  cardDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "8px",
    fontSize: "14px",
    color: "#4a5568"
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    marginLeft: { sm: "20px" },
    alignSelf: { xs: "stretch", sm: "center" },
    "> button": {
      flex: "1"
    }
  }
};

// Agregar animación para el spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default ModeloApartamento;