import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  className?: string;
  showText?: boolean;
}

export const VerificationBadge: React.FC<Props> = ({ className = '', showText = true }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 ${className}`}
      title="College ID Verified Student/Faculty"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
      {showText && <span>ID Verified</span>}
    </span>
  );
};
