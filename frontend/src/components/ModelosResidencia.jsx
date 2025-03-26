import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

const API_URL = "http://localhost:5000/api/modelos-residencia";

const ModelosResidencia = () => {
  const { user } = useAuth();
  const [modelos, setModelos] = useState([]);
  const [formData, setFormData] = useState({ 
    terreno: "", 
    metrosconstruccion: "", 
    niveles: "", 
    cuartos: "", 
    folio: "", 
    partida: "",
    direccionDicabi: "",
    longitud: "",
    latitud: "",
    residencial_idresidencial: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener la lista de modelos
  const fetchModelos = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setModelos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo modelos:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchModelos();
  }, [fetchModelos]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar o actualizar modelo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error("Error en la petición");
      }

      // Resetear formulario
      setFormData({ 
        terreno: "", 
        metrosconstruccion: "", 
        niveles: "", 
        cuartos: "", 
        folio: "", 
        partida: "",
        direccionDicabi: "",
        longitud: "",
        latitud: "",
        residencial_idresidencial: ""
      });
      setEditId(null);
      fetchModelos();
    } catch (error) {
      console.error("Error al guardar modelo:", error);
    }
  };

  // Eliminar modelo
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este modelo?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      fetchModelos();
    } catch (error) {
      console.error("Error al eliminar modelo:", error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (modelo) => {
    setEditId(modelo._id);
    setFormData({
      terreno: modelo.terreno,
      metrosconstruccion: modelo.metrosconstruccion,
      niveles: modelo.niveles,
      cuartos: modelo.cuartos,
      folio: modelo.folio,
      partida: modelo.partida,
      direccionDicabi: modelo.direccionDicabi,
      longitud: modelo.longitud,
      latitud: modelo.latitud,
      residencial_idresidencial: modelo.residencial_idresidencial._id || modelo.residencial_idresidencial
    });
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Modelos de Residencia</h1>
        <DropdownMenu />
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.gridContainer}>
          {/* Columna 1 */}
          <div style={styles.gridColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Terreno (m²)</label>
              <input
                type="number"
                name="terreno"
                value={formData.terreno}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Metros Construcción (m²)</label>
              <input
                type="number"
                name="metrosconstruccion"
                value={formData.metrosconstruccion}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Niveles</label>
              <input
                type="number"
                name="niveles"
                value={formData.niveles}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Cuartos</label>
              <input
                type="number"
                name="cuartos"
                value={formData.cuartos}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>
          
          {/* Columna 2 */}
          <div style={styles.gridColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Folio</label>
              <input
                type="text"
                name="folio"
                value={formData.folio}
                onChange={handleChange}
                style={styles.input}
                required
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
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Dirección DICABI</label>
              <input
                type="text"
                name="direccionDicabi"
                value={formData.direccionDicabi}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>
          
          {/* Columna 3 */}
          <div style={styles.gridColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Longitud</label>
              <input
                type="text"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
                style={styles.input}
                required
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
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>ID Residencial</label>
              <input
                type="text"
                name="residencial_idresidencial"
                value={formData.residencial_idresidencial}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>
        </div>
        
        <button type="submit" style={styles.submitButton}>
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de modelos */}
      {loading ? (
        <p style={styles.loadingText}>Cargando modelos...</p>
      ) : (
        <div style={styles.modelosList}>
          {modelos.length === 0 ? (
            <p style={styles.noModelosText}>No hay modelos registrados.</p>
          ) : (
            modelos.map((modelo) => (
              <div key={modelo._id} style={styles.modeloCard}>
                <div style={styles.modeloInfo}>
                  <p style={styles.modeloTitle}>Modelo: {modelo.folio}</p>
                  <p style={styles.modeloDetail}>Terreno: {modelo.terreno} m²</p>
                  <p style={styles.modeloDetail}>Construcción: {modelo.metrosconstruccion} m²</p>
                  <p style={styles.modeloDetail}>Niveles: {modelo.niveles} | Cuartos: {modelo.cuartos}</p>
                  <p style={styles.modeloDetail}>Residencial: {modelo.residencial_idresidencial?.nombre || modelo.residencial_idresidencial}</p>
                </div>
                <div style={styles.actions}>
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

// Estilos (ampliados para el nuevo formulario)
const styles = {
  container: {
    maxWidth: "1400px",
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
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
    marginTop: "10px",
  },
  loadingText: {
    textAlign: "center",
    color: "#4a5568",
  },
  noModelosText: {
    textAlign: "center",
    color: "#718096",
  },
  modelosList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  modeloCard: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeloInfo: {
    flex: 1,
  },
  modeloTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: "8px",
  },
  modeloDetail: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "4px",
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

export default ModelosResidencia;