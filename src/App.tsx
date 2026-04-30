import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Dashboard } from "./pages/Dashboard";
import { Transacoes } from "./pages/Transacoes";
import { NovaTransacao } from "./pages/NovaTransacao";
import { Categorias } from "./pages/Categorias";
import { Calendario } from "./pages/Calendario";
import { OcorrenciasFixas } from "./pages/OcorrenciasFixas";
import { Parcelamentos } from "./pages/Parcelamentos";
import { LimitesDeGastos } from "./pages/LimitesDeGastos";
import { CartoesDeCredito } from "./pages/CartoesDeCredito";
import { DetalhesDaFatura } from "./pages/DetalhesDaFatura";
import { Relatorios } from "./pages/Relatorios";
import { Configuracoes } from "./pages/Configuracoes";

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
        <Route path="/ocorrencias-fixas" element={<OcorrenciasFixas />} />
        <Route path="/parcelamentos" element={<Parcelamentos />} />
        <Route path="/limites-gastos" element={<LimitesDeGastos />} />
        <Route path="/cartoes" element={<CartoesDeCredito />} />
        <Route path="/fatura" element={<DetalhesDaFatura />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
