import SideNavitem from './sidenavitem';
import CategoryDropdown from '@/components/category-dropdown';
import { response1 } from '@/data/response1';
import { response2 } from '@/data/response2';
import { useState } from 'react';

export default function Sidebar() {
// States
const [activeItem, setActiveItem] = useState<string | null>(null)

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
  const navitemOptions = navitemsData
    ? Object.keys(navitemsData).map((cat) => ({
        value: cat,
        label: cat,
      }))
    : [];

  return (
    <div className="w-[300px] flex flex-col gap-6 p-4 border-r border-gray-200">
      {/* Category Dropdown Area */}
      <div className="flex flex-col gap-2">
        <CategoryDropdown options={options} />
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col bg-[#F8FAFC] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0,05)] overflow-hidden border border-gray-100">
        {/* Homepage Header */}
        <div className="px-6 py-4 mt-2 mx-2 bg-white rounded-xl">
          <h2 className="font-bold text-[#1E293B]">Homepage</h2>
        </div>

        {/* Scrollable Nav List */}
        <div className="flex flex-col py-4 overflow-y-auto max-h-[calc(100vh-280px)]">
          {navitemOptions.map((item) => (
            <SideNavitem
              key={item.value}
              label={item.label}
              isActive={item.value === activeItem} // Example active state
              hasGridIcon={['External Sector', 'Foreign Trade'].includes(
                item.label,
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
