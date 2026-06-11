import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./stores/useAuthStore";
import { useConfigStore } from "./stores/useConfigStore";
import { useCategoriasStore } from "./stores/useCategoriasStore";
import { useTransacoesStore } from "./stores/useTransacoesStore";
import { useCartoesStore } from "./stores/useCartoesStore";
import { useLimitesStore } from "./stores/useLimitesStore";
import { useOcorrenciasStore } from "./stores/useOcorrenciasStore";
import { useParcelamentosStore } from "./stores/useParcelamentosStore";

function App() {
  const inicializar = useAuthStore((s) => s.inicializar);
  const usuario = useAuthStore((s) => s.usuario);
  const darkMode = useConfigStore((s) => s.darkMode);
  const carregarConfig = useConfigStore((s) => s.carregar);
  const carregarCategorias = useCategoriasStore((s) => s.carregar);
  const carregarTransacoes = useTransacoesStore((s) => s.carregar);
  const carregarCartoes = useCartoesStore((s) => s.carregar);
  const carregarLimites = useLimitesStore((s) => s.carregar);
  const carregarOcorrencias = useOcorrenciasStore((s) => s.carregar);
  const carregarParcelamentos = useParcelamentosStore((s) => s.carregar);

  useEffect(() => {
    const cleanup = inicializar();
    return () => {
      cleanup.then((unsub) => unsub?.());
    };
  }, [inicializar]);

  useEffect(() => {
    if (usuario) {
      carregarConfig();
      carregarCategorias();
      carregarTransacoes();
      carregarCartoes();
      carregarLimites();
      carregarOcorrencias();
      carregarParcelamentos();
    }
  }, [usuario, carregarConfig, carregarCategorias, carregarTransacoes, carregarCartoes, carregarLimites, carregarOcorrencias, carregarParcelamentos]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transacoes" element={<ProtectedRoute><Transacoes /></ProtectedRoute>} />
        <Route path="/nova-transacao" element={<ProtectedRoute><NovaTransacao /></ProtectedRoute>} />
        <Route path="/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
        <Route path="/calendario" element={<ProtectedRoute><Calendario /></ProtectedRoute>} />
        <Route path="/ocorrencias-fixas" element={<ProtectedRoute><OcorrenciasFixas /></ProtectedRoute>} />
        <Route path="/parcelamentos" element={<ProtectedRoute><Parcelamentos /></ProtectedRoute>} />
        <Route path="/limites-gastos" element={<ProtectedRoute><LimitesDeGastos /></ProtectedRoute>} />
        <Route path="/cartoes" element={<ProtectedRoute><CartoesDeCredito /></ProtectedRoute>} />
        <Route path="/fatura" element={<ProtectedRoute><DetalhesDaFatura /></ProtectedRoute>} />
        <Route path="/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
