import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

const platform = process.platform

export const config: Config = {
  namespace: 'tecnologia-webcomponents',
  taskQueue: 'async',
  buildEs5: 'prod',
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'styles.css'
        },
        { src: 'assets/fontawesome/webfonts', dest: 'webfonts' },
        {
          src: '../node_modules/@seniorsistemas/tecnologia-design-tokens',
          dest: '@seniorsistemas/tecnologia-design-tokens'
        }
      ]
    }
  ],
  globalStyle: 'src/scss/global.scss',
  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/injected.scss']
    })
  ],
  testing: {
    browserExecutablePath:
      platform === 'darwin' ? '/Applications/Chromium.app/Contents/MacOS/Chromium' : null,
    collectCoverage: true,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']
  }
}
