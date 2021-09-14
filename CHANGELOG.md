# Release notes

## Unreleased

### Feature

- Created `status-badge` component.
## 0.9.0

### Feature

- Added `slot` before the title on `product-header` component.

## 0.8.0

### Feature

- Added `footerAlign` property to `tec-modal` component.

## 0.7.2

### Quality

- Implemented tests in all components.

## 0.7.1

### Fixes

- Fixed code input when is mobile.
- Fixed code input value not changes when unselect input and the cursor is active.

## 0.7.0

### Feature

- Added `responsive` property to `code-input` component.

## 0.6.1

### Fixes

- Fixed url to use package with `unpkg.com`.
- Prevent `bottom-bar` to force the page to add scroll. (Removed `block` from `:host`)

### Dependencies

- Add `fsevents` on optional dependencies.

## 0.6.0

### Features

- Created `code-input` component to use on two-factor authentication and others.

### Fixes

- Rename `tec-button` files to `button`. _Keeped compatibility with tag name._
- Removed Storybook from production dependencies

### Development

- Added ESLint + Prettier configs to enforce a style guide.
- Allow to run Puppeteer tests on Macbook (OSX). Check by `darwin` with `process.platform`.
- Added VSCode configs to run and debug tests on IDE.

## 0.5.1

### Fixes

- Fix modal close icon position

## 0.5.0

### Features

- Created `modal` component.

### Fixes

- Set `reflect: true` on button component.

## 0.4.1

### Fixes

- Add import for `ButtonPosition` property in `components.d.ts`.

## 0.4.0

### Features

- Created `bottom-bar` component.
- Created `tec-button` component.

### Fixes

- Fix `tec-button` default size.

### Dependencies

- `"@stencil/core": "^2.5.1"`

## 0.3.0

### Features

- Created `product-header` component.

## 0.2.2

### Fixes

- Resolve Storybook build issue.

## 0.2.1

### Features

- Add conditional CDN deploy.
- Add deploy step only on `master` branch.

## 0.2.0

### Features

- Add auxiliary classes to components structure.

### Dependencies

- Added `tecnologia-design-tokens@^0.2.1`

## 0.1.0-1

### Features

- Optimize GitHub Actions to use `artifacts` and multiples `steps`.

### Dependencies

- Updated to `@stencil/core: ^2.4.0`

## 0.1.0-0

### Features

- Created styles architecture to work with multiple themes.
- Support to FontAwesome icons

### Fixes

- Moved `style-dictionary` to new package
- Updated: `browserslist@latest`
- Fix `font-family`
