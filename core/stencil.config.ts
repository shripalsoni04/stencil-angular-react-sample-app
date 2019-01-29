import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-component-lib',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' }
  ],
  plugins: [
    sass()
  ]
};
