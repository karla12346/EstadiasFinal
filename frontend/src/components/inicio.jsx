import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import backgroundImage from '../assets/welcome-bg.jpg';

const Inicio = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Estado de autenticación:", { user, loading });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
        <p>Cargando tu experiencia...</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="auth-container">
        <div className="auth-background">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>
        <div className="auth-card">
          <div className="auth-image-container">
            <img 
              src={backgroundImage} 
              alt="Fondo decorativo" 
              className="auth-image"
            />
            <div className="image-overlay"></div>
          </div>
          <div className="auth-content">
            <div className="auth-icon">👋</div>
            <h2>¡Bienvenido a <span className="highlight">Nuestra Plataforma</span>!</h2>
            <p>Descubre un mundo de posibilidades iniciando sesión en tu cuenta</p>
            <button
              className="auth-button"
              onClick={() => (window.location.href = "/login")}
            >
              <span>Iniciar sesión</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="auth-footer">
              <span className="line"></span>
              <span>¿Primera vez aquí?</span>
              <span className="line"></span>
            </div>
            <button className="auth-secondary-button">
              Crear una cuenta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Barra de navegación */}
      <nav className="app-navbar">
        <div className="navbar-brand">
          <span className="logo-part-1">Mi</span>
          <span className="logo-part-2">App</span>
        </div>
        <DropdownMenu />
      </nav>

      {/* Contenido principal */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="welcome-section">
            <span className="welcome-badge">¡Nuevo!</span>
            <h1>Hola, <span className="rainbow-text">{user?.name || "Usuario"}</span></h1>
            <p className="hero-subtitle">Tu experiencia premium está lista</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card card-1">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Velocidad</h3>
              <p>Navegación ultrarrápida</p>
              <div className="feature-decoration"></div>
            </div>
            
            <div className="feature-card card-2">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Seguridad</h3>
              <p>Protección avanzada</p>
              <div className="feature-decoration"></div>
            </div>
            
            <div className="feature-card card-3">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Contenido</h3>
              <p>Actualizaciones diarias</p>
              <div className="feature-decoration"></div>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src={backgroundImage} 
              alt="Ilustración de bienvenida" 
              className="hero-image"
            />
            <div className="image-shine"></div>
          </div>
          <div className="floating-elements">
            <div className="floating-element el-1"></div>
            <div className="floating-element el-2"></div>
            <div className="floating-element el-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Estilos CSS */
const styles = `
/* Estilos base */
:root {
  --color-primary: #6c5ce7;
  --color-secondary: #a29bfe;
  --color-accent: #fd79a8;
  --color-success: #00b894;
  --color-warning: #fdcb6e;
  --color-danger: #d63031;
  --color-dark: #2d3436;
  --color-light: #f5f6fa;
  --color-text: #2d3436;
  --color-text-light: #636e72;
  --gradient-primary: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  --gradient-accent: linear-gradient(135deg, #fd79a8 0%, #fab1a0 100%);
  --gradient-warning: linear-gradient(135deg, #fdcb6e 0%, #ffeaa7 100%);
  --gradient-success: linear-gradient(135deg, #00b894 0%, #55efc4 100%);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.2);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body {
  margin: 0;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--color-text);
  background-color: var(--color-light);
}

/* Loader */
.loading-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
}

.spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.spinner-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 6px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.loading-container p {
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin-bottom: 16px;
}

.loading-dots {
  display: flex;
  gap: 8px;
}

.loading-dots span {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  opacity: 0.6;
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}
.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Auth */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  z-index: 0;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  animation: float 15s infinite ease-in-out;
}

.bubble-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  left: -50px;
  animation-delay: 0s;
}

.bubble-2 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  right: -100px;
  animation-delay: 2s;
}

.bubble-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  right: 20%;
  animation-delay: 4s;
}

.auth-card {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  z-index: 1;
  transition: var(--transition);
}

.auth-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px -12px rgba(108, 92, 231, 0.3);
}

.auth-image-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(108, 92, 231, 0.7), transparent);
}

.auth-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.auth-card:hover .auth-image {
  transform: scale(1.1);
}

.auth-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.auth-icon {
  font-size: 48px;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

.auth-card h2 {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 16px;
  line-height: 1.3;
}

.highlight {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.auth-card p {
  font-size: 16px;
  color: var(--color-text-light);
  margin-bottom: 32px;
  max-width: 400px;
}

.auth-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.auth-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.auth-button:hover svg {
  transform: translateX(5px);
}

.auth-button svg {
  transition: var(--transition);
}

.auth-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
}

.auth-footer .line {
  flex: 1;
  height: 1px;
  background: rgba(0,0,0,0.1);
}

.auth-footer span {
  font-size: 14px;
  color: var(--color-text-light);
}

.auth-secondary-button {
  background: white;
  color: var(--color-primary);
  font-weight: 600;
  padding: 14px 32px;
  border: 2px solid var(--color-secondary);
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: var(--transition);
  width: 100%;
  max-width: 300px;
}

.auth-secondary-button:hover {
  background: rgba(108, 92, 231, 0.05);
  transform: translateY(-2px);
}

/* App Container */
.app-container {
  min-height: 100vh;
  background: var(--color-light);
}

.app-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: white;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  font-size: 24px;
  font-weight: 700;
}

.logo-part-1 {
  color: var(--color-primary);
}

.logo-part-2 {
  color: var(--color-accent);
}

/* Hero Section */
.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.hero-content {
  flex: 1;
}

.welcome-section {
  margin-bottom: 40px;
}

.welcome-badge {
  display: inline-block;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: var(--gradient-accent);
  border-radius: 20px;
  margin-bottom: 16px;
}

.hero-content h1 {
  font-size: 56px;
  font-weight: 800;
  color: var(--color-dark);
  margin-bottom: 16px;
  line-height: 1.2;
}

.rainbow-text {
  background: linear-gradient(90deg, 
    #6c5ce7, #a29bfe, #fd79a8, #fdcb6e, #00b894, #6c5ce7);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbow 8s ease infinite;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--color-text-light);
  margin-bottom: 40px;
  max-width: 500px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-card {
  position: relative;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  overflow: hidden;
  z-index: 1;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
}

.feature-icon svg {
  width: 28px;
  height: 28px;
}

.card-1 .feature-icon {
  background: var(--gradient-primary);
}
.card-2 .feature-icon {
  background: var(--gradient-success);
}
.card-3 .feature-icon {
  background: var(--gradient-accent);
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 16px;
  color: var(--color-text-light);
  line-height: 1.5;
}

.feature-decoration {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(108, 92, 231, 0.05);
  z-index: -1;
}

.card-1 .feature-decoration {
  top: -30px;
  right: -30px;
}
.card-2 .feature-decoration {
  bottom: -30px;
  left: -30px;
}
.card-3 .feature-decoration {
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
}

.hero-image-container {
  flex: 1;
  position: relative;
}

.hero-image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.hero-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.image-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
}

.hero-image-wrapper:hover .hero-image {
  transform: scale(1.05);
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  animation: float 10s infinite ease-in-out;
}

.el-1 {
  width: 80px;
  height: 80px;
  background: var(--color-accent);
  opacity: 0.2;
  top: 20%;
  left: -20px;
  animation-delay: 0s;
}
.el-2 {
  width: 120px;
  height: 120px;
  background: var(--color-success);
  opacity: 0.15;
  bottom: -30px;
  right: -30px;
  animation-delay: 2s;
}
.el-3 {
  width: 60px;
  height: 60px;
  background: var(--color-warning);
  opacity: 0.2;
  top: 60%;
  right: 10%;
  animation-delay: 4s;
}

/* Animaciones */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Media Queries */
@media (min-width: 1024px) {
  .hero-container {
    flex-direction: row;
    align-items: center;
    padding: 100px 60px;
    gap: 80px;
  }
  
  .auth-card {
    flex-direction: row;
    height: 500px;
  }
  
  .auth-image-container {
    width: 50%;
    height: auto;
  }
  
  .auth-content {
    width: 50%;
    padding: 60px;
  }
  
  .hero-content h1 {
    font-size: 64px;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 40px;
  }
  
  .auth-card h2 {
    font-size: 28px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
`;

// Añadir estilos al documento
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Inicio;