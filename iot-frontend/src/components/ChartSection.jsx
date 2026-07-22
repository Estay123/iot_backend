import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BrainCircuit, TrendingUp } from 'lucide-react';

export default function ChartSection({ historyData, predictionData }) {
  return (
    // ✅ 关键：从 flex 改为 flex-col，让图表上下堆叠，不再挤在左右
    <div className="flex flex-col gap-10 w-full pb-20">
  
      {/* 2. History Cycle (排在第二个) */}
      <div className="w-full bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100 flex flex-col h-[450px]">
        <div className="flex items-center gap-3 mb-6 px-4 text-blue-600">
          <TrendingUp size={24} />
          <h3 className="text-xl font-black uppercase tracking-widest italic">Historical Analysis</h3>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData}>
              <defs>
                <linearGradient id="cHist" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)'}} />
              <Area type="monotone" dataKey="iaq" stroke="#3b82f6" strokeWidth={5} fill="url(#cHist)" animationDuration={1000}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}


// ✅ 关键：从 flex 改为 flex-col，让图表上下堆叠，不再挤在左右
    // <div className="flex flex-col gap-10 w-full pb-20">
      
    //   {/* 1. LSTM Forecast (排在第一个) */}
    //   <div className="w-full bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100 flex flex-col h-[450px]">
    //     <div className="flex items-center gap-3 mb-6 px-4 text-purple-600">
    //       <BrainCircuit size={24} />
    //       <h3 className="text-xl font-black uppercase tracking-widest italic">LSTM Neural Forecast</h3>
    //     </div>
    //     <div className="flex-1 min-h-0">
    //       <ResponsiveContainer width="100%" height="100%">
    //         <AreaChart data={predictionData}>
    //           <defs>
    //             <linearGradient id="cPred" x1="0" y1="0" x2="0" y2="1">
    //               <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
    //               <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
    //             </linearGradient>
    //           </defs>
    //           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
    //           <XAxis dataKey="time" hide />
    //           <YAxis hide domain={['auto', 'auto']} />
    //           <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)'}} />
    //           <Area type="monotone" dataKey="iaq" stroke="#a855f7" strokeWidth={5} strokeDasharray="8 8" fill="url(#cPred)" animationDuration={1000}/>
    //         </AreaChart>
    //       </ResponsiveContainer>
    //     </div>
    //   </div>