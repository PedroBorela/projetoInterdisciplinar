import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard',     icon: 'home',           label: 'Início'     },
  { to: '/transacoes',    icon: 'receipt_long',   label: 'Atividade'  },
  { to: '/calendario',    icon: 'calendar_today', label: 'Calendário' },
  { to: '/categorias',    icon: 'analytics',      label: 'Análise'    },
  { to: '/configuracoes', icon: 'menu',           label: 'Mais'       },
] as const;

export function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      {items.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {icon}
              </span>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
