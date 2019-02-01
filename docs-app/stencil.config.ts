import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/styles/global.css',
  outputTargets: [
    {
      type: 'www',
      dir: 'www/docs',
      baseUrl: '/docs',
      serviceWorker: null,
      empty: false,
      inlineLoaderScript: false
    }
  ],
  copy: [
    { src: 'pages/**/*.json' }
  ]
};
