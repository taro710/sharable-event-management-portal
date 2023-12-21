import { useMediaQuery } from 'react-responsive';

import { BREAKPOINT } from '@/constants/breakpoint';
// import { useIsomorphicLayoutEffect } from 'src/hooks/useIsomorphicLayoutEffect';

type MediaType = {
  isSp: boolean;
};

/**
 * SP / PC を出し分けるカスタムフック
 */
export const useResponsive = (): MediaType => {
  const isSp = useMediaQuery({ query: `(max-width: ${BREAKPOINT}px)` });

  return {
    isSp,
  };
};
