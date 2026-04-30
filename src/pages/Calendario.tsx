import React from 'react';
import { Link } from 'react-router-dom';

export function Calendario() {
  return (
    <>


<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
<div className="text-xl font-extrabold tracking-tight text-violet-800 dark:text-violet-300">LisoControl</div>
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full cursor-pointer">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full cursor-pointer">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>
<main className="pt-24 px-6 max-w-4xl mx-auto">

<div className="mb-10">
<h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Insights</h1>
<p className="text-on-surface-variant font-medium">Organizando sua linha do tempo financeira, um registro por vez.</p>
</div>

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
<div className="flex bg-surface-container-low p-1.5 rounded-2xl">
<button className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all bg-surface-container-lowest shadow-sm text-primary cursor-pointer">Mensal</button>
<button className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all text-on-surface-variant hover:text-primary cursor-pointer">Semanal</button>
</div>
<div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-2xl">
<button className="text-primary hover:opacity-70 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<span className="font-headline text-lg font-bold min-w-[140px] text-center">Outubro 2023</span>
<button className="text-primary hover:opacity-70 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-[24px] p-8 shadow-sm">
<div className="grid grid-cols-7 gap-y-8 text-center">

<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Seg</div>
<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Ter</div>
<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Qua</div>
<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Qui</div>
<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Sex</div>
<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Sáb</div>
<div className="text-label-sm font-bold text-outline opacity-50 uppercase tracking-widest pb-4">Dom</div>
<div className="flex flex-col items-center justify-center p-2 opacity-30 text-sm font-medium">25</div>
<div className="flex flex-col items-center justify-center p-2 opacity-30 text-sm font-medium">26</div>
<div className="flex flex-col items-center justify-center p-2 opacity-30 text-sm font-medium">27</div>
<div className="flex flex-col items-center justify-center p-2 opacity-30 text-sm font-medium">28</div>
<div className="flex flex-col items-center justify-center p-2 opacity-30 text-sm font-medium">29</div>
<div className="flex flex-col items-center justify-center p-2 opacity-30 text-sm font-medium">30</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                        1 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-secondary-fixed-dim"></span></div>
</div>

<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                        2 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-tertiary-fixed-dim"></span></div>
</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                        3 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-tertiary-fixed-dim"></span></div>
</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                        4 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-secondary-fixed-dim"></span><span className="w-1 h-1 rounded-full bg-tertiary-fixed-dim"></span></div>
</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                        5 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-tertiary-fixed-dim"></span></div>
</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                        6 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-secondary-fixed-dim"></span></div>
</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">7</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">8</div>

<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">9</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">10</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">11</div>
<div className="relative flex flex-col items-center justify-center p-2 bg-primary text-on-primary rounded-xl ring-4 ring-primary-fixed ring-opacity-50 text-sm font-bold">
                        12 <div className="absolute -bottom-1 flex gap-1"><span className="w-1 h-1 rounded-full bg-secondary-fixed"></span><span className="w-1 h-1 rounded-full bg-white"></span></div>
</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">13</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">14</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">15</div>

<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">16</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">17</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">18</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">19</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">20</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">21</div>
<div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">22</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-6">

<div className="bg-primary bg-gradient-to-br from-primary to-primary-container rounded-[24px] p-8 text-on-primary shadow-lg">
<p className="font-headline text-sm font-semibold opacity-80 mb-1">Quinta-feira</p>
<h3 className="font-headline text-3xl font-bold mb-6 tracking-tight">12 de Outubro</h3>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-xs font-semibold uppercase tracking-wider opacity-70">Ganhos</span>
<span className="font-headline text-xl font-bold">+ R$ 1.240,00</span>
</div>
<div className="h-[2px] bg-white/10"></div>
<div className="flex justify-between items-center">
<span className="text-xs font-semibold uppercase tracking-wider opacity-70">Gastos</span>
<span className="font-headline text-xl font-bold">- R$ 342,12</span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-[24px] p-6">
<p className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Saúde Diária</p>
<div className="w-full h-6 bg-surface-container-high rounded-full overflow-hidden flex">
<div className="h-full bg-secondary-fixed-dim" style={{ width: '75%' }}></div>
<div className="h-full bg-tertiary-fixed-dim" style={{ width: '25%' }}></div>
</div>
<div className="flex justify-between mt-3">
<span className="text-[10px] font-bold text-secondary">SOBRA</span>
<span className="text-[10px] font-bold text-tertiary">GASTO</span>
</div>
</div>
</div>
</div>

<section className="mt-12 mb-20">
<div className="flex items-center justify-between mb-6">
<h2 className="font-headline text-2xl font-bold text-on-surface">Registros de 12 de Outubro</h2>
<Link to="/nova-transacao" className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer">
<span className="material-symbols-outlined text-lg" data-icon="add_circle">add_circle</span>
                    Adicionar Registro
                </Link>
</div>
<div className="space-y-4">

<div className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer">
<div className="flex items-center gap-5">
<div className="w-14 h-14 rounded-2xl bg-secondary-fixed/20 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl" data-icon="payments">payments</span>
</div>
<div>
<h4 className="font-inter font-bold text-on-surface">Pagamento Freelance</h4>
<p className="text-sm font-medium text-on-surface-variant">Cliente: Studio Fluid</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-bold text-lg text-secondary">+ R$ 1.240,00</p>
<p className="text-[10px] font-bold text-outline uppercase tracking-widest">09:12 AM</p>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer">
<div className="flex items-center gap-5">
<div className="w-14 h-14 rounded-2xl bg-tertiary-fixed/20 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-3xl" data-icon="restaurant">restaurant</span>
</div>
<div>
<h4 className="font-inter font-bold text-on-surface">Almoço Cozinha Orgânica</h4>
<p className="text-sm font-medium text-on-surface-variant">Alimentação &amp; Jantar</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-bold text-lg text-tertiary">- R$ 42,12</p>
<p className="text-[10px] font-bold text-outline uppercase tracking-widest">01:45 PM</p>
</div>
</div>

<div className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-[24px] hover:bg-surface-container-low transition-all cursor-pointer">
<div className="flex items-center gap-5">
<div className="w-14 h-14 rounded-2xl bg-tertiary-fixed/20 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-3xl" data-icon="shopping_cart">shopping_cart</span>
</div>
<div>
<h4 className="font-inter font-bold text-on-surface">Papelaria Premium</h4>
<p className="text-sm font-medium text-on-surface-variant">Materiais Acadêmicos</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-bold text-lg text-tertiary">- R$ 300,00</p>
<p className="text-[10px] font-bold text-outline uppercase tracking-widest">04:30 PM</p>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl z-50 rounded-t-[24px] shadow-[0_-12px_32px_rgba(72,0,178,0.06)]">
<Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2.5 hover:text-violet-500 transition-all cursor-pointer" to="/dashboard">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-inter text-[10px] font-semibold tracking-wide uppercase mt-1">Início</span>
</Link>
<Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2.5 hover:text-violet-500 transition-all cursor-pointer" to="/transacoes">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span className="font-inter text-[10px] font-semibold tracking-wide uppercase mt-1">Atividade</span>
</Link>
<Link className="flex flex-col items-center justify-center bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 rounded-2xl px-5 py-2.5 scale-90 duration-150 cursor-pointer" to="/calendario">
<span className="material-symbols-outlined" data-icon="calendar_today" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
<span className="font-inter text-[10px] font-semibold tracking-wide uppercase mt-1">Calendário</span>
</Link>
<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2.5 hover:text-violet-500 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-inter text-[10px] font-semibold tracking-wide uppercase mt-1">Análise</span>
</a>
<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2.5 hover:text-violet-500 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
<span className="font-inter text-[10px] font-semibold tracking-wide uppercase mt-1">Mais</span>
</a>
</nav>

    </>
  );
}
