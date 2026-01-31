import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import { Provider } from '../provider';
import { Preloader } from '../components/preloader';

export const RootLayout: React.FC = () => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <Provider>
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      {isPreloaderDone && <Outlet />}
    </Provider>
  );
};
