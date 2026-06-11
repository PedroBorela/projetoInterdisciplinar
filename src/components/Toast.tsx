import { useEffect } from 'react';

interface ToastProps {
  mensagem: string;
  tipo: 'sucesso' | 'erro';
  visivel: boolean;
  onFechar: () => void;
  duracao?: number;
}

export function Toast({ mensagem, tipo, visivel, onFechar, duracao = 3000 }: ToastProps) {
  useEffect(() => {
    if (!visivel) return;
    const t = setTimeout(onFechar, duracao);
    return () => clearTimeout(t);
  }, [visivel, duracao, onFechar]);

  if (!visivel) return null;

  const sucesso = tipo === 'sucesso';

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all animate-fade-up
        ${sucesso
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
        }`}
    >
      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
        {sucesso ? 'check_circle' : 'error'}
      </span>
      {mensagem}
      <button onClick={onFechar} className="ml-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
}
