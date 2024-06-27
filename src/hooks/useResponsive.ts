import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { BREAKPOINT } from '@/constants/breakpoint';

type MediaType = {
  isClient: boolean;
  isSp: boolean;
};

/**
 * SP / PC を出し分けるカスタムフック
 */
export const useResponsive = (): MediaType => {
  const [isClient, setIsClient] = useState(false);

  const isSp = useMediaQuery({ query: `(max-width: ${BREAKPOINT}px)` });

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return {
    isClient,
    isSp: isClient && isSp,
  };
};
