import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkVeil from '../components/DarkVeil';
import { useAuthStore } from '../stores/useAuthStore';

export function Login() {
  const navigate = useNavigate();
  const loginFn = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) { setErro('Preencha e-mail e senha.'); return; }
    setErro('');
    setCarregando(true);
    const resultado = await loginFn(email, senha);
    setCarregando(false);
    if (resultado.success) {
      navigate('/dashboard');
    } else {
      setErro(resultado.error ?? 'Erro ao entrar.');
    }
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
            <h1 className="text-3xl font-extrabold text-black leading-[1.15] mb-4 tracking-tight">
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
            <div className="w-8 h-8 editorial-gradient rounded-lg flex items-center justify-center text-black">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-black">LisoControl</span>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={carregando}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-[--color-on-surface-variant] uppercase tracking-wider" htmlFor="password">
                  Senha
                </label>
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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={carregando}
                />
              </div>
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-xl text-red-600 text-sm font-medium animate-fade-in">
                <span className="material-symbols-outlined text-base animate-icon-pop">error</span>
                {erro}
              </div>
            )}

            {/* Botão de login */}
            <button
              className="w-full editorial-gradient py-3.5 rounded-xl text-white font-bold text-base shadow-[0_8px_24px_rgba(72,0,178,0.25)] hover:shadow-[0_12px_32px_rgba(72,0,178,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={carregando}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
              {!carregando && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center space-y-4">
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
