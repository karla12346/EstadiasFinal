import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faPlus, faSearch, faSync, faTimes, faMapMarkerAlt, faInfoCircle, faDollarSign, faFileAlt, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const API_URL = "http://localhost:5000/api/lotes";

const Lotes = () => {
  const { user } = useAuth();
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedLote, setSelectedLote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchLotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setLotes(data);
    } catch (error) {
      console.error("Error obteniendo lotes:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLotes();
  }, [fetchLotes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        throw new Error(errorData.message || "Error en la petición");
      }

      resetForm();
      fetchLotes();
    } catch (error) {
      console.error("Error al guardar lote:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este lote?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar");
      fetchLotes();
    } catch (error) {
      console.error("Error al eliminar lote:", error);
    }
  };

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
    setIsFormVisible(true);
  };

  const resetForm = () => {
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
    setIsFormVisible(false);
  };

  const handleLoteClick = (lote) => {
    setSelectedLote(lote);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLote(null);
  };

  const filteredLotes = lotes.filter(lote =>
    Object.values(lote).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={styles.container}>
      {/* Modal de detalles del lote */}
      {showModal && selectedLote && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedLote.nombre}</h2>
              <button onClick={closeModal} style={styles.closeButton}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {selectedLote.imagen && (
                <div style={styles.modalImageContainer}>
                  <img src={selectedLote.imagen} alt={selectedLote.nombre} style={styles.modalImage} />
                </div>
              )}
              
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <FontAwesomeIcon icon={faFileAlt} style={styles.detailIcon} />
                  <div>
                    <p style={styles.detailLabel}>Folio</p>
                    <p style={styles.detailValue}>{selectedLote.folio}</p>
                  </div>
                </div>
                
                <div style={styles.detailItem}>
                  <FontAwesomeIcon icon={faDollarSign} style={styles.detailIcon} />
                  <div>
                    <p style={styles.detailLabel}>Precio de Venta</p>
                    <p style={{...styles.detailValue, color: '#10b981', fontWeight: 'bold'}}>
                      ${selectedLote.precioventa.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div style={styles.detailItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.detailIcon} />
                  <div>
                    <p style={styles.detailLabel}>Dirección</p>
                    <p style={styles.detailValue}>{selectedLote.direccion}</p>
                  </div>
                </div>
                
                <div style={styles.detailItem}>
                  <FontAwesomeIcon icon={faLayerGroup} style={styles.detailIcon} />
                  <div>
                    <p style={styles.detailLabel}>Partida</p>
                    <p style={styles.detailValue}>{selectedLote.partida || 'N/A'}</p>
                  </div>
                </div>
                
                <div style={styles.detailItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.detailIcon} />
                  <div>
                    <p style={styles.detailLabel}>Coordenadas</p>
                    <p style={styles.detailValue}>
                      {selectedLote.latitud && selectedLote.longitud 
                        ? `${selectedLote.latitud}, ${selectedLote.longitud}`
                        : 'No especificadas'}
                    </p>
                  </div>
                </div>
                
                <div style={styles.detailItem}>
                  <FontAwesomeIcon icon={faInfoCircle} style={styles.detailIcon} />
                  <div>
                    <p style={styles.detailLabel}>ID Lotificación</p>
                    <p style={styles.detailValue}>{selectedLote.lotificacion_idotificacion || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              {selectedLote.servicios && (
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Servicios</h3>
                  <p style={styles.sectionContent}>{selectedLote.servicios}</p>
                </div>
              )}
              
              {selectedLote.descripcion && (
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Descripción</h3>
                  <p style={styles.sectionContent}>{selectedLote.descripcion}</p>
                </div>
              )}
            </div>
            
            <div style={styles.modalFooter}>
              <button 
                onClick={() => {
                  handleEdit(selectedLote);
                  closeModal();
                }}
                style={styles.modalEditButton}
              >
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: "8px" }} />
                Editar Lote
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Gestión de Lotes</h1>
          <p style={styles.subtitle}>Administra los lotes disponibles</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            onClick={fetchLotes}
            style={styles.refreshButton}
            title="Actualizar lista"
          >
            <FontAwesomeIcon icon={faSync} />
          </button>
          <DropdownMenu />
        </div>
      </div>

      <div style={styles.actionBar}>
        <div style={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar lotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            style={styles.toggleFormButton}
          >
            <FontAwesomeIcon icon={isFormVisible ? faPlus : faPlus} />
            {isFormVisible ? "Ocultar Formulario" : "Nuevo Lote"}
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>{editId ? "Editar Lote" : "Agregar Nuevo Lote"}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGrid}>
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
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Precio de Venta ($)</label>
                <input
                  type="number"
                  name="precioventa"
                  value={formData.precioventa}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  min="0"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>ID Lotificación</label>
                <input
                  type="text"
                  name="lotificacion_idotificacion"
                  value={formData.lotificacion_idotificacion}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              
              <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                <label style={styles.label}>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="3"
                />
              </div>
            </div>
            
            <div style={styles.formActions}>
              <button 
                type="button" 
                onClick={resetForm}
                style={styles.cancelButton}
              >
                Cancelar
              </button>
              <button type="submit" style={styles.submitButton}>
                <FontAwesomeIcon icon={editId ? faSave : faPlus} style={{ marginRight: "8px" }} />
                {editId ? "Guardar Cambios" : "Agregar Lote"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.listContainer}>
        <div style={styles.listHeader}>
          <h2 style={styles.listTitle}>Listado de Lotes</h2>
          <span style={styles.loteCount}>{filteredLotes.length} {filteredLotes.length === 1 ? 'lote' : 'lotes'}</span>
        </div>
        
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Cargando lotes...</p>
          </div>
        ) : (
          <>
            {filteredLotes.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIllustration}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={styles.emptyText}>No se encontraron lotes</p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    style={styles.clearSearchButton}
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            ) : (
              <div style={styles.lotesGrid}>
                {filteredLotes.map((lote) => (
                  <div 
                    key={lote._id} 
                    style={styles.loteCard}
                    onClick={() => handleLoteClick(lote)}
                  >
                    {lote.imagen && (
                      <div style={styles.cardImageContainer}>
                        <img src={lote.imagen} alt={lote.nombre} style={styles.cardImage} />
                      </div>
                    )}
                    <div style={styles.cardBody}>
                      <div style={styles.cardHeader}>
                        <h3 style={styles.loteNombre}>{lote.nombre}</h3>
                        <span style={styles.loteFolio}>Folio: {lote.folio}</span>
                      </div>
                      
                      <div style={styles.cardContent}>
                        <p style={styles.lotePrecio}>${lote.precioventa.toLocaleString()}</p>
                        <p style={styles.loteDireccion}>
                          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "8px", color: "#64748b" }} />
                          {lote.direccion}
                        </p>
                        {lote.descripcion && (
                          <p style={styles.loteDescripcion}>{lote.descripcion}</p>
                        )}
                      </div>
                      
                      <div style={styles.cardActions}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(lote);
                          }}
                          style={styles.editButton}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(lote._id);
                          }}
                          style={styles.deleteButton}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Estilos mejorados con modal
const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    position: 'relative'
  },
  // Estilos del modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  modalHeader: {
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    backgroundColor: '#ffffff',
    zIndex: 10
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#f1f5f9',
      color: '#475569'
    }
  },
  modalContent: {
    padding: '20px'
  },
  modalImageContainer: {
    height: '300px',
    overflow: 'hidden',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#f1f5f9'
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  detailIcon: {
    color: '#6366f1',
    fontSize: '18px',
    marginTop: '2px'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 4px 0'
  },
  detailValue: {
    fontSize: '16px',
    color: '#1e293b',
    fontWeight: '500',
    margin: 0
  },
  detailSection: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#1e293b',
    margin: '0 0 12px 0',
    fontWeight: '600'
  },
  sectionContent: {
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.6',
    margin: 0
  },
  modalFooter: {
    padding: '20px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 10
  },
  modalEditButton: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      backgroundColor: '#4338ca'
    }
  },
  // Resto de estilos (igual que antes)
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "20px"
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0",
    background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block"
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0"
  },
  actionBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px"
  },
  searchContainer: {
    position: "relative",
    flex: 1,
    maxWidth: "500px",
    minWidth: "250px"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "16px"
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: "all 0.2s",
    ":focus": {
      outline: "none",
      borderColor: "#6366f1",
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)"
    }
  },
  buttonGroup: {
    display: "flex",
    gap: "12px"
  },
  toggleFormButton: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ":hover": {
      backgroundColor: "#4338ca",
      transform: "translateY(-1px)"
    }
  },
  refreshButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#2563eb",
      transform: "rotate(45deg)"
    }
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: "32px",
    border: "1px solid #e2e8f0"
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 20px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  form: {
    width: "100%"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  formGroup: {
    marginBottom: "0"
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#475569",
    marginBottom: "8px",
    fontWeight: "500"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    transition: "all 0.2s",
    ":focus": {
      outline: "none",
      borderColor: "#6366f1",
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)"
    }
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    transition: "all 0.2s",
    minHeight: "100px",
    resize: "vertical",
    ":focus": {
      outline: "none",
      borderColor: "#6366f1",
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)"
    }
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9"
  },
  submitButton: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "#4338ca",
      transform: "translateY(-1px)"
    }
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "#64748b",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#f1f5f9"
    }
  },
  listContainer: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e2e8f0"
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  listTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0"
  },
  loteCount: {
    fontSize: "14px",
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "6px 12px",
    borderRadius: "20px"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0"
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    borderLeftColor: "#3b82f6",
    animation: "spin 1s linear infinite",
    marginBottom: "16px"
  },
  loadingText: {
    color: "#64748b",
    fontSize: "16px"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    textAlign: "center"
  },
  emptyIllustration: {
    marginBottom: "16px",
    opacity: "0.6"
  },
  emptyText: {
    color: "#64748b",
    fontSize: "16px",
    marginBottom: "16px"
  },
  clearSearchButton: {
    backgroundColor: "#f1f5f9",
    color: "#334155",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#e2e8f0"
    }
  },
  lotesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px"
  },
  loteCard: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }
  },
  cardImageContainer: {
    height: "180px",
    overflow: "hidden",
    position: "relative"
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.05)"
    }
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "12px"
  },
  loteNombre: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0"
  },
  loteFolio: {
    fontSize: "14px",
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "4px 8px",
    borderRadius: "4px"
  },
  cardContent: {
    flex: 1,
    marginBottom: "16px"
  },
  lotePrecio: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#10b981",
    margin: "0 0 8px 0"
  },
  loteDireccion: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center"
  },
  loteDescripcion: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.5",
    margin: "0",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    marginTop: "auto"
  },
  editButton: {
    backgroundColor: "#e0e7ff",
    color: "#4f46e5",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flex: "1",
    justifyContent: "center",
    ":hover": {
      backgroundColor: "#c7d2fe"
    }
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flex: "1",
    justifyContent: "center",
    ":hover": {
      backgroundColor: "#fecaca"
    }
  }
};

export default Lotes;