import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function Parcelamentos() {
  return (
    <>

<TopNavBar />
<main className="pt-24 px-6 max-w-5xl mx-auto">
{/*  Hero Summary  */}
<section className="mb-10">
<span className="font-label text-label-sm uppercase tracking-widest text-primary opacity-70">Scholar Ledger</span>
<h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mt-2 mb-6">Installment Plan</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/*  Total Debt Card  */}
<div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow relative overflow-hidden border border-outline-variant/15">
<div className="relative z-10">
<p className="font-label text-sm text-on-surface-variant mb-1">Total Remaining</p>
<h2 className="font-headline text-3xl font-bold text-primary tracking-tight">$4,280.00</h2>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
</div>
</div>
{/*  Monthly Burden Card  */}
<div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
<p className="font-label text-sm text-on-surface-variant mb-1">Monthly Payment</p>
<h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">$345.50</h2>
<div className="mt-4 flex items-center gap-2">
<span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-xs font-semibold text-secondary">Due in 12 days</span>
</div>
</div>
{/*  Action Card  */}
<button className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl editorial-shadow flex flex-col justify-center items-center group transition-all active:scale-95">
<div className="bg-white/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-on-primary">add</span>
</div>
<span className="font-headline text-lg font-bold text-on-primary">Add Installment</span>
</button>
</div>
</section>
{/*  Main Content Grid  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/*  List View (Left/Main Column)  */}
<div className="lg:col-span-7 space-y-6">
<div className="flex items-center justify-between px-2">
<h3 className="font-headline text-xl font-bold">Active Purchases</h3>
<button className="text-primary text-sm font-bold flex items-center gap-1">
                        View Archive <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
{/*  Item 1: High-End Tech  */}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 editorial-shadow transition-all hover:bg-surface-bright group cursor-pointer">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-3xl">laptop_mac</span>
</div>
<div>
<h4 className="font-headline text-lg font-bold">MacBook Pro M3</h4>
<p className="text-on-surface-variant text-sm font-medium">Apple Store Direct</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-bold text-lg">$2,499.00</p>
<span className="font-label text-xs font-bold text-primary px-2 py-1 bg-primary-fixed rounded-lg">8 / 12 Months</span>
</div>
</div>
{/*  Progress Bar  */}
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold text-on-surface-variant">
<span>Progress</span>
<span>66%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{ width: '66%' }}></div>
</div>
</div>
</div>
{/*  Item 2: Travel/Study Abroad  */}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 editorial-shadow transition-all hover:bg-surface-bright group cursor-pointer">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-3xl">flight_takeoff</span>
</div>
<div>
<h4 className="font-headline text-lg font-bold">Study Abroad: Berlin</h4>
<p className="text-on-surface-variant text-sm font-medium">Program Fees &amp; Logistics</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-bold text-lg">$1,200.00</p>
<span className="font-label text-xs font-bold text-secondary px-2 py-1 bg-secondary-fixed rounded-lg">2 / 6 Months</span>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold text-on-surface-variant">
<span>Progress</span>
<span>33%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{ width: '33%' }}></div>
</div>
</div>
</div>
{/*  Item 3: Furniture/Living  */}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 editorial-shadow transition-all hover:bg-surface-bright group cursor-pointer opacity-80">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-3xl">chair</span>
</div>
<div>
<h4 className="font-headline text-lg font-bold">Ergonomic Desk Set</h4>
<p className="text-on-surface-variant text-sm font-medium">IKEA Student Program</p>
</div>
</div>
<div className="text-right">
<p className="font-headline font-bold text-lg">$581.00</p>
<span className="font-label text-xs font-bold text-tertiary px-2 py-1 bg-tertiary-fixed rounded-lg">11 / 12 Months</span>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold text-on-surface-variant">
<span>Progress</span>
<span>92%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{ width: '92%' }}></div>
</div>
</div>
</div>
</div>
{/*  Detailed History View (Right Column)  */}
<aside className="lg:col-span-5">
<div className="bg-surface-container-low rounded-xl p-8 sticky top-24">
<div className="flex items-center justify-between mb-8">
<h3 className="font-headline text-xl font-bold">Detail View</h3>
<span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
</div>
<div className="text-center mb-8">
<div className="inline-flex items-center justify-center relative mb-4">
{/*  Circular Progress  */}
<svg className="w-32 h-32 transform -rotate-90">
<circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
<circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" stroke-dasharray="364.4" stroke-dashoffset="123.9" strokeWidth="8"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-bold text-primary">8/12</span>
<span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Paid</span>
</div>
</div>
<h4 className="font-headline text-xl font-bold">MacBook Pro M3</h4>
<p className="text-on-surface-variant text-sm">Monthly Installment: $208.25</p>
</div>
<div className="space-y-6">
<h5 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">Payment History</h5>
{/*  History List  */}
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<div>
<p className="text-sm font-bold">Installment #8</p>
<p className="text-[10px] text-on-surface-variant">OCT 15, 2023</p>
</div>
</div>
<p className="text-sm font-bold text-on-surface">-$208.25</p>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<div>
<p className="text-sm font-bold">Installment #7</p>
<p className="text-[10px] text-on-surface-variant">SEP 15, 2023</p>
</div>
</div>
<p className="text-sm font-bold text-on-surface">-$208.25</p>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl opacity-60">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-outline-variant">schedule</span>
<div>
<p className="text-sm font-bold">Installment #9</p>
<p className="text-[10px] text-on-surface-variant">Upcoming: NOV 15</p>
</div>
</div>
<p className="text-sm font-bold text-on-surface">-$208.25</p>
</div>
</div>
<button className="w-full py-4 bg-surface-container-highest rounded-xl text-primary font-bold text-sm hover:bg-white transition-colors border border-transparent hover:border-primary/10">
                            Download Receipt History
                        </button>
</div>
</div>
</aside>
</div>
</main>
<BottomNavBar />

    </>
  );
}
