import React from 'react';
import { ChevronRight, LayoutGrid } from 'lucide-react';

type SideNavitemProps = {
  label: string;
  isActive?: boolean;
  hasGridIcon?: boolean;
  onClick?: () => void;
};

export default function SideNavitem({
  label,
  isActive = false,
  hasGridIcon = false,
  onClick,
}: SideNavitemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      className={`group flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 ${
        isActive ? 'bg-[#F0F7FF] text-[#0066FF]' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <ChevronRight
          size={16}
          className={`transition-transform duration-200 ${
            isActive
              ? 'rotate-90 text-[#0066FF]'
              : 'text-gray-400 group-hover:text-gray-600'
          }`}
        />
        <span
          className={`text-sm font-medium ${
            isActive ? 'text-[#0066FF]' : 'text-[#334155]'
          }`}
        >
          {label}
        </span>
      </div>

      {hasGridIcon && (
        <LayoutGrid
          size={16}
          className={`${
            isActive ? 'text-[#0066FF]' : 'text-gray-400 group-hover:text-gray-600'
          }`}
        />
      )}
    </div>
  );
}
