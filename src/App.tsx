import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CreditIntelligence } from "./components/CreditIntelligence";
import { StudentsFeatures } from "./components/StudentsFeatures";
import { TrustSection } from "./components/TrustSection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
            <Header />
            <main className="flex-1">
                <Hero />
                <Features />
                <CreditIntelligence />
                <StudentsFeatures />
                <TrustSection />
            </main>
            <Footer />
        </div>
    </div>
  )
}

export default App
