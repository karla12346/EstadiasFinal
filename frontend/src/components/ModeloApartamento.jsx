import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./DropdownMenu"; // Importa el menú desplegable

const API_URL = "http://localhost:5000/api/modelos-apartamento"; // URL del backend

const ModeloApartamento = () => {
  const [modelosApartamento, setModelosApartamento] = useState([]);
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

  // Obtener todos los modelos de apartamento
  const fetchModelosApartamento = async () => {
    try {
      const response = await axios.get(API_URL);
      setModelosApartamento(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo modelos de apartamento:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModelosApartamento();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Insertar o actualizar un modelo de apartamento
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Actualizar modelo de apartamento
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        // Insertar nuevo modelo de apartamento
        await axios.post(API_URL, formData);
      }
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
      fetchModelosApartamento(); // Recargar la lista
    } catch (error) {
      console.error("Error al guardar modelo de apartamento:", error);
    }
  };

  // Editar un modelo de apartamento
  const handleEdit = (modeloApartamento) => {
    setEditId(modeloApartamento._id);
    setFormData({
      metrosconstruccion: modeloApartamento.metrosconstruccion,
      niveles: modeloApartamento.niveles,
      cuartos: modeloApartamento.cuartos,
      baños: modeloApartamento.baños,
      folio: modeloApartamento.folio,
      partida: modeloApartamento.partida,
      direccionDicabi: modeloApartamento.direccionDicabi,
      longitud: modeloApartamento.longitud,
      latitud: modeloApartamento.latitud,
      numero: modeloApartamento.numero,
      edificio_idedificio: modeloApartamento.edificio_idedificio,
      edificio_sucursal_idsucursal: modeloApartamento.edificio_sucursal_idsucursal,
    });
  };

  // Eliminar un modelo de apartamento
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este modelo de apartamento?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchModelosApartamento(); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar modelo de apartamento:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Modelos de Apartamento</h1>
        <DropdownMenu /> {/* Menú desplegable */}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Metros de Construcción</label>
          <input
            type="text"
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
            type="text"
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
        <div style={styles.formGroup}>
          <label style={styles.label}>Baños</label>
          <input
            type="number"
            name="baños"
            value={formData.baños}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
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
          <label style={styles.label}>Dirección Dicabi</label>
          <input
            type="text"
            name="direccionDicabi"
            value={formData.direccionDicabi}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
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
          <label style={styles.label}>Número</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            style={styles.input}
            required
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
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>ID de la Sucursal</label>
          <input
            type="text"
            name="edificio_sucursal_idsucursal"
            value={formData.edificio_sucursal_idsucursal}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de modelos de apartamento */}
      {loading ? (
        <p style={styles.loadingText}>Cargando modelos de apartamento...</p>
      ) : (
        <div style={styles.modelosList}>
          {modelosApartamento.length === 0 ? (
            <p style={styles.noModelosText}>No hay modelos de apartamento registrados.</p>
          ) : (
            modelosApartamento.map((modelo) => (
              <div key={modelo._id} style={styles.modeloCard}>
                <div>
                  <p style={styles.modeloNombre}>Metros de Construcción: {modelo.metrosconstruccion}</p>
                  <p style={styles.modeloNiveles}>Niveles: {modelo.niveles}</p>
                  <p style={styles.modeloCuartos}>Cuartos: {modelo.cuartos}</p>
                  <p style={styles.modeloBaños}>Baños: {modelo.baños}</p>
                  <p style={styles.modeloFolio}>Folio: {modelo.folio}</p>
                  <p style={styles.modeloPartida}>Partida: {modelo.partida}</p>
                  <p style={styles.modeloDireccion}>Dirección Dicabi: {modelo.direccionDicabi}</p>
                  <p style={styles.modeloLongitud}>Longitud: {modelo.longitud}</p>
                  <p style={styles.modeloLatitud}>Latitud: {modelo.latitud}</p>
                  <p style={styles.modeloNumero}>Número: {modelo.numero}</p>
                  <p style={styles.modeloEdificio}>ID del Edificio: {modelo.edificio_idedificio}</p>
                  <p style={styles.modeloSucursal}>ID de la Sucursal: {modelo.edificio_sucursal_idsucursal}</p>
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
  modeloNombre: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  modeloNiveles: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloCuartos: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloBaños: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloFolio: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloPartida: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloDireccion: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloLongitud: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloLatitud: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloNumero: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloEdificio: {
    fontSize: "14px",
    color: "#718096",
  },
  modeloSucursal: {
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

export default ModeloApartamento;