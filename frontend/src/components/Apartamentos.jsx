import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faUser, 
  faBuilding, 
  faSignOutAlt, 
  faMap, 
  faHome, 
  faHouseUser,
  faStore,
  faCity,
  faBuildingUser,
  faChartArea,
  faCog,
  faSearch,
  faPlus,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/apartamentos";

const Apartamentos = () => {
  const { user, logout } = useAuth();
  const [apartamentos, setApartamentos] = useState([]);
  const [formData, setFormData] = useState({ 
    precioventa: "", 
    modeloApartamento_idmodelo: "", 
    descripcion: "",
    estado: "disponible"
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Obtener la lista de apartamentos
  const fetchApartamentos = useCallback(async () => {
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
      setApartamentos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error obteniendo apartamentos:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchApartamentos();
  }, [fetchApartamentos]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Agregar o actualizar apartamento
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
        body: JSON.stringify({
          ...formData,
          precioventa: Number(formData.precioventa)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error("Error en la petición");
      }

      setFormData({ 
        precioventa: "", 
        modeloApartamento_idmodelo: "", 
        descripcion: "",
        estado: "disponible"
      });
      setEditId(null);
      fetchApartamentos();
    } catch (error) {
      console.error("Error al guardar apartamento:", error);
    }
  };

  // Eliminar apartamento
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este apartamento?")) return;

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

      fetchApartamentos();
    } catch (error) {
      console.error("Error al eliminar apartamento:", error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (apartamento) => {
    setEditId(apartamento._id);
    setFormData({
      precioventa: apartamento.precioventa,
      modeloApartamento_idmodelo: apartamento.modeloApartamento_idmodelo,
      descripcion: apartamento.descripcion || "",
      estado: apartamento.estado || "disponible"
    });
  };

  // Funciones para el menú desplegable
  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/login");
  };

  // Filtrar apartamentos por búsqueda
  const filteredApartamentos = apartamentos.filter(apt => 
    apt.modeloApartamento_idmodelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Opciones del menú con sus colores
  const menuItems = [
    { path: "/profile", icon: faUser, color: "#3B82F6", label: "Perfil" },
    { path: "/inicio", icon: faHome, color: "#10B981", label: "Inicio" },
    { path: "/edificios", icon: faBuilding, color: "#6366F1", label: "Edificios" },
    { path: "/apartamentos", icon: faBuildingUser, color: "#8B5CF6", label: "Apartamentos" },
    { path: "/lotes", icon: faMap, color: "#EC4899", label: "Lotes" },
    { path: "/lotificacion", icon: faChartArea, color: "#14B8A6", label: "Lotificación" },
    { path: "/modeloapartamento", icon: faHome, color: "#F97316", label: "Modelos Apartamento" },
    { path: "/modeloresidencial", icon: faHouseUser, color: "#0EA5E9", label: "Modelos Residencia" },
    { path: "/residencias", icon: faBuilding, color: "#A855F7", label: "Residencias" },
    { path: "/recidenciales", icon: faCity, color: "#84CC16", label: "Residenciales" },
    { path: "/sucursales", icon: faStore, color: "#EF4444", label: "Sucursales" },
    { path: "/configuracion", icon: faCog, color: "#64748B", label: "Configuración" }
  ];

  return (
    <div style={styles.container}>
      {/* Encabezado con el menú desplegable */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Gestión de Apartamentos</h1>
          <p style={styles.subtitle}>Administra los apartamentos disponibles</p>
        </div>
        <div style={styles.menuContainer}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-label="Menú desplegable"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>

          {isMenuOpen && (
            <div style={styles.dropdownMenu}>
              <ul style={styles.menuList}>
                {menuItems.map((item, index) => (
                  <li 
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    style={styles.menuItem}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      style={{ color: item.color, width: "16px", height: "16px" }} 
                    />
                    <span style={styles.menuText}>{item.label}</span>
                  </li>
                ))}
                <li 
                  onClick={handleLogout}
                  style={{ ...styles.menuItem, ...styles.menuItemRed }}
                >
                  <FontAwesomeIcon 
                    icon={faSignOutAlt} 
                    style={{ color: "#F43F5E", width: "16px", height: "16px" }} 
                  />
                  <span style={styles.menuText}>Cerrar sesión</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Barra de búsqueda y acciones */}
      <div style={styles.actionBar}>
        <div style={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar apartamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Formulario */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>{editId ? "Editar Apartamento" : "Agregar Nuevo Apartamento"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
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
              <label style={styles.label}>Modelo de Apartamento</label>
              <input
                type="text"
                name="modeloApartamento_idmodelo"
                value={formData.modeloApartamento_idmodelo}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
            
            <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                style={{ ...styles.input, minHeight: "80px" }}
                rows="3"
              />
            </div>
          </div>
          
          <div style={styles.formActions}>
            {editId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditId(null);
                  setFormData({ 
                    precioventa: "", 
                    modeloApartamento_idmodelo: "", 
                    descripcion: "",
                    estado: "disponible"
                  });
                }}
                style={styles.cancelButton}
              >
                Cancelar
              </button>
            )}
            <button type="submit" style={styles.submitButton}>
              <FontAwesomeIcon icon={editId ? faEdit : faPlus} style={{ marginRight: "8px" }} />
              {editId ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de apartamentos */}
      <div style={styles.listContainer}>
        <h2 style={styles.listTitle}>Listado de Apartamentos</h2>
        
        {loading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Cargando apartamentos...</p>
          </div>
        ) : (
          <>
            {filteredApartamentos.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No se encontraron apartamentos</p>
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
              <div style={styles.apartmentsGrid}>
                {filteredApartamentos.map((apt) => (
                  <div key={apt._id} style={{
                    ...styles.apartmentCard,
                    borderLeft: `4px solid ${getStatusColor(apt.estado)}`
                  }}>
                    <div style={styles.cardHeader}>
                      <h3 style={styles.apartmentModel}>{apt.modeloApartamento_idmodelo}</h3>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(apt.estado)
                      }}>
                        {apt.estado}
                      </span>
                    </div>
                    
                    <p style={styles.apartmentPrice}>${apt.precioventa.toLocaleString()}</p>
                    
                    {apt.descripcion && (
                      <p style={styles.apartmentDescription}>{apt.descripcion}</p>
                    )}
                    
                    <div style={styles.cardActions}>
                      <button
                        onClick={() => handleEdit(apt)}
                        style={styles.editButton}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(apt._id)}
                        style={styles.deleteButton}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Eliminar</span>
                      </button>
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

// Función para obtener color según estado
const getStatusColor = (status) => {
  switch(status) {
    case "disponible": return "#10B981"; // verde
    case "reservado": return "#F59E0B"; // amarillo
    case "vendido": return "#EF4444"; // rojo
    default: return "#64748B"; // gris
  }
};

// Estilos mejorados
const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "20px"
  },
  headerLeft: {
    flex: 1
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 4px 0"
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0"
  },
  menuContainer: {
    position: "relative",
  },
  menuButton: {
    padding: "10px",
    borderRadius: "50%",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: "50px",
    width: "280px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease-out",
    overflow: "hidden"
  },
  menuList: {
    listStyle: "none",
    padding: "8px 0",
    margin: "0",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#f8fafc"
    }
  },
  menuItemRed: {
    color: "#F43F5E",
    marginTop: "4px",
    borderTop: "1px solid #f1f5f9"
  },
  menuText: {
    marginLeft: "12px",
    fontSize: "14px",
    color: "#334155",
    fontWeight: "500",
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
    maxWidth: "500px"
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
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: "32px"
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 20px 0"
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
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "12px"
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
      backgroundColor: "#4338ca"
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
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  listTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 20px 0"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 0"
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
  apartmentsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  apartmentCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    border: "1px solid #e2e8f0",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  apartmentModel: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0"
  },
  statusBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    textTransform: "capitalize"
  },
  apartmentPrice: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 12px 0"
  },
  apartmentDescription: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.5",
    margin: "0 0 16px 0"
  },
  cardActions: {
    display: "flex",
    gap: "8px"
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
    ":hover": {
      backgroundColor: "#fecaca"
    }
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

export default Apartamentos;