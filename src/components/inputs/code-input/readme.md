# tec-code-input

> Note: the recommendation is recover final value using events, like `completed`, but if you using `value` attribute from DOM, keep in mind: `value` attribute can contain white spaces ` 0  244`, this represent as we seen on screen.

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                     | Type                                                                          | Default                 |
| -------------- | --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------- |
| `autofocus`    | `autofocus`     | Auto focus on first input                       | `boolean`                                                                     | `true`                  |
| `case`         | `case`          | Allow to parse all chars to UPPER or LOWER case | `TecStringCase.DEFAULT \| TecStringCase.LOWERCASE \| TecStringCase.UPPERCASE` | `TecStringCase.DEFAULT` |
| `disabled`     | `disabled`      |                                                 | `boolean`                                                                     | `undefined`             |
| `initialValue` | `initial-value` |                                                 | `string`                                                                      | `''`                    |
| `length`       | `length`        | Inputs quantity                                 | `number`                                                                      | `5`                     |
| `placeholder`  | `placeholder`   |                                                 | `string`                                                                      | `''`                    |
| `theme`        | `theme`         |                                                 | `TecnologiaTheme.dark \| TecnologiaTheme.light`                               | `defaultTheme`          |
| `type`         | `type`          | Type of inputs                                  | `"password" \| "text"`                                                        | `'text'`                |
| `useMargin`    | `use-margin`    | Add margin between inputs                       | `boolean`                                                                     | `true`                  |


## Events

| Event         | Description                        | Type                                                     |
| ------------- | ---------------------------------- | -------------------------------------------------------- |
| `cleared`     | Emitted when the input was cleared | `CustomEvent<void>`                                      |
| `codeBlur`    |                                    | `CustomEvent<void>`                                      |
| `codeChange`  | When `value` property changes      | `CustomEvent<CodeInputEvent<string>>`                    |
| `codeFocus`   |                                    | `CustomEvent<void>`                                      |
| `completed`   |                                    | `CustomEvent<CodeInputEvent<string>>`                    |
| `inputBlur`   |                                    | `CustomEvent<CodeInputEvent<CodeInputCustomEventValue>>` |
| `inputChange` |                                    | `CustomEvent<CodeInputEvent<string>>`                    |
| `inputFocus`  |                                    | `CustomEvent<CodeInputEvent<CodeInputCustomEventValue>>` |

## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
