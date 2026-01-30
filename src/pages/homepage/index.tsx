import { useState } from 'react';
import DataTable from './components/data-table';
import Sidebar from './components/sidebar';
import { response1 } from '@/data/response1';
import DefaultLayout from '@/layouts/default';
import { response2 } from '@/data/response2';

export default function IndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const getTableData = () => {
    if (selectedCategory === 'IMF') return response2.frequent;

    return response1.frequent;
  };

  const data = getTableData();

  return (
    <DefaultLayout childrenClassName="flex gap-0 max-w-full">
      <Sidebar onCategoryChange={handleCategoryChange} />
      <DataTable
        data={data as any}
        selectedItems={selectedItems}
        onToggleSelection={toggleSelection}
      />
    </DefaultLayout>
  );
}
