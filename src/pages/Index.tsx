import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LuMenu, 
  LuArrowRight, 
  LuCheck, 
  LuActivity, 
  LuGitBranch, 
  LuShieldCheck, 
  LuLock, 
  LuZap, 
  LuServer,
  LuFileText
} from 'react-icons/lu';
import { Reveal } from '@/components/motion/Reveal';
import { SignatureInteraction } from '@/components/effects/SignatureInteraction';

// --- Types ---
interface LogEntry {
  id: number;
  time: string;
  text: string;
}

// --- Main Component ---
export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to add logs
  const addLog = (text: string) => {
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    setLogs(prev => {
      const newLogs = [...prev, { id: Date.now(), time, text }];
      if (newLogs.length > 5) return newLogs.slice(newLogs.length - 5);
      return newLogs;
    });
  };

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Initial logs
  useEffect(() => {
    setTimeout(() => addLog('Initializing UI components...'), 500);
    setTimeout(() => addLog('Connecting to stream...'), 1200);
    setTimeout(() => addLog('Connection established (12ms).'), 2000);
  }, []);

  const handleSectionEnter = (id: string) => {
    setActiveSection(id);
    addLog(`Viewing module: ${id.toUpperCase()}`);
  };

  const navLinks = [
    { id: 'hero', label: '01_INITIALIZE' },
    { id: 'value', label: '02_ANALYSIS' },
    { id: 'how-it-works', label: '03_PIPELINE' },
    { id: 'features', label: '04_MODULES' },
    { id: 'proof', label: '05_VERIFICATION' },
    { id: 'cta', label: '06_EXECUTE' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <style>{`
        :root {
          --rail-width: 320px;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        .layout-grid {
          display: grid;
          grid-template-columns: var(--rail-width) 1fr;
          min-height: 100vh;
        }
        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr;
          }
          .rail {
            display: none;
          }
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }
        .glass-panel {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-card {
          background: linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(30, 41, 59, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          border-color: #06b6d4;
          transform: translateY(-4px);
          box-shadow: 0 10px 40px -10px rgba(6, 182, 212, 0.2);
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="layout-grid">
        {/* LEFT RAIL */}
        <aside className="rail h-screen sticky top-0 border-r border-slate-800 bg-slate-950 p-8 flex flex-col justify-between z-50">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="font-mono font-bold text-xl tracking-tight text-white">OMNISIGHT</span>
            </div>

            <nav className="space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  className={`nav-link block text-sm font-mono transition-all ${
                    activeSection === link.id 
                      ? 'text-cyan-400 pl-2 opacity-100' 
                      : 'text-slate-500 hover:text-white opacity-100'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="glass-panel p-4 rounded text-xs font-mono text-slate-400">
            <div className="mb-2 text-slate-600 uppercase tracking-wider">System Log</div>
            <div ref={logContainerRef} className="h-32 overflow-hidden flex flex-col justify-end">
              {logs.map((log) => (
                <p key={log.id}>
                  <span className="text-slate-600">[{log.time}]</span> {log.text}
                </p>
              ))}
              {logs.length === 0 && <p>&gt; System ready.</p>}
            </div>
            <span className="inline-block w-2 h-4 bg-cyan-500 align-middle ml-1 cursor-blink"></span>
          </div>
        </aside>

        {/* MOBILE HEADER */}
        <div className="lg:hidden fixed top-0 w-full bg-slate-950/90 backdrop-blur-md z-50 border-b border-slate-800 p-4 flex justify-between items-center">
          <span className="font-mono font-bold text-xl text-white">OMNISIGHT</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-cyan-500 font-mono text-sm border border-cyan-500/30 px-3 py-1 rounded flex items-center gap-2"
          >
            <LuMenu /> MENU
          </button>
        </div>

        {/* MAIN CONTENT */}
        <main className="relative">
          
          {/* 1. HERO */}
          <section 
            id="hero" 
            className="min-h-screen flex flex-col justify-center px-6 lg:px-20 py-24 relative overflow-hidden"
          >
            <motion.div 
              onViewportEnter={() => handleSectionEnter('hero')}
              className="absolute inset-0 z-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                alt="Cybersecurity abstract" 
                className="w-full h-full object-cover opacity-20 mix-blend-screen" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
            </motion.div>

            <div className="relative z-10 max-w-4xl">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  V2.4 LIVE RELEASE
                </div>
              </Reveal>
              
              <SignatureInteraction type="text-reveal" className="mb-8">
                <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  TOTAL <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 text-glow">VISIBILITY</span>
                </h1>
              </SignatureInteraction>
              
              <Reveal delay={0.2}>
                <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
                  Eliminate the guesswork. Real-time full-stack observability for enterprise infrastructure. Ingest logs, metrics, and traces with zero latency.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <a href="#cta" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded transition-colors flex items-center gap-2">
                    Start Inspection
                    <LuArrowRight className="w-4 h-4" />
                  </a>
                  <button className="px-8 py-4 rounded border border-slate-700 text-white font-mono hover:bg-slate-800 transition-colors">
                    $ npm install omnisight
                  </button>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 2. VALUE PROPOSITION */}
          <section 
            id="value" 
            className="py-32 px-6 lg:px-20 bg-slate-950 border-t border-slate-900"
          >
            <motion.div 
              onViewportEnter={() => handleSectionEnter('value')}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20"
            >
              <Reveal>
                <h2 className="text-4xl font-bold mb-6">Stop debugging in the dark.</h2>
                <p className="text-slate-400 text-lg mb-8">
                  Traditional monitoring tools sample data. We don't. Omnisight captures 100% of your events, allowing you to trace standard outliers and black swan events with absolute precision.
                </p>
                <ul className="space-y-4 font-mono text-sm text-cyan-400">
                  <li className="flex items-center gap-3">
                    <LuCheck className="w-5 h-5" />
                    infinite_cardinality_support
                  </li>
                  <li className="flex items-center gap-3">
                    <LuCheck className="w-5 h-5" />
                    sub_millisecond_query_speed
                  </li>
                  <li className="flex items-center gap-3">
                    <LuCheck className="w-5 h-5" />
                    predictive_anomaly_detection
                  </li>
                </ul>
              </Reveal>
              
              <Reveal delay={0.2} className="grid grid-cols-2 gap-4 w-full">
                <SignatureInteraction type="hover" className="glass-card p-6 rounded-lg">
                  <div className="text-4xl font-mono font-bold text-white mb-2">99.99%</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest">Uptime Guarantee</div>
                </SignatureInteraction>
                <SignatureInteraction type="hover" className="glass-card p-6 rounded-lg">
                  <div className="text-4xl font-mono font-bold text-emerald-400 mb-2">&lt;10ms</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest">Query Latency</div>
                </SignatureInteraction>
                <SignatureInteraction type="hover" className="glass-card p-6 rounded-lg col-span-2">
                  <div className="text-4xl font-mono font-bold text-purple-400 mb-2">50PB+</div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest">Daily Data Ingested</div>
                </SignatureInteraction>
              </Reveal>
            </motion.div>
          </section>

          {/* 3. HOW IT WORKS */}
          <section 
            id="how-it-works" 
            className="py-32 px-6 lg:px-20 relative"
          >
            <motion.div 
              onViewportEnter={() => handleSectionEnter('how-it-works')}
              className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
            >
              <img 
                src="https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2671&auto=format&fit=crop" 
                alt="Data pipeline" 
                className="w-full h-full object-cover mix-blend-luminosity" 
              />
            </motion.div>

            <div className="relative z-10">
              <h2 className="text-sm font-mono text-cyan-500 mb-4">/// ARCHITECTURE PIPELINE</h2>
              <h3 className="text-5xl font-bold text-white mb-16 max-w-2xl">From chaos to clarity in three steps.</h3>

              <div className="space-y-8 border-l border-slate-800 ml-4">
                
                <Reveal className="relative pl-12 py-4 group">
                  <span className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-colors"></span>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">1. Ingest</h4>
                  <p className="text-slate-400 max-w-lg">Deploy our lightweight agents or connect via OpenTelemetry. We support AWS, GCP, Azure, and on-premise bare metal seamlessly.</p>
                </Reveal>

                <Reveal delay={0.1} className="relative pl-12 py-4 group">
                  <span className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-purple-500 group-hover:bg-purple-500 transition-colors"></span>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">2. Index</h4>
                  <p className="text-slate-400 max-w-lg">Data is indexed in real-time using our proprietary columnar store, enabling blazing fast aggregation without pre-defined schemas.</p>
                </Reveal>

                <Reveal delay={0.2} className="relative pl-12 py-4 group">
                  <span className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-colors"></span>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">3. Visualize</h4>
                  <p className="text-slate-400 max-w-lg">Build dashboards in seconds. Set alerts based on complex anomalies, not just static thresholds.</p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 4. KEY FEATURES */}
          <section 
            id="features" 
            className="py-32 px-6 lg:px-20 bg-slate-900/50"
          >
            <motion.div 
              onViewportEnter={() => handleSectionEnter('features')}
              className="mb-16 flex items-end justify-between"
            >
              <div>
                <h2 className="text-sm font-mono text-cyan-500 mb-4">/// MODULES</h2>
                <h3 className="text-4xl font-bold text-white">Complete Infrastructure Control</h3>
              </div>
              <a href="#" className="hidden md:block text-slate-400 hover:text-white font-mono text-sm underline">View Documentation -&gt;</a>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <Reveal className="glass-card p-8 rounded-xl group">
                <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center mb-6 text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-all">
                  <LuActivity className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Live Metrics</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Streaming metrics with 1-second granularity. Watch your CPU, memory, and I/O paint the screen in real-time.</p>
              </Reveal>

              {/* Feature 2 */}
              <Reveal delay={0.1} className="glass-card p-8 rounded-xl group">
                <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center mb-6 text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-all">
                  <LuGitBranch className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Distributed Tracing</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Visualize the entire request lifecycle across microservices. Pinpoint exactly where the bottleneck lives.</p>
              </Reveal>

              {/* Feature 3 */}
              <Reveal delay={0.2} className="glass-card p-8 rounded-xl group">
                <div className="w-12 h-12 bg-emerald-500/10 rounded flex items-center justify-center mb-6 text-emerald-400 group-hover:text-white group-hover:bg-emerald-500 transition-all">
                  <LuShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Compliance Ready</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Built for the enterprise. SOC2 Type II certified, GDPR compliant, and full audit logs included out of the box.</p>
              </Reveal>
            </div>
          </section>

          {/* 5. PROOF */}
          <section 
            id="proof" 
            className="py-24 px-6 lg:px-20 border-y border-slate-900"
          >
            <motion.div 
              onViewportEnter={() => handleSectionEnter('proof')}
              className="text-center mb-12"
            >
              <p className="text-slate-500 font-mono text-sm">TRUSTED BY ENGINEERING TEAMS AT</p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-black text-white tracking-tighter">ACME<span className="font-light">CORP</span></span>
              <span className="text-2xl font-bold text-white tracking-widest">VORTEX</span>
              <span className="text-2xl font-bold text-white italic">Stratos</span>
              <span className="text-2xl font-black text-white">Hyper<span className="text-cyan-500">Loop</span></span>
              <span className="text-2xl font-bold text-white font-mono">{`{CODE_BASE}`}</span>
            </div>

            <div className="mt-20 flex flex-col lg:flex-row gap-8 justify-center items-center">
              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                  <LuShieldCheck className="w-6 h-6" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-white font-bold">SOC2 Type II</div>
                  <div className="text-xs text-slate-500">Certified</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                  <LuLock className="w-6 h-6" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-white font-bold">GDPR Ready</div>
                  <div className="text-xs text-slate-500">Compliant</div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. PRIMARY CTA */}
          <section 
            id="cta" 
            className="py-40 px-6 lg:px-20 relative overflow-hidden"
          >
             <motion.div 
               onViewportEnter={() => handleSectionEnter('cta')}
               className="absolute inset-0 z-0"
             >
                <img 
                  src="https://images.unsplash.com/photo-1614064641938-3bcee52970f4?q=80&w=2670&auto=format&fit=crop" 
                  alt="Server lights" 
                  className="w-full h-full object-cover opacity-10 mix-blend-overlay" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
            </motion.div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">Ready to see <br />the full picture?</h2>
              <p className="text-xl text-slate-400 mb-12">
                Deploy Omnisight in your environment today. 14-day full access trial. No credit card required.
              </p>
              
              <div className="bg-slate-900 p-2 rounded-lg inline-flex flex-col md:flex-row items-center border border-slate-700 shadow-2xl max-w-lg w-full">
                <div className="flex-1 w-full">
                   <input type="email" placeholder="engineer@company.com" className="w-full bg-transparent border-none text-white px-4 py-3 focus:ring-0 placeholder-slate-500 font-mono outline-none" />
                </div>
                <button className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3 rounded shadow-lg transition-transform transform active:scale-95">
                  Initialize Demo
                </button>
              </div>
              <p className="mt-6 text-xs text-slate-600 font-mono">By clicking above, you agree to our Terms of Service.</p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-12 px-6 lg:px-20 border-t border-slate-900 text-center lg:text-left">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="col-span-1">
                <span className="font-mono font-bold text-xl text-white">OMNISIGHT</span>
                <p className="text-slate-500 text-sm mt-4"> 2024 Omnisight Inc.<br />All systems operational.</p>
              </div>
              <div className="col-span-3 flex justify-center lg:justify-end gap-8">
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Platform</a>
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Documentation</a>
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Security</a>
                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Contact</a>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}