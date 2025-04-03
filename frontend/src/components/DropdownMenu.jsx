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
  faCity,
  faBuildingUser,
  faSitemap,
  faChartArea
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Paleta de colores mejorada para los iconos
  const menuItems = [
    { 
      path: "/profile", 
      icon: faUser, 
      color: "#3B82F6", // Azul vibrante
      label: "Perfil" 
    },
    { 
      path: "/inicio", 
      icon: faHome, 
      color: "#10B981", // Verde esmeralda
      label: "Inicio" 
    },
    { 
      path: "/edificios", 
      icon: faBuilding, 
      color: "#6366F1", // Violeta índigo
      label: "Edificios" 
    },
    { 
      path: "/apartamentos", 
      icon: faBuildingUser, 
      color: "#8B5CF6", // Violeta más claro
      label: "Apartamentos" 
    },
    { 
      path: "/lotes", 
      icon: faMap, 
      color: "#EC4899", // Rosa brillante
      label: "Lotes" 
    },
    { 
      path: "/lotificacion", 
      icon: faChartArea, 
      color: "#14B8A6", // Turquesa
      label: "Lotificación" 
    },
    { 
      path: "/modeloapartamento", 
      icon: faHome, 
      color: "#F97316", // Naranja cálido
      label: "Modelos Apartamento" 
    },
    { 
      path: "/modeloresidencial", 
      icon: faHouseUser, 
      color: "#0EA5E9", // Azul cielo
      label: "Modelos Residencia" 
    },
    { 
      path: "/recidencias", 
      icon: faBuilding, 
      color: "#A855F7", // Púrpura
      label: "Residencias" 
    },
    { 
      path: "/recidenciales", 
      icon: faCity, 
      color: "#84CC16", // Verde lima
      label: "Residenciales" 
    },
    { 
      path: "/sucursales", 
      icon: faStore, 
      color: "#EF4444", // Rojo coral
      label: "Sucursales" 
    }
  ];

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="dropdown-container">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="menu-button"
        aria-expanded={isOpen}
        aria-label="Menú desplegable"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li 
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="menu-item"
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  style={{ color: item.color, width: "16px", height: "16px" }} 
                />
                <span className="menu-text">{item.label}</span>
              </li>
            ))}
            <li 
              onClick={handleLogout}
              className="menu-item menu-item-red"
            >
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                style={{ color: "#F43F5E", width: "16px", height: "16px" }} // Rojo más moderno
              />
              <span className="menu-text">Cerrar sesión</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Estilos con CSS Modules o puedes usar styled-components para algo más profesional
const styles = `
  .dropdown-container {
    position: relative;
    display: inline-block;
  }

  .menu-button {
    padding: 10px;
    border-radius: 50%;
    background-color: #1a202c;
    color: #ffffff;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .menu-button:hover {
    background-color: #2d3748;
    transform: scale(1.05);
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    margin-top: 8px;
    width: 260px;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .menu-list {
    list-style: none;
    padding: 8px 0;
    margin: 0;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
  }

  .menu-item:hover {
    background-color: #f7fafc;
    border-left: 3px solid #805ad5;
    padding-left: 13px;
  }

  .menu-item-red:hover {
    border-left: 3px solid #F43F5E;
  }

  .menu-text {
    margin-left: 12px;
    font-size: 14px;
    color: #2d3748;
    font-weight: 500;
  }

  .menu-item-red {
    color: #F43F5E;
    margin-top: 4px;
    border-top: 1px solid #e2e8f0;
  }
`;

// Agregar estilos al documento
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default DropdownMenu;