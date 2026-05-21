interface ConfirmDialogProps {
  titulo?: string;
  mensagem: string;
  labelConfirmar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmDialog({
  titulo = 'Confirmar exclusão',
  mensagem,
  labelConfirmar = 'Excluir',
  onConfirmar,
  onCancelar,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancelar} />
      <div className="relative bg-surface-container-lowest rounded-2xl p-6 w-full max-w-sm editorial-shadow">
        <div className="w-12 h-12 bg-error-container rounded-xl flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-error text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
        </div>
        <h3 className="font-headline font-bold text-lg text-on-surface mb-2">{titulo}</h3>
        <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{mensagem}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="flex-1 py-3 rounded-xl bg-error text-on-error font-bold text-sm"
          >
            {labelConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
