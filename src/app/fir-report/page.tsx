"use client";

import dynamic from 'next/dynamic';

const FirReport = dynamic(() => import('@/components/FirReport'), {
  ssr: false,
});

export default function FirReportPage() {
  return (
    <div className="min-h-screen bg-tg pt-20">
      <FirReport />
    </div>
  );
}
