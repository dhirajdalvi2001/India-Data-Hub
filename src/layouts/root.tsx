import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { Provider } from "../provider";
import { Preloader } from "../components/preloader";
import { authStateAtom } from "../utils/global";

export const RootLayout: React.FC = () => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const authState = useAtomValue(authStateAtom);

  // Verification is complete when authState is no longer null
  const isVerified = authState !== null;

  return (
    <Provider>
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      {isPreloaderDone && isVerified && <Outlet />}
    </Provider>
  );
};
