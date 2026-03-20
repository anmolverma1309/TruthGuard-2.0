"use client";

import { useState, useEffect } from "react";
import { Usb, ShieldAlert, MonitorCheck, Lock, Radio } from "lucide-react";
import { setupUsbListeners, requestUsbAccess } from "@/utils/usbDetection";

export default function USBThreatDetector() {
    const [status, setStatus] = useState<'IDLE' | 'CONNECTED' | 'DISCONNECTED'>('IDLE');
    const [lastDevice, setLastDevice] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<{msg: string, type: 'ALERT' | 'INFO'}[]>([]);

    useEffect(() => {
        setupUsbListeners(
            (data: any) => {
                setStatus('CONNECTED');
                setLastDevice(data.device);
                addNotification(`UNAUTHORIZED HARDWARE: ${data.device} LINKED`, 'ALERT');
            },
            (data: any) => {
                setStatus('DISCONNECTED');
                addNotification(`PERIPHERAL SEVERED: ${data.device}`, 'INFO');
            }
        );
    }, []);

    const addNotification = (msg: string, type: 'ALERT' | 'INFO') => {
        setNotifications(prev => [{ msg, type }, ...prev].slice(0, 5));
    };

    const handleConnectManual = async () => {
        const result = await requestUsbAccess();
        if (result) {
            setStatus('CONNECTED');
            setLastDevice(result.device);
            addNotification(`SECURE LINK ESTABLISHED: ${result.device}`, 'INFO');
        }
    };

    return (
        <div className="w-full max-w-4xl neo-glass rounded-[40px] p-12 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-64 h-64 bg-neo-cyan/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-neo-cyan/20 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`p-4 rounded-3xl transition-all duration-500 ${
                            status === 'CONNECTED' ? 'bg-neo-purple/20 text-neo-purple shadow-[0_0_20px_rgba(191,90,242,0.4)]' : 
                            'bg-neo-cyan/20 text-neo-cyan shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                        }`}>
                            <Usb className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight">HARDWARE MONITOR</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${
                                    status === 'CONNECTED' ? 'bg-neo-purple' : 'bg-neo-cyan'
                                }`} />
                                <span className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-[0.2em]">{status} MODE</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="neo-glass bg-white/5 p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
                            <div className="flex items-start gap-5">
                                <MonitorCheck className="w-6 h-6 text-neo-cyan" />
                                <div>
                                    <p className="text-neo-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Active Device Matrix</p>
                                    <p className="text-xl font-bold text-white mb-4">{lastDevice || "No Active Hardware"}</p>
                                    <button 
                                        onClick={handleConnectManual}
                                        className="text-[10px] font-black text-neo-cyan uppercase tracking-[0.3em] border border-neo-cyan/30 px-6 py-2.5 rounded-full hover:bg-neo-cyan/10 transition-colors"
                                    >
                                        Scan For Signals
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                                <Lock className="w-5 h-5 text-neo-text-secondary mx-auto mb-2" />
                                <p className="text-[11px] text-neo-text-secondary uppercase tracking-widest font-bold">Encrypted</p>
                            </div>
                            <div className="flex-1 bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                                <Radio className="w-5 h-5 text-neo-text-secondary mx-auto mb-2" />
                                <p className="text-[11px] text-neo-text-secondary uppercase tracking-widest font-bold">Isolated</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 border-l border-white/10 pl-12 h-min">
                    <h3 className="text-xl font-black text-white mb-8 tracking-tight flex items-center justify-between">
                        Signal Log
                        <span className="text-[10px] font-mono text-neo-text-secondary font-light">SEC-04</span>
                    </h3>
                    
                    <div className="space-y-5">
                        {notifications.length === 0 ? (
                            <p className="text-sm text-neo-text-secondary font-mono leading-relaxed opacity-40 italic">
                                Listening for peripheral connection vectors...
                            </p>
                        ) : (
                            notifications.map((n, i) => (
                                <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 animate-in slide-in-from-right-5 fade-in duration-500 ${
                                    n.type === 'ALERT' ? 'bg-neo-purple/10 border-neo-purple/20' : 'bg-neo-cyan/10 border-neo-cyan/20'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full ${n.type === 'ALERT' ? 'bg-neo-purple shadow-[0_0_10px_rgba(191,90,242,0.8)]' : 'bg-neo-cyan'}`} />
                                    <p className={`text-[11px] font-mono leading-tight font-bold ${n.type === 'ALERT' ? 'text-neo-purple' : 'text-neo-cyan'}`}>
                                        {n.msg}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
