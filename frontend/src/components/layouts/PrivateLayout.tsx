import React from 'react';
import { useAuthStore } from '../../stores/authStore';

// Componente simple para la cabecera
const Header = () => {
  const { user, logout } = useAuthStore();
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Tour Agency</h1>
      <div className="flex items-center">
        <span className="mr-4">Hola, {user?.nombre}</span>
        <button
          onClick={logout}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

// Componente simple para la barra lateral
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          {/* Aquí irían los enlaces de navegación */}
          <li className="mb-2"><a href="#" className="hover:text-blue-300">Dashboard</a></li>
          <li className="mb-2"><a href="#" className="hover:text-blue-300">Tours</a></li>
        </ul>
      </nav>
    </aside>
  );
};

// El componente principal del Layout
export const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          {children} {/* Aquí se renderizará el contenido de la página actual */}
        </main>
      </div>
    </div>
  );
};