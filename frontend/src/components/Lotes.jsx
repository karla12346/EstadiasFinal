import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu"; // Importa el menú desplegable

const API_URL = "http://localhost:5000/api/lotes"; // Ruta corregida

const Lotes = () => {
  const { user } = useAuth(); // Obtén el usuario autenticado
  const [lotes, setLotes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    folio: "",
    partida: "",
    direccion: "",
    longitud: "",
    latitud: "",
    imagen: "",
    servicios: "",
    descripcion: "",
    precioventa: "",
    lotificacion_idotificacion: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener la lista de lotes
  const fetchLotes = useCallback(async () => {
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
      setLotes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo lotes:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLotes();
  }, [fetchLotes]); // Ejecuta fetchLotes cuando cambie

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar o actualizar lote
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

      setFormData({
        nombre: "",
        folio: "",
        partida: "",
        direccion: "",
        longitud: "",
        latitud: "",
        imagen: "",
        servicios: "",
        descripcion: "",
        precioventa: "",
        lotificacion_idotificacion: "",
      });
      setEditId(null);
      fetchLotes(); // Recargar lista
    } catch (error) {
      console.error("Error al guardar lote:", error);
    }
  };

  // Eliminar lote
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este lote?")) return;

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

      fetchLotes();
    } catch (error) {
      console.error("Error al eliminar lote:", error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (lote) => {
    setEditId(lote._id);
    setFormData({
      nombre: lote.nombre,
      folio: lote.folio,
      partida: lote.partida,
      direccion: lote.direccion,
      longitud: lote.longitud,
      latitud: lote.latitud,
      imagen: lote.imagen,
      servicios: lote.servicios,
      descripcion: lote.descripcion,
      precioventa: lote.precioventa,
      lotificacion_idotificacion: lote.lotificacion_idotificacion,
    });
  };

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Lotes</h1>
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
          <label style={styles.label}>Imagen (URL)</label>
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Servicios</label>
          <input
            type="text"
            name="servicios"
            value={formData.servicios}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>
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
          <label style={styles.label}>ID de la Lotificación</label>
          <input
            type="text"
            name="lotificacion_idotificacion"
            value={formData.lotificacion_idotificacion}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de lotes */}
      {loading ? (
        <p style={styles.loadingText}>Cargando lotes...</p>
      ) : (
        <div style={styles.lotesList}>
          {lotes.length === 0 ? (
            <p style={styles.noLotesText}>No hay lotes registrados.</p>
          ) : (
            lotes.map((lote) => (
              <div key={lote._id} style={styles.loteCard}>
                <div>
                  <p style={styles.loteNombre}>Nombre: {lote.nombre}</p>
                  <p style={styles.loteFolio}>Folio: {lote.folio}</p>
                  <p style={styles.lotePartida}>Partida: {lote.partida}</p>
                  <p style={styles.loteDireccion}>Dirección: {lote.direccion}</p>
                  <p style={styles.loteLongitud}>Longitud: {lote.longitud}</p>
                  <p style={styles.loteLatitud}>Latitud: {lote.latitud}</p>
                  <p style={styles.loteImagen}>Imagen: {lote.imagen}</p>
                  <p style={styles.loteServicios}>Servicios: {lote.servicios}</p>
                  <p style={styles.loteDescripcion}>Descripción: {lote.descripcion}</p>
                  <p style={styles.lotePrecio}>Precio: ${lote.precioventa}</p>
                  <p style={styles.loteLotificacion}>
                    Lotificación: {lote.lotificacion_idotificacion}
                  </p>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handleEdit(lote)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(lote._id)}
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
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    minHeight: "100px",
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
  noLotesText: {
    textAlign: "center",
    color: "#718096",
  },
  lotesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  loteCard: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loteNombre: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  loteFolio: {
    fontSize: "14px",
    color: "#718096",
  },
  lotePartida: {
    fontSize: "14px",
    color: "#718096",
  },
  loteDireccion: {
    fontSize: "14px",
    color: "#718096",
  },
  loteLongitud: {
    fontSize: "14px",
    color: "#718096",
  },
  loteLatitud: {
    fontSize: "14px",
    color: "#718096",
  },
  loteImagen: {
    fontSize: "14px",
    color: "#718096",
    maxWidth: "300px", // Limita el ancho del contenedor
    overflow: "hidden", // Oculta el texto que no cabe
    whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
    textOverflow: "ellipsis", // Muestra "..." cuando el texto no cabe
    margin: "0 10px", // Agrega un margen a los lados
  },
  loteServicios: {
    fontSize: "14px",
    color: "#718096",
  },
  loteDescripcion: {
    fontSize: "14px",
    color: "#718096",
  },
  lotePrecio: {
    fontSize: "14px",
    color: "#718096",
  },
  loteLotificacion: {
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

export default Lotes;