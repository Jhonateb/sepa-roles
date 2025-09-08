import { useAuthStore } from './stores/authStore';
import { LoginPage } from './pages/LoginPage';
import { PrivateLayout } from './components/layouts/PrivateLayout';
import { ToursPage } from './pages/ToursPage';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Si el usuario está autenticado, muestra el layout privado
  // y dentro, la página de Tours.
  return (
    <PrivateLayout>
      <ToursPage />
    </PrivateLayout>
  );
}

export default App;