import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faUser, 
  faBuilding, 
  faSignOutAlt, 
  faMap, 
  faLayerGroup, 
  faHome, 
  faHouseUser,
  faStore,
  faCity
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleEdificiosClick = () => {
    setIsOpen(false);
    navigate("/edificios");
  };

  const handleApartmentsClick = () => {
    setIsOpen(false);
    navigate("/apartamentos");
  };

  const handleLotesClick = () => {
    setIsOpen(false);
    navigate("/lotes");
  };

  const handleLotificacionClick = () => {
    setIsOpen(false);
    navigate("/lotificacion");
  };

  const handleModelosApartamentoClick = () => {
    setIsOpen(false);
    navigate("/modeloapartamento");
  };

  const handleModelosResidenciaClick = () => {
    setIsOpen(false);
    navigate("/modeloresidencial");
  };

  const handleResidenciasClick = () => {
    setIsOpen(false);
    navigate("/residencias");
  };

  const handleSucursalesClick = () => {
    setIsOpen(false);
    navigate("/sucursales");
  };

  // Nueva función para Residenciales
  const handleResidencialesClick = () => {
    setIsOpen(false);
    navigate("/recidenciales");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.dropdownContainer}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.menuButton}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {isOpen && (
        <div style={styles.dropdownMenu}>
          <ul style={styles.menuList}>
            <li onClick={handleProfileClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faUser} style={styles.iconBlue} />
              <span style={styles.menuText}>Perfil</span>
            </li>
            <li onClick={handleEdificiosClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faBuilding} style={styles.iconPurple} />
              <span style={styles.menuText}>Edificios</span>
            </li>
            <li onClick={handleApartmentsClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faBuilding} style={styles.iconPurple} />
              <span style={styles.menuText}>Apartamentos</span>
            </li>
            <li onClick={handleLotesClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faMap} style={styles.iconPurple} />
              <span style={styles.menuText}>Lotes</span>
            </li>
            <li onClick={handleLotificacionClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faLayerGroup} style={styles.iconPurple} />
              <span style={styles.menuText}>Lotificación</span>
            </li>
            <li onClick={handleModelosApartamentoClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faHome} style={styles.iconPurple} />
              <span style={styles.menuText}>Modelos de Apartamento</span>
            </li>
            <li onClick={handleModelosResidenciaClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faHouseUser} style={styles.iconPurple} />
              <span style={styles.menuText}>Modelos de Residencia</span>
            </li>
            <li onClick={handleResidenciasClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faBuilding} style={styles.iconPurple} />
              <span style={styles.menuText}>Residencias</span>
            </li>
            <li onClick={handleSucursalesClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faStore} style={styles.iconPurple} />
              <span style={styles.menuText}>Sucursales</span>
            </li>
            {/* Opción para Residenciales */}
            <li onClick={handleResidencialesClick} style={styles.menuItem}>
              <FontAwesomeIcon icon={faCity} style={styles.iconPurple} />
              <span style={styles.menuText}>Residenciales</span>
            </li>
            <li onClick={handleLogoutClick} style={{ ...styles.menuItem, ...styles.menuItemRed }}>
              <FontAwesomeIcon icon={faSignOutAlt} style={styles.iconRed} />
              <span style={styles.menuText}>Cerrar sesión</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Estilos
const styles = {
  dropdownContainer: {
    position: "relative",
    display: "inline-block",
  },
  menuButton: {
    padding: "10px",
    borderRadius: "50%",
    backgroundColor: "#1a202c",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    marginTop: "8px",
    width: "240px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  menuList: {
    listStyle: "none",
    padding: "8px 0",
    margin: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    '&:hover': {
      backgroundColor: "#f7fafc",
    }
  },
  menuItemRed: {
    color: "#e53e3e",
  },
  menuText: {
    marginLeft: "12px",
    fontSize: "14px",
    color: "#2d3748",
  },
  iconBlue: {
    color: "#3182ce",
    width: "16px",
    height: "16px",
  },
  iconPurple: {
    color: "#805ad5",
    width: "16px",
    height: "16px",
  },
  iconRed: {
    color: "#e53e3e",
    width: "16px",
    height: "16px",
  },
};

export default DropdownMenu;