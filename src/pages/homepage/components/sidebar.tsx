import SideNavitem from './sidenavitem';
import CategoryDropdown from '@/components/category-dropdown';
import { response1 } from '@/data/response1';
import { response2 } from '@/data/response2';
import { useState } from 'react';

export default function Sidebar() {
  // States
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Category Dropdown Options
  const categoriesData = response2.categories;
  const options = categoriesData
    ? Object.keys(categoriesData).map((cat) => ({
        value: cat,
        label: cat,
      }))
    : [];

  // Sidebar Nav items from response1
  const navitemsData = response1.categories;

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <div className="w-[180px] sm:w-[300px] flex-shrink-0 flex flex-col gap-3 p-4 border-r border-gray-200 h-full bg-white text-[9px] sm:text-sm">
      {/* Category Dropdown Area */}
      <CategoryDropdown options={options} />

      {/* Navigation Menu */}
      <div className="flex flex-col bg-[#F8FAFC] rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex-grow">
        {/* Homepage Header */}
        <div className="px-6 py-4 mt-2 mx-2 bg-white rounded-xl shadow-sm">
          <h2 className="font-bold text-[#1E293B]">Homepage</h2>
        </div>

        {/* Scrollable Nav List */}
        <div className="flex flex-col py-1 sm:py-4 overflow-y-auto max-h-[calc(100vh-248px)] scrollbar-hide">
          {Object.entries(navitemsData).map(([label, children]) => (
            <SideNavitem
              key={label}
              label={label}
              activeItem={activeItem}
              childrenItems={children}
              onClick={handleItemClick}
              hasGridIcon={['External Sector', 'Foreign Trade'].includes(label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
