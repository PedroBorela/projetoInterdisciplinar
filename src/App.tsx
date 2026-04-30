import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Dashboard } from "./pages/Dashboard";
import { Transacoes } from "./pages/Transacoes";
import { NovaTransacao } from "./pages/NovaTransacao";
import { Categorias } from "./pages/Categorias";
import { Calendario } from "./pages/Calendario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/nova-transacao" element={<NovaTransacao />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
