import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function App() {
  // Se encontrar a sessão no localStorage, mostra o Dashboard. Caso contrário, mostra Login.
  const usuarioLogado = localStorage.getItem('usuarioLogado') === 'true';

  return (
    <div>
      {usuarioLogado ? <Dashboard /> : <Login />}
    </div>
  );
}