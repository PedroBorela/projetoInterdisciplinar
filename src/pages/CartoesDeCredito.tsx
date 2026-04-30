import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function CartoesDeCredito() {
  return (
    <>

<TopNavBar />
<main className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
{/*  Header Section  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
<div>
<span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 block">Scholar Ledger</span>
<h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Your Virtual Vault</h1>
<p className="text-on-surface-variant mt-2 max-w-md">Manage your digital credit lines with editorial precision and fluid control.</p>
</div>
<button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold shadow-[0_12_32px_rgba(72,0,178,0.2)] active:scale-95 transition-all">
<span className="material-symbols-outlined" data-icon="add_card">add_card</span>
<span>Add New Card</span>
</button>
</div>
{/*  Cards Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/*  Card 1: Midnight Scholar  */}
<div className="group relative flex flex-col justify-between aspect-[1.58/1] p-8 rounded-2xl card-gradient-primary text-white overflow-hidden shadow-xl transform transition-transform hover:-rotate-1">
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
<div className="flex justify-between items-start relative z-10">
<div>
<h2 className="text-xl font-headline font-bold opacity-90 tracking-tight">Midnight Scholar</h2>
<p className="text-xs font-label uppercase tracking-widest opacity-60 mt-1">Virtual Line Platinum</p>
</div>
<span className="material-symbols-outlined text-4xl opacity-80" data-icon="contactless">contactless</span>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-center gap-4 mb-6">
<div className="h-10 w-12 rounded-lg bg-yellow-400/20 backdrop-blur-md flex items-center justify-center border border-yellow-400/30">
<div className="w-6 h-4 bg-yellow-400/40 rounded-sm"></div>
</div>
<p className="text-lg font-mono tracking-[0.2em]">•••• •••• •••• 8294</p>
</div>
<div className="flex justify-between items-end">
<div className="flex gap-8">
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-tighter opacity-50">Closing Date</span>
<span className="font-bold text-sm">Oct 12</span>
</div>
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-tighter opacity-50">Due Date</span>
<span className="font-bold text-sm">Oct 27</span>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 rounded-full card-glass hover:bg-white/30 transition-all">
<span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
</button>
<button className="p-2 rounded-full card-glass hover:bg-red-500/40 transition-all">
<span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
</div>
{/*  Card 2: Emerald Reserve  */}
<div className="group relative flex flex-col justify-between aspect-[1.58/1] p-8 rounded-2xl card-gradient-secondary text-white overflow-hidden shadow-xl transform transition-transform hover:rotate-1">
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
<div className="flex justify-between items-start relative z-10">
<div>
<h2 className="text-xl font-headline font-bold opacity-90 tracking-tight">Emerald Reserve</h2>
<p className="text-xs font-label uppercase tracking-widest opacity-60 mt-1">Cashback Virtual</p>
</div>
<span className="material-symbols-outlined text-4xl opacity-80" data-icon="token">token</span>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-center gap-4 mb-6">
<div className="h-10 w-12 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
<div className="w-6 h-4 bg-white/40 rounded-sm"></div>
</div>
<p className="text-lg font-mono tracking-[0.2em]">•��•• •••• •••• 4012</p>
</div>
<div className="flex justify-between items-end">
<div className="flex gap-8">
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-tighter opacity-50">Closing Date</span>
<span className="font-bold text-sm">Oct 18</span>
</div>
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-tighter opacity-50">Due Date</span>
<span className="font-bold text-sm">Nov 02</span>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 rounded-full card-glass hover:bg-white/30 transition-all">
<span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
</button>
<button className="p-2 rounded-full card-glass hover:bg-red-500/40 transition-all">
<span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
</div>
{/*  Card 3: Cloud Daily  */}
<div className="group relative flex flex-col justify-between aspect-[1.58/1] p-8 rounded-2xl bg-white text-on-surface overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-outline-variant/10 transform transition-transform hover:-translate-y-2">
<div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest to-surface-container opacity-50 pointer-events-none"></div>
<div className="flex justify-between items-start relative z-10">
<div>
<h2 className="text-xl font-headline font-bold text-on-surface tracking-tight">Cloud Daily</h2>
<p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mt-1">Basic Access</p>
</div>
<span className="material-symbols-outlined text-4xl text-primary/40" data-icon="cloud">cloud</span>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-center gap-4 mb-6">
<div className="h-10 w-12 rounded-lg bg-surface-container-high flex items-center justify-center">
<div className="w-6 h-4 bg-outline-variant rounded-sm"></div>
</div>
<p className="text-lg font-mono tracking-[0.2em] text-on-surface-variant">•••• •••• •••• 1109</p>
</div>
<div className="flex justify-between items-end">
<div className="flex gap-8">
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Closing Date</span>
<span className="font-bold text-sm">Oct 25</span>
</div>
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Due Date</span>
<span className="font-bold text-sm">Nov 10</span>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 rounded-full bg-surface-container hover:bg-surface-container-highest transition-all">
<span className="material-symbols-outlined text-sm text-on-surface" data-icon="edit">edit</span>
</button>
<button className="p-2 rounded-full bg-surface-container hover:bg-error-container hover:text-error transition-all">
<span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
</div>
{/*  Add New Placeholder  */}
<div className="flex flex-col items-center justify-center aspect-[1.58/1] p-8 rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low/50 hover:bg-surface-container-low transition-all cursor-pointer group">
<div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl text-primary" data-icon="add">add</span>
</div>
<p className="mt-4 font-headline font-bold text-on-surface-variant">Create another card</p>
</div>
</div>
{/*  Info Section (Bento style)  */}
<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="md:col-span-2 p-8 rounded-xl bg-surface-container-lowest shadow-sm">
<h3 className="font-headline font-bold text-xl mb-4">Total Spending Limit</h3>
<div className="flex items-end gap-2 mb-6">
<span className="text-4xl font-headline font-extrabold text-primary tracking-tighter">$14,500.00</span>
<span className="text-on-surface-variant pb-1 font-medium">/ month</span>
</div>
<div className="w-full h-4 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{ width: '65%' }}></div>
</div>
<div className="flex justify-between mt-3">
<span className="text-xs font-label text-on-surface-variant">$9,425.00 used</span>
<span className="text-xs font-label text-on-surface-variant">65% of total capacity</span>
</div>
</div>
<div className="p-8 rounded-xl bg-secondary-container/20 border border-secondary-container/30 flex flex-col justify-between">
<span className="material-symbols-outlined text-secondary text-3xl" data-icon="verified_user">verified_user</span>
<div>
<h4 className="font-headline font-bold text-secondary">Secure Lines</h4>
<p className="text-sm text-on-secondary-fixed-variant mt-2">All virtual cards are encrypted with 256-bit scholar security protocols.</p>
</div>
</div>
</div>
</main>
<BottomNavBar />

    </>
  );
}
