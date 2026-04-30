import { Link, useNavigate } from 'react-router-dom';
import DarkVeil from '../components/DarkVeil';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[--color-surface] p-4 overflow-hidden">

      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <DarkVeil hueShift={-40} speed={0.2} noiseIntensity={0.05} scanlineIntensity={0.1} />
      </div>

      {/* Background blobs */}
      <div className="absolute -top-[10%] -left-[5%] w-[35vw] h-[35vw] rounded-full bg-[--color-primary]/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[2%] w-[25vw] h-[25vw] rounded-full bg-[--color-secondary-container]/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 w-full max-w-4xl bg-white rounded-2xl shadow-[0_12px_48px_rgba(72,0,178,0.10)] overflow-hidden" style={{ maxHeight: 'calc(100vh - 2rem)' }}>

        {/* Painel esquerdo */}
        <div className="hidden md:flex md:col-span-5 relative flex-col justify-between p-8 overflow-hidden bg-[--color-primary]">
          <div className="absolute inset-0 opacity-20">
            <img
              alt="Modern workspace"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3gY35j6V-UXSJ3YWtvtV5_1tMM11qgCdBMeWEj8KjnNSRULlnh0xp_xWdcqDnON3JRYnfsMYtrSE9pkJ6LQOxcf1tCDEOdBpKCGrkvk1TNXND1QdmbkX-T5Z3qK4qk0G7NQd96fXwdM_ot7OHL-RVKKa6G3gaFWuT1O967qwfJVCbt_nTOllMbrb9nOZP3k60z-FVibqHpFgo2iCjJa_bVvmytJYNk4ue4J7EFVDDLKT7dPov2Py9_WXolKefy_UHuHJQ8JeTfaI"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary] via-[--color-primary]/80 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 editorial-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">LisoControl</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white leading-[1.15] mb-4 tracking-tight">
              Gerencie sua<br />riqueza <span className="text-[--color-secondary-fixed]">acadêmica.</span>
            </h1>
            <p className="text-[--color-primary-fixed] text-base font-medium leading-relaxed max-w-xs opacity-90">
              Um assistente financeiro de elite projetado para o estilo de vida do estudante moderno.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full border-2 border-[--color-primary] overflow-hidden bg-[--color-surface-container]">
                <img
                  alt="Student 1"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG3vEBBwwrCTzsPDf1X9tDYtjqicZ3JHkihvDf_laKiy7Iv5kZqpK4KnGMGLQxivUqgm9UbhmlroDE3zUBWxD1RgucX28RmAh1apToL7ej9IFK6cDtdWSd8HhbThJLoUYXFxWmrkOUqU0iMrnSkse2kFRwqEyKoQo9hOK_2hoCBOmtl2q2_xupfULgsm5Za5GnLahuGpgAzW0b9tM5hj01SjPcMZuOl01tzxAXRZx5rrX1M7ido20Bitdl-GAITjphwUdAYiZvwAU"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[--color-primary] overflow-hidden bg-[--color-surface-container]">
                <img
                  alt="Student 2"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQyu3nccX9w-lnGp8HAJvUC_w2dpaCAZ62__fuqu-CkV7gmMKWUgLtF0hgGke2J1U6RyfSxEJDnyoOczJ5OuTVwPly0SQkXPywbMSNl3b0BrSVu0_yF8PoCkADMmWdlCiixFcNaJQmuLNjxqNNMUUYO5l88fwMTZx3UejUwip6WH_5AlRSXueedrJqZR1n4ZJLN1kahEfluwYCX_C3-2PX4qTuZgBCDJqXf7AgGOzaaF8Nn3Q_wouE37z1IlJ3LKWw1GRJ-Wg04Lo"
                />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[--color-primary] flex items-center justify-center bg-[--color-primary-container] text-[10px] text-white font-bold">
                +2k
              </div>
            </div>
            <p className="mt-3 text-[--color-primary-fixed]/80 text-xs font-medium">Junte-se a mais de 2.000 estudantes cuidando do futuro.</p>
          </div>
        </div>

        {/* Painel direito */}
        <div className="md:col-span-7 p-7 md:p-10 flex flex-col justify-center">

          {/* Logo mobile */}
          <div className="md:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 editorial-gradient rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-[--color-primary]">LisoControl</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[--color-on-surface] mb-1">Bem-vindo de volta</h2>
            <p className="text-[--color-on-surface-variant] text-sm font-medium">Continue sua jornada para o domínio financeiro.</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--color-on-surface-variant] ml-1 uppercase tracking-wider" htmlFor="email">
                Endereço de E-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[--color-outline] group-focus-within:text-[--color-primary] transition-colors">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-[--color-surface-container-low] border-0 rounded-xl text-[--color-on-surface] placeholder:text-[--color-outline]/60 focus:ring-2 focus:ring-[--color-primary] focus:bg-white transition-all text-sm"
                  id="email"
                  name="email"
                  placeholder="estudante@universidade.edu"
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-[--color-on-surface-variant] uppercase tracking-wider" htmlFor="password">
                  Senha
                </label>
                <a className="text-xs font-bold text-[--color-primary] hover:text-[--color-primary-container] transition-colors" href="#">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[--color-outline] group-focus-within:text-[--color-primary] transition-colors">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <input
                  className="block w-full pl-10 pr-10 py-3 bg-[--color-surface-container-low] border-0 rounded-xl text-[--color-on-surface] placeholder:text-[--color-outline]/60 focus:ring-2 focus:ring-[--color-primary] focus:bg-white transition-all text-sm"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-[--color-outline] hover:text-[--color-on-surface] transition-colors">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                </div>
              </div>
            </div>

            {/* Remember device */}
            <div className="flex items-center space-x-2.5">
              <input
                className="w-4 h-4 rounded border-[--color-outline-variant] text-[--color-primary] focus:ring-[--color-primary] bg-[--color-surface-container-low] transition-all"
                id="remember"
                type="checkbox"
              />
              <label className="text-sm font-medium text-[--color-on-surface-variant] select-none" htmlFor="remember">
                Lembrar deste dispositivo
              </label>
            </div>

            {/* Botão de login */}
            <button
              className="w-full editorial-gradient py-3.5 rounded-xl text-white font-bold text-base shadow-[0_8px_24px_rgba(72,0,178,0.25)] hover:shadow-[0_12px_32px_rgba(72,0,178,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              type="submit"
            >
              Entrar
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          {/* Social auth */}
          <div className="mt-5 flex flex-col items-center space-y-4">
            <div className="flex items-center w-full gap-3">
              <div className="h-[1px] flex-grow bg-[--color-outline-variant]/40" />
              <span className="text-[10px] font-bold text-[--color-outline] uppercase tracking-widest">Ou continue com</span>
              <div className="h-[1px] flex-grow bg-[--color-outline-variant]/40" />
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={handleLogin}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-[--color-surface-container-low] hover:bg-[--color-surface-container-high] rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-bold text-[--color-on-surface]">Google</span>
              </button>
              <button
                onClick={handleLogin}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-[--color-surface-container-low] hover:bg-[--color-surface-container-high] rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-[--color-on-surface]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-bold text-[--color-on-surface]">GitHub</span>
              </button>
            </div>

            <div className="flex items-center justify-between w-full pt-1">
              <p className="text-sm font-medium text-[--color-on-surface-variant]">
                Novo por aqui?{' '}
                <Link className="text-[--color-primary] font-bold hover:underline underline-offset-4 decoration-2 transition-all cursor-pointer" to="/cadastro">
                  Criar conta
                </Link>
              </p>
              <div className="flex gap-4">
                <a className="text-[10px] font-bold text-[--color-outline] uppercase tracking-wider hover:text-[--color-primary] transition-colors" href="#">Privacidade</a>
                <a className="text-[10px] font-bold text-[--color-outline] uppercase tracking-wider hover:text-[--color-primary] transition-colors" href="#">Termos</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
