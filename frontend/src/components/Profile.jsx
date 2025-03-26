import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import DropdownMenu from "./DropdownMenu"; // Importa el menú desplegable

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Error al obtener perfil", error);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <div className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">Mi Aplicación</h1>
        <DropdownMenu />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil</h2>
        {profile ? (
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Nombre:</span> {profile.name}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;