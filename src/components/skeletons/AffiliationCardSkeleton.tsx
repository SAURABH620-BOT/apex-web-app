import React from 'react';

export const AffiliationCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-slate-800" />
        <div className="h-5 w-24 bg-slate-800 rounded-full" />
      </div>

      <div className="h-6 w-3/4 bg-slate-800 rounded-md" />
      <div className="h-4 w-1/2 bg-slate-800/70 rounded" />

      <div className="space-y-2 pt-2">
        <div className="h-3.5 w-full bg-slate-800/40 rounded" />
        <div className="h-3.5 w-5/6 bg-slate-800/40 rounded" />
      </div>

      <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
        <div className="h-4 w-28 bg-slate-800/60 rounded" />
        <div className="h-4 w-20 bg-slate-800/60 rounded" />
      </div>
    </div>
  );
};
