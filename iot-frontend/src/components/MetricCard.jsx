import { ShieldAlert, BrainCircuit, Zap } from 'lucide-react';

export default function MetricCard({ iaq, predIaq }) {
  return (
    <div className="col-span-4 bg-white rounded-[4rem] p-10 shadow-2xl border border-white flex flex-col justify-around relative overflow-hidden h-full">
      <div className="absolute top-10 right-10 opacity-[0.03] scale-[2.5] text-slate-900"><ShieldAlert size={150} /></div>
      <div className="text-center">
        <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-xs mb-4">Current IAQ</p>
        <h2 className="text-[12rem] font-black text-slate-950 leading-none tracking-tighter">{iaq || '0'}</h2>
        <div className={`mt-6 inline-block px-12 py-3 rounded-2xl font-black text-xl tracking-widest uppercase shadow-sm ${iaq < 100 ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
          {iaq < 100 ? 'Optimal' : 'Warned'}
        </div>
      </div>
      
    </div>
  );
}

{/* <div className="bg-slate-50 rounded-[3rem] p-8 border border-slate-100 mt-2 flex flex-col gap-2 relative">
         <div className="flex items-center gap-3 text-blue-600 mb-2">
            <BrainCircuit size={28} />
            <span className="text-xs font-black uppercase tracking-widest">LSTM Forecast</span>
         </div>
         <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">{predIaq || '--'}</span>
            <Zap className="text-amber-400 fill-current ml-auto" size={30} />
         </div>
</div> */}