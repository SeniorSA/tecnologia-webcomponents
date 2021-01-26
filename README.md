# Tecnologia web components

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

![npm (scoped)](https://img.shields.io/npm/v/@seniorsistemas/tecnologia-webcomponents?style=flat-square) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/SeniorSA/tecnologia-webcomponents/Deploy/master?style=flat-square)  <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a Work in Progress Web components library made by [BPM Suite](https://www.senior.com.br/senior-x/bpm/) team.

## Browser Support

| Chrome | New Edge (Chromium) | Safari | Firefox | Older Edge        | IE                |
| ------ | ------------------- | ------ | ------- | ----------------- | ----------------- |
| 60+    | 79+                 | 10.1+  | 63+     | 16-18 (polyfills) | >= 11 (polyfills) |

> [See complete docs](https://stenciljs.com/docs/browser-support)


## How to install

### NPM

Install dependency:

```bash
npm i @seniorsistemas/tecnologia-webcomponents
```

And import `tecnologia-webcomponents.esm.js`:

```js
<script src="@seniorsistemas/tecnologia-webcomponents/dist/tecnologia-webcomponents/tecnologia-webcomponents.esm.js" type="module"></script>
```

For legacy projects import `tecnologia-webcomponents.js`:

```js
<script src="@seniorsistemas/tecnologia-webcomponents/dist/tecnologia-webcomponents/tecnologia-webcomponents.js" type="text/javascript"></script>
```

For use in frameworks, [see the Stencil page](https://stenciljs.com/docs/overview).

### Via CDN (release candidate)

Now you can test components in a HTML page importing via script from CDN.

#### Stable

```html
<script src="https://cdn.tecnologia.senior.com.br/platform/tecnologia-webcomponents/master/tecnologia-webcomponents/tecnologia-webcomponents.esm.js" type="module"></script>
```

For legacy projects use: 
```html
<script src="https://cdn.tecnologia.senior.com.br/platform/tecnologia-webcomponents/master/tecnologia-webcomponents/tecnologia-webcomponents.js" type="text/javascript"></script>
```

#### Release candidate (develop branch)

**(ATTENTION!! Not use for production!)**

```html
<script src="https://cdn.tecnologia.senior.com.br/platform/tecnologia-webcomponents/develop/tecnologia-webcomponents/tecnologia-webcomponents.js"></script>
```

> Other alternative is use UNPKG, for this, overwrite with the following URL: `@seniorsistemas/tecnologia-webcomponents/dist/tecnologia-webcomponents/tecnologia-webcomponents.js`

### Angular applications

```bash
npm i @seniorsistemas/tecnologia-webcomponents
```

In your `app.module.ts` declare `CUSTOM_ELEMENTS_SCHEMA`:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  // <-- import from here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]   // <-- declare this
})
export class AppModule { }
```

And in `main.ts` end of file, add following imports:

```ts
import { applyPolyfills, defineCustomElements } from '@seniorsistemas/tecnologia-webcomponents/loader';

defineCustomElements();

// for IE support (optional)
applyPolyfills().then(() => {
  defineCustomElements()
})
```

### React applications

```bash
yarn add @seniorsistemas/tecnologia-webcomponents
```

In your `src/index.js` or `src/index.tsx` (typescript project) file, add following imports preferably before of the React Render:

```js
import { applyPolyfills, defineCustomElements } from '@seniorsistemas/tecnologia-webcomponents/loader';

defineCustomElements();

// for IE support (optional)
applyPolyfills().then(() => {
  defineCustomElements()
})
```
## I want to contribute

View [contribution guide](CONTRIBUTING.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/lucasreichert3"><img src="https://avatars2.githubusercontent.com/u/39280222?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Reichert</b></sub></a><br /><a href="https://github.com/SeniorSA/tecnologia-webcomponents/commits?author=lucasreichert3" title="Code">💻</a> <a href="https://github.com/SeniorSA/tecnologia-webcomponents/commits?author=lucasreichert3" title="Tests">⚠️</a> <a href="#ideas-lucasreichert3" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://linkedin.com/in/tiagoboeing/"><img src="https://avatars2.githubusercontent.com/u/3449932?v=4" width="100px;" alt=""/><br /><sub><b>Tiago Boeing</b></sub></a><br /><a href="https://github.com/SeniorSA/tecnologia-webcomponents/commits?author=tiagoboeing" title="Code">💻</a> <a href="https://github.com/SeniorSA/tecnologia-webcomponents/commits?author=tiagoboeing" title="Tests">⚠️</a> <a href="#design-tiagoboeing" title="Design">🎨</a> <a href="https://github.com/SeniorSA/tecnologia-webcomponents/pulls?q=is%3Apr+reviewed-by%3Atiagoboeing" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-tiagoboeing" title="Project Management">📆</a> <a href="#ideas-tiagoboeing" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
