import { useMemo, useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@heroui/button';

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
}

export default function DataTable({ data }: DataTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<ColumnDef<FrequentItem>[]>(
    () => [
      {
        header: `New Releases (${data.length})`,
        accessorKey: 'title',
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="min-w-96 flex flex-col gap-1.5 py-2">
              <span className="text-[15px] font-bold text-[#1E293B] leading-tight">
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
        cell: () => (
          <div className="flex items-center gap-4 text-gray-400">
            <Bookmark className="cursor-pointer hover:text-gray-600" size={18} />
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#0066FF] text-white cursor-pointer hover:bg-blue-700 transition-colors">
              <Plus size={16} />
            </div>
            <TrendingUp
              className="cursor-pointer hover:text-gray-600"
              size={18}
            />
            <MoreVertical
              className="cursor-pointer hover:text-gray-600"
              size={18}
            />
          </div>
        ),
      },
    ],
    [data.length],
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
    <div className="fixed top-24 right-3 w-[calc(100vw-350px)] h-[calc(100vh-96px)] flex flex-col">
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto overflow-y-auto flex-grow custom-scrollbar">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-bold text-[#49046b] bg-gray-50/95 backdrop-blur-sm border-b border-gray-100"
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
      <div className="flex items-center justify-between px-2 py-2">
        <div className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-medium">
            {pagination.pageIndex * pagination.pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              data.length,
            )}
          </span>{' '}
          of <span className="font-medium">{data.length}</span> results
        </div>

        <div className="flex items-center gap-2">
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
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant={pagination.pageIndex === i ? 'solid' : 'light'}
                color={pagination.pageIndex === i ? 'primary' : 'default'}
                className={`min-w-8 h-8 ${pagination.pageIndex === i ? 'text-white' : 'text-gray-600'}`}
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </Button>
            ))}
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
        </div>
      </div>
    </div>
  );
}
