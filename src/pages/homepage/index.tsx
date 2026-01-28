import Sidebar from './components/sidebar';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  return (
    <DefaultLayout childrenClassName="flex gap-0 p-0 max-w-full">
      <Sidebar />
      <div className="flex-grow p-6 bg-white overflow-y-auto h-[calc(100vh-86px)]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Economic Monitor
          </h1>
          <p className="text-gray-600">
            Select a category from the sidebar to view detailed economic data
            and trends.
          </p>
          {/* Main content will go here */}
        </div>
      </div>
    </DefaultLayout>
  );
}
