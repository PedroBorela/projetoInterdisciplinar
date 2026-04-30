import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function LimitesDeGastos() {
  return (
    <>

<TopNavBar />
{/*  Main Content  */}
<main className="pt-24 px-6 max-w-2xl mx-auto">
<header className="mb-10">
<h1 className="text-2xl font-bold font-headline tracking-tight text-on-surface mb-2">Spending Limits</h1>
<p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                Curate your monthly budget by setting boundaries for each category. We'll alert you when you're nearing your limit.
            </p>
</header>
{/*  Overall Summary Bento Section  */}
<section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
<div className="md:col-span-12 bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_rgba(72,0,178,0.06)] flex flex-col justify-center">
<div className="flex justify-between items-end mb-4">
<div>
<span className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Monthly Ceiling</span>
<span className="text-3xl font-extrabold font-headline tracking-tighter text-primary">$2,450.00</span>
</div>
<div className="text-right">
<span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Spent So Far</span>
<span className="text-xl font-bold font-headline text-on-surface">$1,892.40</span>
</div>
</div>
<div className="h-6 w-full bg-surface-container rounded-full overflow-hidden flex">
<div className="h-full bg-primary" style={{ width: '77%' }}></div>
</div>
</div>
</section>
{/*  Categories List  */}
<section className="space-y-6">
<h2 className="text-lg font-bold font-headline flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">category</span>
                Category Breakdown
            </h2>
{/*  Food & Drinks - Near Limit (Warning State)  */}
<div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
<span className="material-symbols-outlined text-orange-600">restaurant</span>
</div>
<div>
<h3 className="font-bold text-base text-on-surface">Food &amp; Drinks</h3>
<p className="text-xs text-on-surface-variant">82% of limit reached</p>
</div>
</div>
<div className="text-right">
<label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Limit ($)</label>
<input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-primary focus:ring-2 focus:ring-primary text-right py-1 px-2" type="number" value="600"/>
</div>
</div>
<div className="flex justify-between text-xs font-bold mb-2 px-1">
<span className="text-on-surface">$492.00 spent</span>
<span className="text-orange-600">Warning: Low balance</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
{/*  80%+ Warning: Orange/Yellow  */}
<div className="h-full bg-orange-500 rounded-full" style={{ width: '82%' }}></div>
</div>
</div>
{/*  Academic Books - Under Limit (Normal State)  */}
<div className="bg-surface-container-lowest p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">menu_book</span>
</div>
<div>
<h3 className="font-bold text-base text-on-surface">Academic Material</h3>
<p className="text-xs text-on-surface-variant">25% of limit reached</p>
</div>
</div>
<div className="text-right">
<label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Limit ($)</label>
<input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-primary focus:ring-2 focus:ring-primary text-right py-1 px-2" type="number" value="300"/>
</div>
</div>
<div className="flex justify-between text-xs font-bold mb-2 px-1 text-on-surface">
<span>$75.00 spent</span>
<span className="text-secondary">$225.00 left</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary-fixed-dim rounded-full" style={{ width: '25%' }}></div>
</div>
</div>
{/*  Subscriptions & Software - Over Limit (Danger State)  */}
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-error transition-all duration-300 hover:scale-[1.01]">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-error">cloud_done</span>
</div>
<div>
<h3 className="font-bold text-base text-on-surface">Cloud &amp; Software</h3>
<p className="text-xs text-error font-semibold uppercase tracking-tight">Limit exceeded</p>
</div>
</div>
<div className="text-right">
<label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Limit ($)</label>
<input className="w-20 bg-error-container/40 border-none rounded-lg text-sm font-bold text-error focus:ring-2 focus:ring-error text-right py-1 px-2" type="number" value="120"/>
</div>
</div>
<div className="flex justify-between text-xs font-bold mb-2 px-1">
<span className="text-on-surface">$144.50 spent</span>
<span className="text-error">+$24.50 over</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
{/*  100%+ Danger: Red  */}
<div className="h-full bg-error rounded-full" style={{ width: '100%' }}></div>
</div>
</div>
{/*  Transportation - Near Limit  */}
<div className="bg-surface-container-lowest p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
<span className="material-symbols-outlined text-slate-600">directions_bus</span>
</div>
<div>
<h3 className="font-bold text-base text-on-surface">Commuting</h3>
<p className="text-xs text-on-surface-variant">54% of limit reached</p>
</div>
</div>
<div className="text-right">
<label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Limit ($)</label>
<input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-primary focus:ring-2 focus:ring-primary text-right py-1 px-2" type="number" value="200"/>
</div>
</div>
<div className="flex justify-between text-xs font-bold mb-2 px-1 text-on-surface">
<span>$108.00 spent</span>
<span>$92.00 left</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: '54%' }}></div>
</div>
</div>
{/*  Entertainment - Under Limit  */}
<div className="bg-surface-container-lowest p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">movie</span>
</div>
<div>
<h3 className="font-bold text-base text-on-surface">Entertainment</h3>
<p className="text-xs text-on-surface-variant">12% of limit reached</p>
</div>
</div>
<div className="text-right">
<label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Limit ($)</label>
<input className="w-20 bg-surface-container-low border-none rounded-lg text-sm font-bold text-primary focus:ring-2 focus:ring-primary text-right py-1 px-2" type="number" value="400"/>
</div>
</div>
<div className="flex justify-between text-xs font-bold mb-2 px-1 text-on-surface">
<span>$48.00 spent</span>
<span className="text-secondary">$352.00 left</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: '12%' }}></div>
</div>
</div>
</section>
{/*  Call to Action  */}
<div className="mt-12 mb-20 text-center">
<button className="gradient-btn text-white px-8 py-4 rounded-xl font-bold font-headline shadow-lg transition-transform active:scale-95">
                Save All Changes
            </button>
</div>
</main>
<BottomNavBar />

    </>
  );
}
