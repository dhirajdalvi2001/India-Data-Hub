import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthGuard } from './components/auth-guard';
import { RootLayout } from './layouts/root';
import IndexPage from '@/pages/homepage/index';
import LoginPage from '@/pages/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            index: true,
            element: <IndexPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
