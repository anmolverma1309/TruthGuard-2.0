"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, MapPin, FileText, CheckCircle, ArrowRight, ArrowLeft, Phone, ExternalLink, Download, Trash2, Info, Navigation, Zap, Globe } from 'lucide-react';
import { HELPLINES, ONLINE_SERVICES, CITY_COORDS, STATIONS_DB, STATES } from '@/data/firData';
import FlagIcon from './FlagIcon';
import { jsPDF } from 'jspdf';
import { useLanguage } from '@/context/LanguageContext';

// --- Utils ---
const toRad = (d: number) => (d * Math.PI) / 180;
const haversine = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const findNearest = (lat: number, lng: number, n = 3) => {
  return STATIONS_DB.map((s) => ({ ...s, distance_km: haversine(lat, lng, s.lat, s.lng) }))
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, n);
};

// --- Main Component ---
export default function FirReport() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState({ cb1: false, cb2: false });
  const [profile, setProfile] = useState({ name: '', mobile: '', email: '', incident: '' });
  const [location, setLocation] = useState({ city: '', state: '', pincode: '', lat: 0, lng: 0 });
  const [nearestStations, setNearestStations] = useState<any[]>([]);
  const [cityMatches, setCityMatches] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // City Autocomplete
  useEffect(() => {
    if (location.city.length >= 2) {
      const q = location.city.toLowerCase();
      const matches = Object.keys(CITY_COORDS).filter(c => c.toLowerCase().includes(q)).slice(0, 5);
      setCityMatches(matches.map(m => m.charAt(0).toUpperCase() + m.slice(1)));
    } else {
      setCityMatches([]);
    }
  }, [location.city]);

  if (!mounted) return null;

  // Stepper handling
  const steps = [
    { n: 1, label: t('consent'), icon: Shield },
    { n: 2, label: t('profile'), icon: User },
    { n: 3, label: t('location'), icon: MapPin },
    { n: 4, label: t('results'), icon: Navigation },
    { n: 5, label: t('guide'), icon: FileText },
  ];

  const selectCity = (cityName: string) => {
    const key = cityName.toLowerCase();
    const match = CITY_COORDS[key];
    if (match) {
      setLocation(prev => ({ ...prev, city: cityName, state: match.state, lat: match.lat, lng: match.lng }));
      setCityMatches([]);
    }
  };

  const processLocation = () => {
    if (!location.city) return;
    const stations = findNearest(location.lat || 28.6139, location.lng || 77.2090);
    setNearestStations(stations);
    setStep(4);
    setShowSummary(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(0, 180, 216); // Neo Cyan
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('TRUTHGUARD X — FIR ASSISTANCE REPORT', 20, 13);
    
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    
    doc.setFontSize(12);
    doc.text('COMPLAINANT DETAILS:', 20, 45);
    doc.setFontSize(10);
    doc.text(`Name: ${profile.name}`, 20, 55);
    doc.text(`Incident: ${profile.incident}`, 20, 62);
    doc.text(`Location: ${location.city}, ${location.state}`, 20, 69);

    doc.setFontSize(12);
    doc.text('NEAREST POLICE STATIONS:', 20, 85);
    nearestStations.forEach((s, i) => {
      const y = 95 + i * 25;
      doc.setFontSize(10);
      doc.text(`${i + 1}. ${s.name} (${s.distance_km.toFixed(1)} km)`, 20, y);
      doc.text(`Address: ${s.address}`, 20, y + 6);
      doc.text(`Phone: ${s.phone[0]}`, 20, y + 12);
    });

    const filename = `TruthGuard_FIR_Report_${profile.name.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  };

  const clearData = () => {
    if (window.confirm('Clear all data from this session?')) {
      setStep(1);
      setConsent({ cb1: false, cb2: false });
      setProfile({ name: '', mobile: '', email: '', incident: '' });
      setLocation({ city: '', state: '', pincode: '', lat: 0, lng: 0 });
      setNearestStations([]);
      setShowSummary(false);
    }
  };

  return (
    <div className="flex-1 p-8 lg:p-12 relative flex flex-col items-center min-h-screen">
      {/* Background decorations removed - handled by RootLayout */}

      {/* Compact Corner Flag */}
      <div className="absolute top-8 right-8 z-20">
          <FlagIcon className="w-12 h-8 opacity-100 brightness-150 shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
      </div>

      {/* Streamlined Header */}
      <div className="w-full max-w-4xl mb-10 text-center md:text-left flex items-center gap-6">
          <div className="p-4 rounded-full bg-neo-cyan/10 text-neo-cyan">
              <Shield className="w-10 h-10" />
          </div>
          <div>
              <h1 className="text-3xl md:text-5xl font-black text-white neo-text-glow tracking-tight uppercase">
                  FIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-purple">ASSISTANCE</span>
              </h1>
              <p className="text-neo-text-secondary text-sm font-light mt-1 uppercase tracking-widest hidden md:block">
                  {t('bharat_edition')} • LEGAL GUIDANCE PROTOCOL
              </p>
          </div>
      </div>

      {/* Stepper with Dynamic Progress Bar */}
      <div className="w-full max-w-4xl mb-12 relative px-8">
        {/* The "Not Static" Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -z-10" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-neo-cyan via-white to-neo-purple shadow-[0_0_25px_rgba(0,229,255,0.7)] -z-10 transition-all duration-1000 ease-in-out overflow-hidden" 
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[barShine_1.5s_infinite]" />
        </div>
        
        <div className="flex justify-between items-center">
            {steps.map((s) => (
            <div 
                key={s.n}
                onClick={() => s.n < step && setStep(s.n)}
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer z-10 ${
                step === s.n ? 'bg-neo-bg border-neo-cyan text-neo-cyan shadow-[0_0_25px_rgba(0,229,255,0.5)] scale-110' :
                step > s.n ? 'bg-neo-cyan border-neo-cyan text-neo-bg' : 'bg-neo-bg border-white/10 text-neo-text-secondary'
                }`}
            >
                {step > s.n ? <CheckCircle className="w-7 h-7" /> : <s.icon className="w-6 h-6" />}
            </div>
            ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col items-center gap-16 pb-20">
        <section className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl mb-8 flex items-center justify-between px-4 text-xs font-mono">
              <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">0{step}. {steps[step-1].label}</h2>
          </div>

          <div className="w-full max-w-4xl neo-glass rounded-[40px] p-12 border border-white/10 relative overflow-hidden group min-h-[400px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neo-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            
            {step === 1 && (
              <div key="1" className="h-full flex flex-col fade-in">
                <h3 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                  <Shield className="w-8 h-8 text-orange-500" />
                  {t('privacy_consent')}
                </h3>
                <div className="flex-1 space-y-8">
                  <p className="text-neo-text-secondary leading-relaxed bg-white/5 p-6 rounded-3xl border border-white/5 italic">
                    "I understand that TruthGuard X provides procedural guidance and is not a law firm. This system helps me find official resources for reporting cyber and offline crimes in the Republic of India."
                  </p>
                  <div className="grid gap-4">
                      <label className="flex items-start gap-4 p-5 rounded-3xl border border-white/5 hover:border-neo-cyan/20 transition-all cursor-pointer group/item">
                        <input type="checkbox" checked={consent.cb1} onChange={(e) => setConsent(prev => ({ ...prev, cb1: e.target.checked }))} className="mt-1 w-6 h-6 rounded border-white/10 bg-white/5 text-neo-cyan" />
                        <div>
                          <span className="text-white font-bold block mb-1">Local Processing Consent</span>
                          <p className="text-xs text-neo-text-secondary">I consent to providing my location to find nearby stations.</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-4 p-5 rounded-3xl border border-white/5 hover:border-neo-purple/20 transition-all cursor-pointer group/item">
                        <input type="checkbox" checked={consent.cb2} onChange={(e) => setConsent(prev => ({ ...prev, cb2: e.target.checked }))} className="mt-1 w-6 h-6 rounded border-white/10 bg-white/5 text-neo-purple" />
                        <div>
                          <span className="text-white font-bold block mb-1">Procedural Awareness</span>
                          <p className="text-xs text-neo-text-secondary">I understand this is a guide and not an actual FIR filing.</p>
                        </div>
                      </label>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={!consent.cb1 || !consent.cb2}
                  className="w-full mt-10 bg-gradient-to-r from-neo-cyan to-neo-purple text-white font-bold py-6 rounded-[24px] shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:shadow-[0_0_50px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2"
                >
                  {t('accept_continue')} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div key="2" className="fade-in">
                 <h3 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                  <User className="w-8 h-8 text-neo-cyan" />
                  {t('profile')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest pl-1">Full Name</label>
                    <input value={profile.name} onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neo-cyan/50 outline-none transition-all" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest pl-1">Contact Reference</label>
                      <input value={profile.mobile} onChange={(e) => setProfile(prev => ({ ...prev, mobile: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neo-cyan/50 outline-none transition-all" placeholder="+91" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest pl-1">Incident Vector</label>
                      <select value={profile.incident} onChange={(e) => setProfile(prev => ({ ...prev, incident: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neo-cyan/50 outline-none transition-all appearance-none cursor-pointer">
                          <option value="" className="bg-neo-bg">Select incident type...</option>
                          <option className="bg-neo-bg">Cyber Fraud / Online Scam</option>
                          <option className="bg-neo-bg">Deepfake Abuse / Image Misuse</option>
                          <option className="bg-neo-bg">Harassment / Stalking</option>
                          <option className="bg-neo-bg">Other</option>
                      </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-3xl transition-all uppercase tracking-widest text-xs">{t('go_back')}</button>
                  <button disabled={!profile.name || !profile.incident} onClick={() => setStep(3)} className="flex-[2] bg-neo-cyan text-neo-bg font-black py-4 rounded-3xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">{t('next_step')}</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div key="3" className="fade-in">
                 <h3 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-neo-purple" />
                  {t('location')}
                </h3>
                <div className="space-y-8 mb-10">
                  <div className="relative">
                      <label className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest pl-1 block mb-2">City Identification</label>
                      <input value={location.city} onChange={(e) => setLocation(prev => ({ ...prev, city: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neo-purple/50 outline-none transition-all" placeholder="Type city name..." />
                      {cityMatches.length > 0 && (
                          <div className="absolute top-[calc(100%+8px)] left-0 w-full neo-glass rounded-2xl border border-white/10 overflow-hidden z-20 shadow-2xl">
                              {cityMatches.map(city => <div key={city} onClick={() => selectCity(city)} className="px-6 py-4 text-xs hover:bg-neo-purple/10 cursor-pointer border-b border-white/5 last:border-0">{city}</div>)}
                          </div>
                      )}
                  </div>
                  <div>
                      <label className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest pl-1 block mb-2">State Jurisdiction</label>
                      <select value={location.state} onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-neo-purple/50 outline-none transition-all appearance-none cursor-pointer">
                          <option value="" className="bg-neo-bg">Select state...</option>
                          {STATES.map(s => <option key={s} value={s} className="bg-neo-bg">{s}</option>)}
                      </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-3xl transition-all uppercase tracking-widest text-xs">{t('go_back')}</button>
                  <button disabled={!location.city || !location.state} onClick={processLocation} className="flex-[2] bg-neo-purple text-white font-black py-4 rounded-3xl shadow-[0_0_30px_rgba(191,90,242,0.2)] hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">{t('locate_stations')}</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div key="4" className="space-y-8 fade-in">
                  <div className="p-6 rounded-3xl bg-neo-cyan/5 border border-neo-cyan/20 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-neo-cyan/10 flex items-center justify-center text-neo-cyan"><User className="w-6 h-6" /></div>
                          <div>
                              <div className="text-white font-bold">{profile.name}</div>
                              <div className="text-[10px] text-neo-text-secondary font-mono tracking-widest">{location.city}, {location.state}</div>
                          </div>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neo-cyan uppercase tracking-tighter">{profile.incident}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nearestStations.map((s, i) => (
                          <div key={s.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-neo-cyan/30 transition-all group/s">
                              <div className="flex justify-between items-start mb-4">
                                  <span className="text-[9px] font-mono text-neo-cyan">{s.distance_km.toFixed(1)} KM</span>
                                  <div className="flex gap-2 opacity-0 group-hover/s:opacity-100 transition-opacity">
                                      <a href={`tel:${s.phone[0]}`} className="p-2 rounded-lg bg-white/5 text-neo-cyan hover:bg-neo-cyan hover:text-neo-bg transition-colors"><Phone className="w-3 h-3" /></a>
                                      <a href={`https://maps.google.com/?q=${s.lat},${s.lng}`} target="_blank" className="p-2 rounded-lg bg-white/5 text-neo-cyan hover:bg-neo-cyan hover:text-neo-bg transition-colors"><Navigation className="w-3 h-3" /></a>
                                  </div>
                              </div>
                              <h4 className="font-bold text-white mb-1">{s.name}</h4>
                              <p className="text-[10px] text-neo-text-secondary line-clamp-2">{s.address}</p>
                          </div>
                      ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button onClick={downloadPDF} className="flex-1 py-4 rounded-3xl border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 hover:bg-white/5 transition-all"><Download className="w-4 h-4" /> {t('download_report')}</button>
                      <button onClick={() => setStep(5)} className="flex-1 py-4 rounded-3xl bg-neo-cyan text-neo-bg font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">{t('guide')}</button>
                  </div>
              </div>
            )}

            {step === 5 && (
              <div key="5" className="space-y-6 fade-in">
                  <h3 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-400" />
                    {t('guide')}
                  </h3>
                  <div className="space-y-3">
                      {[
                          { t: 'Evidence Gathering', d: 'Collect Aadhar, screenshots, URLs, transaction logs, and witness statements.' },
                          { t: 'Jurisdiction', d: 'Visit the nearest station identified in the results. For cyber crimes, use cybercrime.gov.in.' },
                          { t: 'Lodge vs Complaint', d: 'Clearly state that you want to file an First Information Report (FIR), not just a general complaint.' },
                          { t: 'Free Copy', d: 'Under Section 154 CrPC, you are entitled to a free copy of the FIR. Ensure you receive it.' },
                          { t: 'Refusal Procedure', d: 'If police refuse, approach the SP or use Section 156(3) CrPC via a Magistrate.' },
                      ].map((item, i) => (
                          <div key={i} className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-neo-cyan/20 transition-all">
                              <span className="text-xl font-black text-neo-cyan/20 font-mono">0{i+1}</span>
                              <div>
                                  <h4 className="text-white font-bold text-sm mb-0.5">{item.t}</h4>
                                  <p className="text-[10px] text-neo-text-secondary">{item.d}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                      <button onClick={clearData} className="p-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                      <button onClick={() => window.location.href = '/dashboard'} className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">Dashboard <ArrowRight className="w-4 h-4"/></button>
                  </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
