import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { authStateAtom } from "@/utils/global";

export function AuthGuard() {
  const authState = useAtomValue(authStateAtom);

  if (!authState) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
