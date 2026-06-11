import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const usuario = useAuthStore((s) => s.usuario);
  const loading = useAuthStore((s) => s.loading);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[--color-surface]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 editorial-gradient rounded-xl flex items-center justify-center text-white animate-pulse">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          </div>
          <p className="text-sm font-semibold text-[--color-on-surface-variant]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
