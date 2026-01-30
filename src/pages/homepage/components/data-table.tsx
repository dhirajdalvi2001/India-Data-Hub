import { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Bookmark,
  Plus,
  TrendingUp,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  ShoppingCart,
  Pin,
} from 'lucide-react';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { cn } from '@heroui/theme';

export type FrequentItem = {
  id: string;
  title: string;
  cat: string;
  subCat: string;
  subset: string;
  freq: string;
  unit: string;
  src: string;
  sData: string;
  datatype: string;
  hierarchy: string[];
  db: string;
};

interface DataTableProps {
  data: FrequentItem[];
  selectedItems: Set<string>;
  onToggleSelection: (id: string) => void;
}

export default function DataTable({
  data,
  selectedItems,
  onToggleSelection,
}: DataTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Reset to first page when data changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [data]);

  const columns = useMemo<ColumnDef<FrequentItem>[]>(
    () => [
      {
        header: `New Releases (${data.length})`,
        accessorKey: 'title',
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="min-w-96 flex flex-col gap-1.5 py-2">
              <span className="text-xs sm:text-[15px] font-bold text-[#1E293B] leading-tight">
                {item.title}
              </span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-[#F0F7FF] text-[#0066FF] text-[11px] font-medium rounded-md">
                  {item.cat} / {item.subCat || item.subset || 'General'}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        header: 'Range',
        accessorKey: 'freq',
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex flex-col text-[13px] text-gray-500">
              <span className="font-medium">Jan 2011 - Apr 2024</span>
              <span>{item.freq}</span>
            </div>
          );
        },
      },
      {
        header: 'Unit',
        accessorKey: 'unit',
        cell: ({ getValue }) => (
          <span className="text-[13px] text-gray-600 font-medium">
            {getValue() as string}
          </span>
        ),
      },
      {
        header: 'Coverage',
        id: 'coverage',
        cell: ({ row }) => {
          const item = row.original;
          const codes = [item.sData, item.datatype].filter(Boolean);

          const getColors = (code: string) => {
            switch (code.toUpperCase()) {
              case 'S':
                return 'bg-pink-50 text-pink-500 border-pink-100';
              case 'R':
                return 'bg-orange-50 text-orange-500 border-orange-100';
              case 'N':
                return 'bg-blue-50 text-blue-500 border-blue-100';
              case 'D':
                return 'bg-red-50 text-red-500 border-red-100';
              default:
                return 'bg-gray-50 text-gray-500 border-gray-100';
            }
          };

          return (
            <div className="flex gap-1.5">
              {codes.map((code, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold border ${getColors(
                    code,
                  )}`}
                >
                  {code}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const isSelected = selectedItems.has(row.original.id);

          return (
            <div className="flex items-center gap-4 text-gray-400">
              <Bookmark
                className="cursor-pointer hover:text-gray-600"
                size={18}
              />
              <Button
                isIconOnly
                size="sm"
                variant={isSelected ? 'solid' : 'bordered'}
                className={cn(
                  'w-7 min-w-7 h-7 rounded-lg transition-colors border-1',
                  isSelected
                    ? '!bg-[#0066FF] !border-[#0066FF] text-white'
                    : 'bg-white border-[#0066FF] text-[#0066FF] hover:bg-blue-50',
                )}
                onClick={() => onToggleSelection(row.original.id)}
              >
                <Plus size={16} className={cn('transition-transform')} />
              </Button>
              <TrendingUp
                className="cursor-pointer hover:text-gray-600"
                size={18}
              />
              <MoreVertical
                className="cursor-pointer hover:text-gray-600"
                size={18}
              />
            </div>
          );
        },
      },
    ],
    [data.length, selectedItems],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="fixed top-24 right-3 w-[calc(100vw-220px)] sm:w-[calc(100vw-350px)] h-[calc(100vh-96px)] flex flex-col gap-2">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2 py-1">
        <div className="flex items-center gap-1 sm:gap-2 pr-2 sm:pr-4 border-r border-gray-200">
          <div className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <Search size={18} className="text-gray-500" />
          </div>
          <div className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <Bookmark size={18} className="text-gray-500" />
          </div>
          <div className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <Filter size={18} className="text-gray-500" />
          </div>
        </div>

        {selectedItems.size > 0 && (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">
              Selected <span className="font-bold">({selectedItems.size})</span>
            </span>
            <div className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <ShoppingCart size={18} className="text-gray-500" />
            </div>
            <div className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <Pin size={18} className="text-gray-500" />
            </div>
          </div>
        )}

        <Button
          color="primary"
          size="sm"
          className="bg-[#1E293B] text-white rounded-lg h-8 sm:h-9 px-3 sm:px-4 ml-1"
          startContent={<TrendingUp size={16} />}
        >
          <span className="hidden xs:inline">View Graph</span>
          <span className="xs:hidden">Graph</span>
        </Button>
      </div>

      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto overflow-y-auto flex-grow custom-scrollbar">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs sm:text-sm font-bold text-[#49046b] bg-gray-50/95 backdrop-blur-sm border-b border-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-2 py-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
            Showing{' '}
            <span className="font-semibold text-gray-700">
              {pagination.pageIndex * pagination.pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-gray-700">
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                data.length,
              )}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-700">{data.length}</span>{' '}
            results
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">
              Rows per page:
            </span>
            <Select
              size="sm"
              aria-label="Rows per page"
              className="w-16 sm:w-20"
              classNames={{
                trigger:
                  'h-8 min-h-8 border-none bg-transparent hover:bg-gray-100',
                value: 'text-[11px] sm:text-xs font-medium',
              }}
              selectedKeys={[pagination.pageSize.toString()]}
              onChange={(e) => {
                const newSize = Number(e.target.value);

                setPagination((prev) => ({
                  ...prev,
                  pageSize: newSize,
                  pageIndex: 0,
                }));
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size.toString()} textValue={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsLeft size={20} />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="flex gap-1">
            {(() => {
              const totalPages = table.getPageCount();
              const currentPage = pagination.pageIndex;
              const maxVisible = 5;

              let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
              let end = Math.min(totalPages, start + maxVisible);

              if (end - start < maxVisible && start > 0) {
                start = Math.max(0, end - maxVisible);
              }

              return Array.from(
                { length: end - start },
                (_, i) => start + i,
              ).map((pageIdx) => (
                <Button
                  key={pageIdx}
                  size="sm"
                  variant={pagination.pageIndex === pageIdx ? 'solid' : 'light'}
                  color={
                    pagination.pageIndex === pageIdx ? 'primary' : 'default'
                  }
                  className={`min-w-8 h-8 ${
                    pagination.pageIndex === pageIdx
                      ? 'text-white'
                      : 'text-gray-600'
                  }`}
                  onClick={() => table.setPageIndex(pageIdx)}
                >
                  {pageIdx + 1}
                </Button>
              ));
            })()}
          </div>

          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </Button>

          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
