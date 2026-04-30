import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function DetalhesDaFatura() {
  return (
    <>

<TopNavBar />
<main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
{/*  Hero Section: Current Bill  */}
<section className="mb-10">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<p className="text-label-sm font-semibold text-primary uppercase tracking-widest mb-1">Current Statement</p>
<h1 className="font-headline text-[3.5rem] leading-none font-extrabold text-on-surface editorial-track">
                        $2,840.50
                    </h1>
</div>
<div className="flex gap-4">
<div className="bg-surface-container-low px-6 py-4 rounded-xl flex flex-col">
<span className="text-[10px] uppercase font-bold text-outline tracking-wider">Due Date</span>
<span className="font-headline font-bold text-on-surface">Oct 12, 2023</span>
</div>
<div className="bg-surface-container-low px-6 py-4 rounded-xl flex flex-col">
<span className="text-[10px] uppercase font-bold text-outline tracking-wider">Closing Date</span>
<span className="font-headline font-bold text-on-surface">Sep 28, 2023</span>
</div>
</div>
</div>
</section>
{/*  Bento Grid Insights  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
{/*  Health Indicator Card  */}
<div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden group">
<div className="relative z-10">
<h3 className="font-headline text-xl font-bold mb-6">Spending Health</h3>
<div className="flex items-center gap-4 mb-2">
<div className="h-6 flex-1 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-secondary-fixed w-[65%] rounded-full shadow-[0_0_15px_rgba(79,251,230,0.4)]"></div>
</div>
<span className="font-headline font-bold text-secondary">65% of limit</span>
</div>
<p className="text-body-md text-on-surface-variant max-w-sm">You've spent $450 less than your average monthly cycle. Great work!</p>
</div>
<div className="absolute -right-12 -bottom-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
<span className="material-symbols-outlined text-[12rem]">analytics</span>
</div>
</div>
{/*  Action Card  */}
<div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl flex flex-col justify-between text-on-primary">
<div>
<span className="material-symbols-outlined mb-4">payments</span>
<p className="font-headline text-lg font-bold">Clear Balance</p>
<p className="text-sm opacity-80 mt-1">Settle your full statement now to avoid interest.</p>
</div>
<button className="bg-white text-primary font-bold py-3 px-6 rounded-xl mt-6 hover:scale-[1.02] transition-transform">
                    Pay Now
                </button>
</div>
</div>
{/*  Transactions Section  */}
<section className="mb-12">
<div className="flex items-center justify-between mb-8">
<h2 className="font-headline text-2xl font-bold">Recent Transactions</h2>
<button className="text-primary font-semibold text-sm hover:underline">Download CSV</button>
</div>
<div className="bg-surface-container-low rounded-xl overflow-hidden p-2">
<div className="space-y-2">
{/*  Transaction Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between group hover:bg-surface-bright transition-colors cursor-pointer">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">shopping_cart</span>
</div>
<div>
<p className="font-bold text-on-surface">Whole Foods Market</p>
<p className="text-xs text-outline font-medium uppercase tracking-wider">Groceries • Sep 24</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-extrabold text-on-surface text-lg">-$142.30</p>
<p className="text-[10px] text-tertiary-fixed-dim font-bold uppercase">Pending</p>
</div>
</div>
{/*  Transaction Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between group hover:bg-surface-bright transition-colors cursor-pointer">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-secondary-fixed-dim group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">bolt</span>
</div>
<div>
<p className="font-bold text-on-surface">Grid Services Inc.</p>
<p className="text-xs text-outline font-medium uppercase tracking-wider">Utilities • Sep 22</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-extrabold text-on-surface text-lg">-$85.00</p>
<p className="text-[10px] text-secondary font-bold uppercase">Cleared</p>
</div>
</div>
{/*  Transaction Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between group hover:bg-surface-bright transition-colors cursor-pointer">
<div className="flex items-center gap-5">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">coffee</span>
</div>
<div>
<p className="font-bold text-on-surface">Espresso Editorial</p>
<p className="text-xs text-outline font-medium uppercase tracking-wider">Dining • Sep 20</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-extrabold text-on-surface text-lg">-$12.50</p>
<p className="text-[10px] text-secondary font-bold uppercase">Cleared</p>
</div>
</div>
</div>
</div>
</section>
{/*  Previous Statements  */}
<section>
<h2 className="font-headline text-xl font-bold mb-6">History</h2>
<div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
<div className="flex-shrink-0 w-64 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline/5">
<p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">August 2023</p>
<p className="font-headline text-2xl font-bold mb-4">$3,120.00</p>
<div className="flex items-center text-secondary gap-1 text-xs font-bold">
<span className="material-symbols-outlined text-sm">check_circle</span>
                        FULLY PAID
                    </div>
</div>
<div className="flex-shrink-0 w-64 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline/5">
<p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">July 2023</p>
<p className="font-headline text-2xl font-bold mb-4">$2,950.40</p>
<div className="flex items-center text-secondary gap-1 text-xs font-bold">
<span className="material-symbols-outlined text-sm">check_circle</span>
                        FULLY PAID
                    </div>
</div>
<div className="flex-shrink-0 w-64 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline/5">
<p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">June 2023</p>
<p className="font-headline text-2xl font-bold mb-4">$2,410.15</p>
<div className="flex items-center text-secondary gap-1 text-xs font-bold">
<span className="material-symbols-outlined text-sm">check_circle</span>
                        FULLY PAID
                    </div>
</div>
</div>
</section>
</main>
<BottomNavBar />

    </>
  );
}
