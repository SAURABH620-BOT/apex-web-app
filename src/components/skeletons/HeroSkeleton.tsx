import React from 'react';

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-[580px] w-full rounded-3xl bg-slate-900/70 border border-slate-800 animate-pulse overflow-hidden p-8 sm:p-14 flex flex-col justify-center">
      {/* Badge */}
      <div className="h-7 w-48 bg-slate-800 rounded-full mb-6" />

      {/* Main Title Heading lines */}
      <div className="h-12 w-4/5 sm:w-2/3 bg-slate-800 rounded-xl mb-4" />
      <div className="h-12 w-3/5 sm:w-1/2 bg-slate-800/80 rounded-xl mb-6" />

      {/* Paragraph lines */}
      <div className="space-y-2.5 max-w-2xl mb-8">
        <div className="h-4 w-full bg-slate-800/50 rounded" />
        <div className="h-4 w-5/6 bg-slate-800/50 rounded" />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="h-12 w-36 bg-slate-800 rounded-xl" />
        <div className="h-12 w-40 bg-slate-800/70 rounded-xl" />
      </div>

      {/* Bottom stats row */}
      <div className="pt-8 border-t border-slate-800/80 flex items-center gap-8">
        <div className="space-y-1">
          <div className="h-6 w-16 bg-slate-800 rounded" />
          <div className="h-3 w-24 bg-slate-800/60 rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-6 w-16 bg-slate-800 rounded" />
          <div className="h-3 w-24 bg-slate-800/60 rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-6 w-16 bg-slate-800 rounded" />
          <div className="h-3 w-24 bg-slate-800/60 rounded" />
        </div>
      </div>
    </div>
  );
};
