import React from 'react';

export const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 animate-pulse flex flex-col justify-between h-[420px]">
      <div>
        {/* Badge & Duration */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-24 bg-slate-800 rounded-full" />
          <div className="h-5 w-16 bg-slate-800 rounded-md" />
        </div>

        {/* Title */}
        <div className="h-7 w-3/4 bg-slate-800 rounded-lg mb-2" />
        <div className="h-4 w-full bg-slate-800/60 rounded mb-4" />

        {/* Description lines */}
        <div className="space-y-2 mb-6">
          <div className="h-3.5 w-full bg-slate-800/50 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-800/50 rounded" />
          <div className="h-3.5 w-4/6 bg-slate-800/50 rounded" />
        </div>

        {/* Modules/Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-6 w-20 bg-slate-800/70 rounded-md" />
          <div className="h-6 w-24 bg-slate-800/70 rounded-md" />
          <div className="h-6 w-16 bg-slate-800/70 rounded-md" />
        </div>
      </div>

      {/* Button footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="h-10 w-28 bg-slate-800 rounded-xl" />
        <div className="h-10 w-32 bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};
