import React from 'react';

export const InquiryFormSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 animate-pulse space-y-5">
      <div className="h-7 w-48 bg-slate-800 rounded-lg mb-2" />
      <div className="h-4 w-72 bg-slate-800/60 rounded mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3.5 w-20 bg-slate-800/80 rounded" />
          <div className="h-10 w-full bg-slate-800 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-20 bg-slate-800/80 rounded" />
          <div className="h-10 w-full bg-slate-800 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3.5 w-24 bg-slate-800/80 rounded" />
          <div className="h-10 w-full bg-slate-800 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-28 bg-slate-800/80 rounded" />
          <div className="h-10 w-full bg-slate-800 rounded-xl" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3.5 w-32 bg-slate-800/80 rounded" />
        <div className="h-24 w-full bg-slate-800 rounded-xl" />
      </div>

      <div className="h-12 w-full bg-slate-800 rounded-xl mt-4" />
    </div>
  );
};
