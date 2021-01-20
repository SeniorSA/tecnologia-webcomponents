import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'tecnologia-webcomponents',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'styles.css'
        },
        { src: 'assets/fontawesome/webfonts', dest: 'webfonts' },
        { src: 'assets/material/fonts/*', dest: 'webfonts' }
      ],
    },
  ],
  globalStyle: 'src/scss/global.scss',
  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/injected.scss'],
    }),
  ],
  testing: {
    collectCoverage: true,
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'],
  },
};
