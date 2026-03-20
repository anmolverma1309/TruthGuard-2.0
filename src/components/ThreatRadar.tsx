"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { subject: 'Health Myths', threat: 120, velocity: 110, fullMark: 150 },
    { subject: 'Election Integrity', threat: 140, velocity: 130, fullMark: 150 },
    { subject: 'Crypto Scams', threat: 86, velocity: 130, fullMark: 150 },
    { subject: 'AI Audio Fakes', threat: 99, velocity: 100, fullMark: 150 },
    { subject: 'Geopolitics', threat: 115, velocity: 90, fullMark: 150 },
    { subject: 'Climate Denials', threat: 65, velocity: 85, fullMark: 150 },
];

export default function ThreatRadar() {
    return (
        <div className="w-full h-[450px] neo-glass rounded-[32px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neo-purple/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-neo-purple/10 transition-colors duration-700" />
            <h3 className="text-xl font-bold tracking-tight text-white mb-6 flex justify-between items-center">
                <span>Vector Analytics</span>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neo-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neo-cyan"></span>
                    </span>
                    <span className="text-[10px] font-mono text-neo-cyan tracking-[0.2em] uppercase font-bold">Live Grid</span>
                </div>
            </h3>

            <ResponsiveContainer width="100%" height="85%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 300, letterSpacing: '0.1em' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />

                    <Radar name="Threat Matrix" dataKey="threat" stroke="#bf5af2" fill="#bf5af2" fillOpacity={0.2} strokeWidth={2} />
                    <Radar name="Propagation" dataKey="velocity" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.2} strokeWidth={2} />

                    <Tooltip
                        contentStyle={{ 
                            backgroundColor: 'rgba(13, 17, 26, 0.95)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
