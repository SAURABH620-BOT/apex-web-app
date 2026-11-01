import React from 'react';

export const CertificateSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border-4 border-slate-800 rounded-3xl p-8 sm:p-12 animate-pulse space-y-6">
      {/* Header crest */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-slate-800" />
        <div className="h-8 w-72 bg-slate-800 rounded-lg" />
        <div className="h-4 w-96 bg-slate-800/60 rounded" />
      </div>

      <div className="h-px w-full bg-slate-800 my-6" />

      {/* Certificate body */}
      <div className="space-y-4 text-center max-w-xl mx-auto">
        <div className="h-4 w-48 bg-slate-800/60 rounded mx-auto" />
        <div className="h-10 w-80 bg-slate-800 rounded-xl mx-auto" />
        <div className="h-4 w-full bg-slate-800/40 rounded" />
        <div className="h-6 w-64 bg-slate-800/90 rounded mx-auto" />
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
        <div className="h-12 bg-slate-800/50 rounded-xl" />
        <div className="h-12 bg-slate-800/50 rounded-xl" />
        <div className="h-12 bg-slate-800/50 rounded-xl" />
        <div className="h-12 bg-slate-800/50 rounded-xl" />
      </div>

      {/* Signatures */}
      <div className="flex justify-between items-end pt-12">
        <div className="h-14 w-32 bg-slate-800 rounded" />
        <div className="w-20 h-20 bg-slate-800 rounded-lg" />
        <div className="h-14 w-32 bg-slate-800 rounded" />
      </div>
    </div>
  );
};
