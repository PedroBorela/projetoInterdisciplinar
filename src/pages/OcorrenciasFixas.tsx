import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function OcorrenciasFixas() {
  return (
    <>

<TopNavBar />
<main className="pt-24 px-6 max-w-4xl mx-auto">
{/*  Hero Section / Editorial Header  */}
<section className="mb-12">
<h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary mb-2">Recurring Expenses</h1>
<p className="font-body text-on-surface-variant text-md max-w-lg">Manage your fixed monthly commitments in one editorial ledger. Precision planning for the fluid student lifestyle.</p>
</section>
{/*  Financial Health Indicator (Soft Minimalism)  */}
<div className="bg-surface-container-low rounded-xl p-8 mb-8">
<div className="flex justify-between items-end mb-4">
<div>
<span className="font-label text-xs uppercase tracking-widest text-outline">Monthly Fixed Total</span>
<div className="font-headline text-3xl font-bold mt-1">$1,420.00</div>
</div>
<div className="text-right">
<span className="font-label text-xs uppercase tracking-widest text-outline">Available Balance</span>
<div className="font-headline text-xl font-bold text-secondary mt-1">$3,842.50</div>
</div>
</div>
<div className="w-full h-6 bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="h-full bg-primary" style={{ width: '37%' }}></div>
<div className="h-full bg-secondary-fixed" style={{ width: '15%' }}></div>
</div>
<div className="flex gap-6 mt-4">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">Housing &amp; Utils</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-secondary-fixed"></div>
<span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">Subscriptions</span>
</div>
</div>
</div>
{/*  Action Header  */}
<div className="flex justify-between items-center mb-6">
<h2 className="font-headline text-xl font-bold">Ledger Items</h2>
<button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 active:scale-95 transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                Add Occurrence
            </button>
</div>
{/*  The Ledger (List of Expenses)  */}
<div className="space-y-4">
{/*  Item 1  */}
<div className="group bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="home">home</span>
</div>
<div>
<div className="font-headline font-bold text-lg">Student Housing Rent</div>
<div className="flex gap-3 items-center mt-1">
<span className="font-label text-[10px] px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-bold uppercase tracking-tighter">Housing</span>
<span className="font-label text-[10px] text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="calendar_month">calendar_month</span>
                                Day 01
                            </span>
</div>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right">
<div className="font-headline font-bold text-lg text-on-surface">$950.00</div>
<div className="font-label text-[10px] text-outline uppercase tracking-widest">Monthly</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button className="p-2 text-outline hover:text-error transition-colors">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
{/*  Item 2  */}
<div className="group bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-container" data-icon="fitness_center">fitness_center</span>
</div>
<div>
<div className="font-headline font-bold text-lg">Iron Paradise Gym</div>
<div className="flex gap-3 items-center mt-1">
<span className="font-label text-[10px] px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-bold uppercase tracking-tighter">Health</span>
<span className="font-label text-[10px] text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="calendar_month">calendar_month</span>
                                Day 15
                            </span>
</div>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right">
<div className="font-headline font-bold text-lg text-on-surface">$45.00</div>
<div className="font-label text-[10px] text-outline uppercase tracking-widest">Monthly</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button className="p-2 text-outline hover:text-error transition-colors">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
{/*  Item 3  */}
<div className="group bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary" data-icon="streaming_services">stream_apps</span>
</div>
<div>
<div className="font-headline font-bold text-lg">Scholar Stream Premium</div>
<div className="flex gap-3 items-center mt-1">
<span className="font-label text-[10px] px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-bold uppercase tracking-tighter">Entertainment</span>
<span className="font-label text-[10px] text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="calendar_month">calendar_month</span>
                                Day 22
                            </span>
</div>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right">
<div className="font-headline font-bold text-lg text-on-surface">$12.99</div>
<div className="font-label text-[10px] text-outline uppercase tracking-widest">Monthly</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button className="p-2 text-outline hover:text-error transition-colors">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
{/*  Item 4  */}
<div className="group bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="bolt">bolt</span>
</div>
<div>
<div className="font-headline font-bold text-lg">Electricity Bill</div>
<div className="flex gap-3 items-center mt-1">
<span className="font-label text-[10px] px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-bold uppercase tracking-tighter">Utilities</span>
<span className="font-label text-[10px] text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="calendar_month">calendar_month</span>
                                Day 08
                            </span>
</div>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-right">
<div className="font-headline font-bold text-lg text-on-surface">$68.40</div>
<div className="font-label text-[10px] text-outline uppercase tracking-widest">Monthly</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button className="p-2 text-outline hover:text-error transition-colors">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
</div>
{/*  Add/Edit Section (Bento Grid Style Form)  */}
<section className="mt-16 mb-24">
<h2 className="font-headline text-xl font-bold mb-6">Ledger Editor</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/*  Main Details Card  */}
<div className="md:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-outline-variant/15">
<div className="grid grid-cols-1 gap-6">
<div>
<label className="block font-label text-xs uppercase font-bold text-outline mb-2">Expense Description</label>
<input className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/30 rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all font-body text-sm" placeholder="e.g. Netflix Subscription" type="text"/>
</div>
<div className="grid grid-cols-2 gap-6">
<div>
<label className="block font-label text-xs uppercase font-bold text-outline mb-2">Value ($)</label>
<input className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/30 rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all font-body text-sm" placeholder="0.00" type="number"/>
</div>
<div>
<label className="block font-label text-xs uppercase font-bold text-outline mb-2">Category</label>
<select className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/30 rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all font-body text-sm appearance-none">
<option>Housing</option>
<option>Food</option>
<option>Transport</option>
<option>Entertainment</option>
<option>Health</option>
</select>
</div>
</div>
</div>
</div>
{/*  Side Settings Card  */}
<div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between">
<div>
<label className="block font-label text-xs uppercase font-bold text-primary mb-4">Scheduling</label>
<div className="space-y-4">
<div>
<label className="block font-label text-[10px] text-outline uppercase font-bold mb-1">Billing Day</label>
<input className="w-full bg-white border-0 ring-1 ring-outline-variant/30 rounded-lg p-3 focus:ring-2 focus:ring-primary transition-all font-body text-sm" max="31" min="1" placeholder="15" type="number"/>
</div>
<div className="flex items-center justify-between py-2">
<span className="font-body text-sm font-medium">Auto-Pay</span>
<div className="w-12 h-6 bg-primary rounded-full relative p-1 flex items-center justify-end">
<div className="w-4 h-4 bg-white rounded-full"></div>
</div>
</div>
</div>
</div>
<button className="mt-6 w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
                        Save Occurrence
                    </button>
</div>
</div>
</section>
</main>
<BottomNavBar />

    </>
  );
}
