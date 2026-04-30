import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';

export function Configuracoes() {
  return (
    <>

<TopNavBar />
<main className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
<header className="mb-10">
<h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Settings</h1>
<p className="text-on-surface-variant font-medium">Customize your financial workspace.</p>
</header>
{/*  Profile Section  */}
<section className="mb-10">
<div className="bg-surface-container-lowest rounded-xl p-6 flex items-center gap-6">
<div className="relative group">
<img className="w-20 h-20 rounded-full object-cover" data-alt="close up portrait of a young man with glasses and creative style, studio lighting, clean soft background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuRpPPOa23iMsNWXoVwLDWNHqrtTIHNPv6lnxJ4vx1XPM5Lg_otgoc0ner2UTUURrRM917xkt-r_oX29u5xQ8Kw_5ytuN43BuzO_SqRaUKGeKjFA-0vsp7A1f33uONAHxPGXY2vq2kmex4OEcjqxw1oNzBx2qmD9n-IJYOYEqTzxB2hT6FBPBEw6JGtrUVweNiMJWYC04vOgq3CIwLOdL7VUDYm1BoT_i5HleN58Bf3Jejkn2XveRybbhA4qZmrMak0nx_I4aEMb0"/>
<button className="absolute bottom-0 right-0 bg-primary text-on-primary p-1.5 rounded-full shadow-lg">
<span className="material-symbols-outlined text-sm">edit</span>
</button>
</div>
<div>
<h3 className="text-xl font-bold font-headline text-on-surface">Alex Rivera</h3>
<p className="text-sm text-on-surface-variant mb-3">alex.rivera@scholar.edu</p>
<button className="text-sm font-semibold text-primary py-1 px-3 bg-primary-fixed rounded-full hover:opacity-80 transition-opacity">
                        Edit Profile
                    </button>
</div>
</div>
</section>
{/*  Preferences Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
{/*  Currency & Balance Card  */}
<div className="bg-surface-container-low rounded-xl p-6 space-y-6">
<div>
<label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Currency Preference</label>
<div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl">
<div className="flex items-center gap-3">
<span className="p-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold">R$</span>
<span className="font-semibold">Brazilian Real</span>
</div>
<span className="material-symbols-outlined text-outline">expand_more</span>
</div>
</div>
<div>
<label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Initial Balance</label>
<div className="relative">
<input className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-4 font-headline text-lg font-bold focus:ring-2 focus:ring-primary" type="text" value="5.250,00"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant font-bold">R$</span>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 px-1 italic">This balance will be your starting point for this month.</p>
</div>
</div>
{/*  Appearance & Data  */}
<div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between">
<div className="flex items-center justify-between mb-6">
<div>
<h4 className="font-bold text-on-surface">Dark Mode</h4>
<p className="text-xs text-on-surface-variant">Switch to the dark side</p>
</div>
<div className="w-12 h-6 bg-outline-variant rounded-full p-1 flex items-center">
<div className="w-4 h-4 bg-white rounded-full shadow-sm translate-x-0 transition-transform"></div>
</div>
</div>
<div className="space-y-3">
<button className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:bg-white/50 transition-colors">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">download</span>
<span className="font-semibold text-sm">Export Data</span>
</div>
<span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded uppercase">CSV / PDF</span>
</button>
<button className="w-full flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl hover:bg-white/50 transition-colors">
<span className="material-symbols-outlined text-primary">security</span>
<span className="font-semibold text-sm">Privacy &amp; Security</span>
</button>
</div>
</div>
</div>
{/*  Danger Zone  */}
<section className="mt-12 pt-6 border-t border-outline-variant/10">
<h3 className="text-xs font-bold uppercase tracking-widest text-error mb-4">Danger Zone</h3>
<div className="bg-error-container/20 rounded-xl p-1">
<button className="w-full flex items-center justify-between p-5 text-error font-bold rounded-xl hover:bg-error-container/40 transition-all">
<div className="flex items-center gap-4">
<div className="p-2 bg-error-container text-on-error-container rounded-lg">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
</div>
<span>Sign Out of Account</span>
</div>
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</section>
{/*  Version Info  */}
<div className="text-center mt-12 mb-8">
<p className="text-[10px] font-bold text-outline-variant uppercase tracking-[0.2em]">The Fluid Scholar v2.4.1</p>
</div>
</main>
<BottomNavBar />

    </>
  );
}
