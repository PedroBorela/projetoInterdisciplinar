interface EmptyStateProps {
  icone: string;
  titulo: string;
  descricao: string;
  acao?: { label: string; onClick: () => void };
}

export function EmptyState({ icone, titulo, descricao, acao }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-3xl text-on-surface-variant">{icone}</span>
      </div>
      <h3 className="font-headline font-bold text-lg text-on-surface mb-2">{titulo}</h3>
      <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed mb-6">{descricao}</p>
      {acao && (
        <button
          onClick={acao.onClick}
          className="px-5 py-2.5 primary-gradient text-on-primary font-bold rounded-xl text-sm"
        >
          {acao.label}
        </button>
      )}
    </div>
  );
}
