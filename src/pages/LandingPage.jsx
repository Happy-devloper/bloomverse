import BouquetCanvas from '../components/bouquet/BouquetCanvas';

const heroFlowers = ['rose-rose', 'rose-yellow', 'lily', 'peony', 'sunflower', 'orchid', 'hydrangea', 'hibiscus'];

export default function LandingPage({ onCreateBouquet, onCreateLetter }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#fffaf7_0%,_#fffdfd_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        <section className="max-w-xl space-y-6">
          <div className="inline-flex rounded-full border border-rose-pink/20 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.3em] text-rose-pink shadow-sm">
            Romantic Greetings
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-slate-800 sm:text-5xl">
              Send love with flowers or vintage letters.
            </h1>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Create a beautiful bouquet or write a romantic love letter with elegant themes. Share instantly with anyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCreateBouquet}
              className="rounded-full bg-rose-pink px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(232,93,117,0.18)] hover:bg-[#E04D66] transition-all"
            >
              🌸 Create Bouquet
            </button>
            <button
              onClick={onCreateLetter}
              className="rounded-full bg-[#6a4c93] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(106,76,147,0.18)] hover:bg-[#5a3c83] transition-all"
            >
              💌 Write Love Letter
            </button>
          </div>
        </section>

        <section className="w-full max-w-[420px] rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
          <div className="rounded-[24px] border border-[#f4e3e7] bg-[#fff8fa] p-3">
            <BouquetCanvas selectedFlowers={heroFlowers} layout="classic" />
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">
            Elegant bouquets or handwritten letters - your choice
          </p>
        </section>
      </div>
    </div>
  );
}
