import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Error al obtener perfil", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.appTitle}>Panel de Usuario</h1>
          <DropdownMenu />
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.profileCard}>
          {/* Profile Header */}
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {profile?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 style={styles.profileTitle}>Mi Perfil</h2>
            <p style={styles.profileSubtitle}>Administra tu información personal</p>
          </div>

          {/* Profile Content */}
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Cargando tu información...</p>
            </div>
          ) : profile ? (
            <>
              <div style={styles.sectionHeader}>
                <div>
                  <h3 style={styles.sectionTitle}>Información Personal</h3>
                </div>
                <button style={styles.editButton}>
                  Editar Perfil
                </button>
              </div>

              <div style={styles.profileGrid}>
                <div style={styles.fieldContainer}>
                  <label style={styles.fieldLabel}>Nombre completo</label>
                  <div style={styles.fieldValue}>
                    <p style={styles.fieldText}>{profile.name}</p>
                  </div>
                </div>

                <div style={styles.fieldContainer}>
                  <label style={styles.fieldLabel}>Correo electrónico</label>
                  <div style={styles.fieldValue}>
                    <p style={styles.fieldText}>{profile.email}</p>
                  </div>
                </div>

                <div style={styles.fieldContainer}>
                  <label style={styles.fieldLabel}>Rol</label>
                  <div style={styles.fieldValue}>
                    <p style={styles.fieldText}>{profile.role || 'Usuario'}</p>
                  </div>
                </div>
              </div>

              <div style={styles.footerActions}>
                <button style={styles.secondaryButton}>
                  Cambiar contraseña
                </button>
              </div>
            </>
          ) : (
            <div style={styles.errorContainer}>
              <div style={styles.errorIcon}>
                <svg style={styles.errorSvg} viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 style={styles.errorTitle}>Error al cargar el perfil</h3>
              <p style={styles.errorMessage}>Por favor intenta nuevamente más tarde</p>
              <button 
                onClick={() => window.location.reload()}
                style={styles.retryButton}
              >
                Reintentar
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px'
  },
  profileCard: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },
  profileHeader: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    padding: '32px',
    textAlign: 'center',
    color: 'white'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  profileTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 4px 0'
  },
  profileSubtitle: {
    fontSize: '14px',
    opacity: 0.9,
    margin: 0
  },
  sectionHeader: {
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f1f5f9'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#6d28d9'
    }
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    padding: '24px'
  },
  fieldContainer: {
    marginBottom: '16px'
  },
  fieldLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
    marginBottom: '8px'
  },
  fieldValue: {
    backgroundColor: '#f8fafc',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0'
  },
  fieldText: {
    fontSize: '15px',
    color: '#1e293b',
    margin: 0
  },
  footerActions: {
    padding: '16px 24px',
    borderTop: '1px solid #f1f5f9',
    textAlign: 'right'
  },
  secondaryButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f8fafc',
      borderColor: '#cbd5e1'
    }
  },
  loadingContainer: {
    padding: '40px',
    textAlign: 'center'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(124, 58, 237, 0.1)',
    borderTopColor: '#7c3aed',
    borderRadius: '50%',
    margin: '0 auto 16px',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    fontSize: '14px',
    color: '#64748b'
  },
  errorContainer: {
    padding: '40px',
    textAlign: 'center'
  },
  errorIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#fee2e2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 16px'
  },
  errorSvg: {
    width: '24px',
    height: '24px',
    fill: 'none',
    stroke: '#dc2626',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
  errorTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 8px 0'
  },
  errorMessage: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 16px 0'
  },
  retryButton: {
    padding: '8px 16px',
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#6d28d9'
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

export default Profile;