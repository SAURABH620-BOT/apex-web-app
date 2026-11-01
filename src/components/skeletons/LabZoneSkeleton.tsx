import React from 'react';

export const LabZoneSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-56 bg-slate-800" />

      {/* Content area */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="h-5 w-24 bg-slate-800 rounded-full" />
          <div className="h-4 w-16 bg-slate-800/60 rounded" />
        </div>

        <div className="h-6 w-3/4 bg-slate-800 rounded mb-3" />
        <div className="space-y-2 mb-4">
          <div className="h-3.5 w-full bg-slate-800/50 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-800/50 rounded" />
        </div>

        {/* Specs list */}
        <div className="space-y-2 pt-3 border-t border-slate-800">
          <div className="h-3.5 w-2/3 bg-slate-800/70 rounded" />
          <div className="h-3.5 w-1/2 bg-slate-800/70 rounded" />
        </div>
      </div>
    </div>
  );
};
