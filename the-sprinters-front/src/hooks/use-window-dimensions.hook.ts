import { useEffect, useState } from 'react';

import { useMantineTheme } from '@mantine/core';

export type WindowDimensions = {
  width: number;
  height: number;
  isMobile: boolean;
};
/*
Use this hook all throughout the application to check the screen dimensions,
as the window is not defined on component load in NextJs
 */
export const useWindowDimensions = (): WindowDimensions => {
  const theme = useMantineTheme();

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 1600,
    height: 1200,
    isMobile: false,
  });

  useEffect(() => {
    function handleResize(): void {
      let screenSize: WindowDimensions;
      if (typeof window !== 'undefined') {
        screenSize = {
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: window.innerWidth <= 800,
        };
      } else {
        screenSize = {
          width: 1600,
          height: 1200,
          isMobile: false,
        };
      }

      setWindowDimensions(screenSize);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
