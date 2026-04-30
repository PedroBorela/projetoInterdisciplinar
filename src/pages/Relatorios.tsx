import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function Relatorios() {
  return (
    <>

<TopNavBar />
<main className="max-w-7xl mx-auto px-6 pt-24 space-y-8">
{/*  Editorial Header Section  */}
<section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div className="space-y-1">
<h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary">Financial Intelligence</h1>
<p className="text-on-surface-variant font-medium">Curating your wealth through data-driven insights.</p>
</div>
<div className="relative group">
<select className="appearance-none bg-surface-container-low border-none rounded-xl px-6 py-3 pr-12 font-semibold text-primary focus:ring-2 focus:ring-primary cursor-pointer transition-all">
<option>October 2023</option>
<option>September 2023</option>
<option>August 2023</option>
<option>All-time</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary" data-icon="expand_more">expand_more</span>
</div>
</section>
{/*  Stats Bento Grid  */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/*  Main Balance Card  */}
<div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl text-on-primary flex flex-col justify-between overflow-hidden relative shadow-[0_12px_32px_rgba(72,0,178,0.06)]">
<div className="relative z-10">
<div className="text-on-primary-container/80 text-sm font-semibold uppercase tracking-widest mb-2">Portfolio Value</div>
<div className="text-5xl font-headline font-extrabold tracking-tighter mb-4">$14,280.45</div>
<div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
<span className="text-xs font-bold">+12.4% vs last month</span>
</div>
</div>
{/*  Abstract Design Element  */}
<div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
</div>
{/*  Contextual Insight Card  */}
<div className="bg-secondary-fixed p-8 rounded-xl flex flex-col justify-between shadow-[0_12px_32px_rgba(0,106,96,0.04)]">
<div>
<span className="material-symbols-outlined text-secondary text-3xl mb-4" data-icon="auto_awesome">auto_awesome</span>
<h3 className="text-secondary font-bold text-lg leading-tight">Smart Saver Forecast</h3>
<p className="text-on-secondary-fixed-variant/70 text-sm mt-2">You're on track to save an extra <span className="font-bold text-secondary">$420</span> this month by optimizing subscriptions.</p>
</div>
<button className="mt-6 bg-secondary text-on-secondary py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90">View Optimization</button>
</div>
</section>
{/*  Charts Layout: Asymmetrical Bento  */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/*  Monthly Spending Line Chart  */}
<div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15">
<div className="flex items-center justify-between mb-8">
<h2 className="text-xl font-headline font-bold text-on-surface">Monthly Spending Flow</h2>
<div className="flex gap-4">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="text-xs font-medium text-on-surface-variant">Spending</span>
</div>
</div>
</div>
<div className="h-[300px] w-full flex items-end justify-between gap-2">
{/*  Faux Line Chart Bars/Path Visualization  */}
<div className="flex-1 bg-surface-container-low rounded-t-lg relative group h-[40%]">
<div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-lg transition-all group-hover:bg-primary/40 h-full"></div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">MON</span>
</div>
<div className="flex-1 bg-surface-container-low rounded-t-lg relative group h-[60%]">
<div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-lg h-full transition-all group-hover:bg-primary/40"></div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">TUE</span>
</div>
<div className="flex-1 bg-surface-container-low rounded-t-lg relative group h-[55%]">
<div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-lg h-full transition-all group-hover:bg-primary/40"></div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">WED</span>
</div>
<div className="flex-1 bg-primary rounded-t-lg relative group h-[85%]">
<div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$1,240.00</div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">THU</span>
</div>
<div className="flex-1 bg-surface-container-low rounded-t-lg relative group h-[45%]">
<div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-lg h-full transition-all group-hover:bg-primary/40"></div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">FRI</span>
</div>
<div className="flex-1 bg-surface-container-low rounded-t-lg relative group h-[30%]">
<div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-lg h-full transition-all group-hover:bg-primary/40"></div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">SAT</span>
</div>
<div className="flex-1 bg-surface-container-low rounded-t-lg relative group h-[35%]">
<div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-lg h-full transition-all group-hover:bg-primary/40"></div>
<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">SUN</span>
</div>
</div>
</div>
{/*  Spendings per Category Doughnut Chart  */}
<div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col">
<h2 className="text-xl font-headline font-bold text-on-surface mb-8">Allocation</h2>
<div className="relative flex-1 flex items-center justify-center">
{/*  Faux Doughnut Chart  */}
<div className="w-48 h-48 rounded-full border-[20px] border-surface-container border-t-primary border-r-secondary-fixed border-l-tertiary-container relative flex items-center justify-center">
<div className="text-center">
<div className="text-2xl font-bold">$4,850</div>
<div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Out</div>
</div>
</div>
</div>
<div className="mt-8 space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<span className="text-sm font-medium">Housing</span>
</div>
<span className="text-sm font-bold">45%</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-secondary-fixed"></div>
<span className="text-sm font-medium">Lifestyle</span>
</div>
<span className="text-sm font-bold">30%</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
<span className="text-sm font-medium">Education</span>
</div>
<span className="text-sm font-bold">25%</span>
</div>
</div>
</div>
{/*  Income vs Expenses Bar Chart  */}
<div className="lg:col-span-12 bg-surface-container-low p-8 rounded-xl overflow-hidden">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
<div>
<h2 className="text-xl font-headline font-bold text-on-surface">Income vs Expenses</h2>
<p className="text-sm text-on-surface-variant">Quarterly performance analysis</p>
</div>
<div className="flex bg-white rounded-lg p-1 shadow-sm">
<button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-md">Bar</button>
<button className="px-4 py-2 text-slate-500 text-xs font-bold rounded-md">Table</button>
</div>
</div>
<div className="grid grid-cols-4 gap-8">
{/*  Q1  */}
<div className="space-y-4">
<div className="h-48 flex items-end gap-2">
<div className="flex-1 bg-secondary-fixed rounded-t-lg h-[80%]"></div>
<div className="flex-1 bg-tertiary-fixed-dim rounded-t-lg h-[60%]"></div>
</div>
<div className="text-center">
<div className="text-xs font-bold text-slate-500 uppercase">Quarter 1</div>
<div className="text-sm font-bold text-secondary">+$1,200 Net</div>
</div>
</div>
{/*  Q2  */}
<div className="space-y-4">
<div className="h-48 flex items-end gap-2">
<div className="flex-1 bg-secondary-fixed rounded-t-lg h-[90%]"></div>
<div className="flex-1 bg-tertiary-fixed-dim rounded-t-lg h-[75%]"></div>
</div>
<div className="text-center">
<div className="text-xs font-bold text-slate-500 uppercase">Quarter 2</div>
<div className="text-sm font-bold text-secondary">+$1,450 Net</div>
</div>
</div>
{/*  Q3  */}
<div className="space-y-4">
<div className="h-48 flex items-end gap-2">
<div className="flex-1 bg-secondary-fixed rounded-t-lg h-[70%]"></div>
<div className="flex-1 bg-tertiary-fixed-dim rounded-t-lg h-[85%]"></div>
</div>
<div className="text-center">
<div className="text-xs font-bold text-slate-500 uppercase">Quarter 3</div>
<div className="text-sm font-bold text-error">-$450 Net</div>
</div>
</div>
{/*  Q4 (Current)  */}
<div className="space-y-4">
<div className="h-48 flex items-end gap-2">
<div className="flex-1 bg-secondary-fixed rounded-t-lg h-[100%]"></div>
<div className="flex-1 bg-tertiary-fixed-dim rounded-t-lg h-[40%]"></div>
</div>
<div className="text-center">
<div className="text-xs font-bold text-slate-500 uppercase">Quarter 4</div>
<div className="text-sm font-bold text-secondary">+$3,200 Net</div>
</div>
</div>
</div>
</div>
</section>
{/*  Ledger Style Detail Section  */}
<section className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15">
<h2 className="text-xl font-headline font-bold text-on-surface mb-6">Scholar Ledger Transactions</h2>
<div className="space-y-4">
{/*  Transaction Item  */}
<div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="school">school</span>
</div>
<div>
<div className="font-bold">University Tuition</div>
<div className="text-xs text-on-surface-variant">October 15, 2023 • Education</div>
</div>
</div>
<div className="text-right">
<div className="font-bold text-on-surface">-$1,250.00</div>
<div className="text-[10px] font-bold text-slate-400 uppercase">Verified</div>
</div>
</div>
{/*  Transaction Item  */}
<div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="work">work</span>
</div>
<div>
<div className="font-bold">Tutoring Services</div>
<div className="text-xs text-on-surface-variant">October 12, 2023 • Freelance Income</div>
</div>
</div>
<div className="text-right">
<div className="font-bold text-secondary">+$450.00</div>
<div className="text-[10px] font-bold text-slate-400 uppercase">Pending</div>
</div>
</div>
{/*  Transaction Item  */}
<div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined" data-icon="restaurant">restaurant</span>
</div>
<div>
<div className="font-bold">Student Union Café</div>
<div className="text-xs text-on-surface-variant">October 10, 2023 • Lifestyle</div>
</div>
</div>
<div className="text-right">
<div className="font-bold text-on-surface">-$12.45</div>
<div className="text-[10px] font-bold text-slate-400 uppercase">Verified</div>
</div>
</div>
</div>
<button className="w-full mt-6 py-4 border-2 border-dashed border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container-low transition-all">Download Full Financial Report (PDF)</button>
</section>
</main>
<BottomNavBar />

    </>
  );
}
