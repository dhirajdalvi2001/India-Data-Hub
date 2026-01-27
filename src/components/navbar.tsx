import { Button } from "@heroui/button";
import { Navbar as HeroUINavbar } from "@heroui/navbar";
import { useAtom, useAtomValue } from "jotai";
import { authStateAtom } from "@/utils/global";
import logo from "@/assets/logo.webp";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const [authState, setAuthState] = useAtom(authStateAtom);

  function handleLoginLogout() {
    if (authState) {
      setAuthState(false);
    } else {
      setAuthState(true);
    }
  }

  const isLoginPage = location.pathname === "/login";

  return (
    <HeroUINavbar
      className="mx-auto h-[64px] bg-white text-primary shadow-md"
      maxWidth="xl"
      position="sticky"
    >
      <img alt="Logo" className="h-10 w-auto" src={logo} />
      {!isLoginPage && (
        <Button
          color="primary"
          className="bg-primary text-white rounded-sm"
          size="sm"
          variant="solid"
          onClick={handleLoginLogout}
        >
          {authState ? "Logout" : "Login"}
        </Button>
      )}
    </HeroUINavbar>
  );
};
