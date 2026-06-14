import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';
import AddPetPage from './pages/AddPetPage';
import AdoptionDeclarationPage from './pages/AdoptionDeclarationPage';
import AdoptionFinishPage from './pages/AdoptionFinishPage';
import AdoptionFormPage from './pages/AdoptionFormPage';
import AdoptionReasonPage from './pages/AdoptionReasonPage';
import FaqPage from './pages/FaqPage';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import VolunteerFinishPage from './pages/VolunteerFinishPage';
import VolunteerFormPage from './pages/VolunteerFormPage';
import VolunteerIntroPage from './pages/VolunteerIntroPage';

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(
    () => localStorage.getItem('usuarioLogado') === 'true',
  );

  const handleLogin = () => {
    localStorage.setItem('usuarioLogado', 'true');
    setUsuarioLogado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuarioLogado(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            usuarioLogado ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={usuarioLogado}>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route element={<PublicLayout isLoggedIn={usuarioLogado} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/declaracao" element={<AdoptionDeclarationPage />} />
          <Route path="/adocao/dados" element={<AdoptionFormPage />} />
          <Route path="/adocao/motivo" element={<AdoptionReasonPage />} />
          <Route path="/adocao/finalizada" element={<AdoptionFinishPage />} />
          <Route path="/voluntariado" element={<VolunteerIntroPage />} />
          <Route path="/voluntariado/formulario" element={<VolunteerFormPage />} />
          <Route path="/voluntariado/finalizado" element={<VolunteerFinishPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/pets/novo" element={<AddPetPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
