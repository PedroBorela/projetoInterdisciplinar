import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkVeil from '../components/DarkVeil';
import { useAuthStore } from '../stores/useAuthStore';

export function Cadastro() {
  const navigate = useNavigate();
  const cadastrarFn = useAuthStore((s) => s.cadastrar);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !senha) { setErro('Preencha todos os campos.'); return; }
    if (senha.length < 6) { setErro('A senha precisa ter ao menos 6 caracteres.'); return; }
    if (senha !== confirmar) { setErro('As senhas não coincidem.'); return; }
    setErro('');
    setCarregando(true);
    const resultado = await cadastrarFn(nome, email, senha);
    setCarregando(false);
    if (resultado.success) {
      navigate('/dashboard');
    } else {
      setErro(resultado.error ?? 'Erro ao criar conta.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[--color-surface] p-4 md:p-6 overflow-y-auto relative">

      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <DarkVeil hueShift={-40} speed={0.2} noiseIntensity={0.05} scanlineIntensity={0.1} />
      </div>

      {/* Background blobs */}
      <div className="fixed -top-[10%] -left-[5%] w-[35vw] h-[35vw] rounded-full bg-[--color-primary]/20 blur-[80px] pointer-events-none" />
      <div className="fixed bottom-[5%] right-[2%] w-[25vw] h-[25vw] rounded-full bg-[--color-secondary-container]/30 blur-[100px] pointer-events-none" />

      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-12 w-full max-w-4xl bg-white rounded-2xl shadow-[0_12px_48px_rgba(72,0,178,0.10)] overflow-hidden md:max-h-[calc(100vh-2rem)]"
      >

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
              <span className="text-lg font-extrabold tracking-tight text-bla">LisoControl</span>
            </div>

            <h1 className="text-3xl font-extrabold text-black leading-[1.15] mb-4 tracking-tight">
              Cuide do seu<br />
              <span className="text-[--color-secondary-fixed]">futuro financeiro.</span>
            </h1>
            <p className="text-black text-sm font-medium leading-relaxed max-w-xs">
              Participe do livro-caixa digital projetado para o estudante moderno. Acompanhe, planeje e prospere com precisão editorial.
            </p>
          </div>

          {/* Card Smart Spending */}
          <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              </div>
              <div>
                <h3 className="font-bold text-black text-sm">Gastos Inteligentes</h3>
                <p className="text-[#000000] text-xs font-medium">Estudantes economizam 15% mais por mês.</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-black">
                <span>Meta de Economia</span>
                <span>85%</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[--color-secondary] rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
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

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[--color-on-surface] mb-1">Começar</h2>
            <p className="text-gray-700 text-sm font-medium">Bem-vindo ao círculo interno das finanças estudantis.</p>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[--color-on-surface] uppercase tracking-wider px-1" htmlFor="name">
                Nome
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[--color-on-surface-variant] group-focus-within:text-[--color-primary] transition-colors">
                  <span className="material-symbols-outlined text-lg">person</span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-2.5 bg-[#e8e8ea] border-0 rounded-xl text-[--color-on-surface] font-medium placeholder:text-gray-500 focus:ring-2 focus:ring-[--color-primary] focus:bg-white transition-all text-sm"
                  id="name"
                  placeholder="Nome Completo"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={carregando}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[--color-on-surface] uppercase tracking-wider px-1" htmlFor="email">
                E-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[--color-on-surface-variant] group-focus-within:text-[--color-primary] transition-colors">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-2.5 bg-[#e8e8ea] border-0 rounded-xl text-[--color-on-surface] font-medium placeholder:text-gray-500 focus:ring-2 focus:ring-[--color-primary] focus:bg-white transition-all text-sm"
                  id="email"
                  placeholder="estudante@universidade.edu"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={carregando}
                />
              </div>
            </div>

            {/* Senha e Confirmação lado a lado */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[--color-on-surface] uppercase tracking-wider px-1" htmlFor="password">
                  Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[--color-on-surface-variant] group-focus-within:text-[--color-primary] transition-colors">
                    <span className="material-symbols-outlined text-lg">lock</span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#e8e8ea] border-0 rounded-xl text-[--color-on-surface] font-bold placeholder:text-gray-500 focus:ring-2 focus:ring-[--color-primary] focus:bg-white transition-all text-sm"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={carregando}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[--color-on-surface] uppercase tracking-wider px-1" htmlFor="confirm">
                  Confirmar
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[--color-on-surface-variant] group-focus-within:text-[--color-primary] transition-colors">
                    <span className="material-symbols-outlined text-lg">verified_user</span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#e8e8ea] border-0 rounded-xl text-[--color-on-surface] font-bold placeholder:text-gray-500 focus:ring-2 focus:ring-[--color-primary] focus:bg-white transition-all text-sm"
                    id="confirm"
                    placeholder="••••••••"
                    type="password"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    disabled={carregando}
                  />
                </div>
              </div>
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-xl text-red-600 text-sm font-medium animate-fade-in">
                <span className="material-symbols-outlined text-base animate-icon-pop">error</span>
                {erro}
              </div>
            )}

            {/* Botão */}
            <button
              className="w-full editorial-gradient py-3.5 rounded-xl text-white font-bold text-base shadow-[0_8px_24px_rgba(72,0,178,0.25)] hover:shadow-[0_12px_32px_rgba(72,0,178,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={carregando}
            >
              {carregando ? 'Criando conta...' : 'Criar conta'}
              {!carregando && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </form>

          {/* Rodapé */}
          <div className="mt-5 pt-4 border-t border-[--color-outline-variant]/50 flex items-center justify-between">
            <p className="text-sm font-semibold text-[--color-on-surface]">
              Já tem uma conta?{' '}
              <Link className="text-[--color-primary] font-black hover:underline underline-offset-4 decoration-2 transition-all cursor-pointer" to="/login">
                Entrar
              </Link>
            </p>
            <div className="flex gap-4">
              <a className="text-xs font-bold text-gray-600 uppercase tracking-wider hover:text-[--color-primary] transition-colors" href="#">Privacidade</a>
              <a className="text-xs font-bold text-gray-600 uppercase tracking-wider hover:text-[--color-primary] transition-colors" href="#">Termos</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
