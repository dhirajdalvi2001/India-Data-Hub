import { Button } from "@heroui/button";
import { Navbar as HeroUINavbar } from "@heroui/navbar";
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { authStateAtom } from "@/utils/global";
import logo from '@/assets/logo.webp';

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
      className="mx-auto h-[64px] fixed top-0 bg-white text-primary shadow-md"
      position="sticky"
      maxWidth="2xl"
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
          {authState ? 'Logout' : 'Login'}
        </Button>
      )}
    </HeroUINavbar>
  );
};
