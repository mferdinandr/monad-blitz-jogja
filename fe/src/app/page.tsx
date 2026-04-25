'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { sdk } from '@farcaster/miniapp-sdk';

const features = [
  {
    title: 'Tap to Trade',
    description: 'One tap to go long, one tap to go short. No complex setup — just pick your direction and you\'re in.',
  },
  {
    title: 'Zero Gas Fees',
    description: 'Our relayer wallet covers all transaction costs so you can focus on trading, not fees.',
  },
  {
    title: 'Pyth Oracle',
    description: 'Real-time, high-fidelity price feeds powered by Pyth Network for accurate market data.',
  },
  {
    title: 'Account Abstraction',
    description: 'Trade seamlessly with Privy-powered smart wallets — no seed phrases, no hassle.',
  },
  {
    title: 'Multi-Market',
    description: 'Trade crypto, forex, indices, commodities, and stocks all in one place.',
  },
  {
    title: 'Built on Monad',
    description: 'Fast, low-cost, and secure transactions on the Monad blockchain.',
  },
];

const markets = ['BTC', 'ETH', 'SOL', 'BNB', 'ARB', 'XAU', 'XAG', 'AAPL', 'GOOGL', 'SPY'];

export default function LandingPage() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">MonadBlitz</span>
          </div>
          <Link
            href="/trade"
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Trade Anything.{' '}
          <span className="text-cyan-400">One Tap.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          The simplest decentralized exchange — tap to trade, open positions, and earn rewards with zero gas fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/trade"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3 transition-colors"
          >
            Launch App
          </Link>
          <a
            href="#features"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Markets Ticker */}
      <section className="border-y border-white/10 py-4 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...markets, ...markets].map((m, i) => (
            <span key={i} className="text-gray-400 text-sm font-mono">{m}/USDC</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Tethra?</h2>
        <p className="text-gray-400 text-center mb-16">Built for traders who want speed, simplicity, and full control.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="border border-white/10 bg-white/5 p-6 hover:border-cyan-500/40 transition-colors">
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to trade?</h2>
        <p className="text-gray-400 mb-8">Connect your wallet and start trading in seconds.</p>
        <Link
          href="/trade"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-10 py-3 transition-colors"
        >
          Launch App
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">© 2025 MonadBlitz. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="https://x.com/TethraTrade" target="_blank" className="hover:text-white transition-colors">X</a>
            <a href="https://github.com/Tethra-Dex" target="_blank" className="hover:text-white transition-colors">GitHub</a>
            <span className="hover:text-white transition-colors cursor-pointer">Docs</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
