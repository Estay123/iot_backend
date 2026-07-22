// import React from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { BrainCircuit, Zap } from 'lucide-react';

// const LstmChart = ({ data, color = "#a855f7" }) => {
//   return (
//     <div className="flex flex-col h-full w-full bg-white rounded-[3rem] p-8 shadow-xl border border-white overflow-hidden min-h-0">
//       {/* 标题区域 */}
//       <div className="flex items-center justify-between mb-6 px-2">
//         <div className="flex items-center gap-3">
//           <BrainCircuit className="text-purple-600" size={24} />
//           <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">
//             LSTM Neural Forecast
//           </h3>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-xl border border-purple-100">
//           <Zap size={14} className="text-purple-500 fill-current" />
//           <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">AI Active</span>
//         </div>
//       </div>

//       {/* 图表容器：核心修复点在于层级的严格闭合 */}
//       <div className="flex-1 min-h-0">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//             <defs>
//               <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor={color} stopOpacity={0.3} />
//                 <stop offset="95%" stopColor={color} stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//             <XAxis dataKey="time" hide />
//             <YAxis hide domain={['auto', 'auto']} />
//             <Tooltip 
//               contentStyle={{ 
//                 borderRadius: '20px', 
//                 border: 'none', 
//                 boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
//               }} 
//             />
//             <Area
//               type="monotone"
//               dataKey="iaq"
//               stroke={color}
//               strokeWidth={5}
//               strokeDasharray="10 10"
//               fillOpacity={1}
//               fill="url(#colorPred)"
//               animationDuration={1500}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default LstmChart;