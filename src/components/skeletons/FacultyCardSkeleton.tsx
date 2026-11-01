import React from 'react';

export const FacultyCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 animate-pulse flex flex-col items-center text-center">
      {/* Avatar Circle */}
      <div className="w-28 h-28 rounded-full bg-slate-800 mb-4 ring-4 ring-slate-800/50" />

      {/* Name and Designation */}
      <div className="h-6 w-36 bg-slate-800 rounded-md mb-2" />
      <div className="h-4 w-48 bg-slate-800/70 rounded mb-2" />
      <div className="h-5 w-28 bg-slate-800/90 rounded-full mb-4" />

      {/* Bio lines */}
      <div className="w-full space-y-2 mb-6">
        <div className="h-3 w-full bg-slate-800/40 rounded" />
        <div className="h-3 w-5/6 mx-auto bg-slate-800/40 rounded" />
        <div className="h-3 w-4/6 mx-auto bg-slate-800/40 rounded" />
      </div>

      {/* Skill Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 w-full">
        <div className="h-5 w-16 bg-slate-800/70 rounded-md" />
        <div className="h-5 w-20 bg-slate-800/70 rounded-md" />
        <div className="h-5 w-14 bg-slate-800/70 rounded-md" />
      </div>
    </div>
  );
};
