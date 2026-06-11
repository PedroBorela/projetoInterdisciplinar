interface ConfirmModalProps {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  labelConfirmar?: string;
  labelCancelar?: string;
  variante?: 'perigo' | 'primario';
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmModal({
  aberto,
  titulo,
  mensagem,
  labelConfirmar = 'Confirmar',
  labelCancelar = 'Cancelar',
  variante = 'primario',
  onConfirmar,
  onCancelar,
}: ConfirmModalProps) {
  if (!aberto) return null;

  const btnConfirmar =
    variante === 'perigo'
      ? 'bg-expense text-white hover:opacity-90'
      : 'primary-gradient text-on-primary hover:opacity-90';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      onClick={onCancelar}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-sm bg-surface-container-lowest rounded-3xl p-7 editorial-shadow flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-headline text-lg font-bold text-on-surface">{titulo}</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">{mensagem}</p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancelar}
            className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm hover:bg-surface-container-highest transition-colors"
          >
            {labelCancelar}
          </button>
          <button
            onClick={onConfirmar}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-opacity shadow-sm ${btnConfirmar}`}
          >
            {labelConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
