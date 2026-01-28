import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Provider } from "./provider";

import { AuthGuard } from "./components/auth-guard";
import IndexPage from "@/pages/homepage/index";
import LoginPage from "@/pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider>
        <Outlet />
      </Provider>
    ),
    children: [
      {
        path: "login",
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
