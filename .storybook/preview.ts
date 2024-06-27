import type { Preview } from '@storybook/react';
import '@/assets/styles/globals.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(?:background|color)$/iu,
        date: /Date$/iu,
      },
    },
  },
};

export default preview;
