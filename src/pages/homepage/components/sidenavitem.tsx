import React, { useState } from 'react';
import { ChevronRight, LayoutGrid } from 'lucide-react';

type SideNavitemProps = {
  label: string;
  isActive?: boolean;
  activeItem?: string | null;
  hasGridIcon?: boolean;
  onClick?: (label: string) => void;
  childrenItems?: Record<string, any>;
  level?: number;
};

export default function SideNavitem({
  label,
  activeItem,
  hasGridIcon = false,
  onClick,
  childrenItems,
  level = 0,
}: SideNavitemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = childrenItems && Object.keys(childrenItems).length > 0;
  const isActive = activeItem === label;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    onClick?.(label);
  };

  return (
    <div className="flex flex-col">
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) =>
          (e.key === 'Enter' || e.key === ' ') && handleToggle(e as any)
        }
        className={`group flex items-center justify-between px-1. sm:px-4 py-1 sm:py-2.5 cursor-pointer transition-all duration-200 ${
          isActive
            ? 'bg-[#F0F7FF] text-[#0066FF]'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
        style={{ paddingLeft: `${level * 16 + 4}px` }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {hasChildren ? (
            <ChevronRight
              size={14}
              className={`flex-shrink-0 transition-transform duration-200 max-sm:w-4 ${
                isOpen ? 'rotate-90' : ''
              } ${isActive ? 'text-[#0066FF]' : 'text-gray-400 group-hover:text-gray-600'}`}
            />
          ) : (
            <div className="w-[14px] flex-shrink-0" /> // Spacer for alignment
          )}
          <span
            className={`text-[9px] sm:text-sm font-medium truncate ${
              isActive ? 'text-[#0066FF]' : 'text-[#475569]'
            }`}
          >
            {label}
          </span>
        </div>

        {hasGridIcon && !hasChildren && (
          <LayoutGrid
            size={14}
            className={`flex-shrink-0 ${
              isActive
                ? 'text-[#0066FF]'
                : 'text-gray-400 group-hover:text-gray-600'
            }`}
          />
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="flex flex-col">
          {Object.entries(childrenItems).map(([childLabel, childValue]) => (
            <SideNavitem
              key={childLabel}
              label={childLabel}
              activeItem={activeItem}
              childrenItems={childValue}
              level={level + 1}
              onClick={onClick}
              hasGridIcon={['External Sector', 'Foreign Trade'].includes(
                childLabel,
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
