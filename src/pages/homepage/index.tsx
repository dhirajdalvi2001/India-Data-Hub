import DataTable from './components/data-table';
import Sidebar from './components/sidebar';
import { response1 } from '@/data/response1';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  return (
    <DefaultLayout childrenClassName="flex gap-0 max-w-full">
      <Sidebar />
      <DataTable data={response1.frequent as any} />
    </DefaultLayout>
  );
}
