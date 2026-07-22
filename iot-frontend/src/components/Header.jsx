import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white/80 backdrop-blur-md px-10 py-5 rounded-[2.5rem] shadow-sm border border-white">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-slate-950 uppercase italic"> IoT <span className="text-blue-600">Real-time Monitor</span></h1>
        <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase"></p>
      </div>
      <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100 flex items-center gap-3 shadow-inner">
        <Activity className="text-green-500 animate-pulse" size={20} />
        <span className="text-sm font-black text-green-700 tracking-widest">STABLE_LINK</span>
      </div>
    </header>
  );
}