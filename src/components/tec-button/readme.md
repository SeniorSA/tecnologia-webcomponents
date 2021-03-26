# tec-button



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute   | Description                                                                                            | Type                                                                                                                    | Default                  |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `buttonId`           | `buttonid`  | Optional ID to be attached on button                                                                   | `string`                                                                                                                | `undefined`              |
| `color`              | `color`     | Colors of button (like gradient)                                                                       | `TecButtonColor.basic \| TecButtonColor.gradient \| TecButtonColor.outline \| TecButtonColor.solid`                     | `TecButtonColor.solid`   |
| `disabled`           | `disabled`  | Boolean to indicate if button is disabled                                                              | `boolean`                                                                                                               | `false`                  |
| `fullWidth`          | `fullwidth` | If `true` button use `width: 100%`                                                                     | `boolean`                                                                                                               | `false`                  |
| `icon`               | `icon`      | Icon class from FontAwesome 5 Free Allows to use: brands, regular, solid Example: 'far fa-paper-plane' | `string`                                                                                                                | `undefined`              |
| `iconMode`           | `iconmode`  | Position of icon                                                                                       | `TecButtonIconMode.left \| TecButtonIconMode.right`                                                                     | `TecButtonIconMode.left` |
| `label` _(required)_ | `label`     | Text to show inside button                                                                             | `string`                                                                                                                | `undefined`              |
| `loading`            | `loading`   |                                                                                                        | `boolean`                                                                                                               | `false`                  |
| `mode`               | `mode`      | Mode of button (like square or rounded)                                                                | `TecButtonMode.radius \| TecButtonMode.rounded \| TecButtonMode.square`                                                 | `TecButtonMode.rounded`  |
| `onlyIcon`           | `onlyicon`  | If `true` button removes label                                                                         | `boolean`                                                                                                               | `false`                  |
| `size`               | `size`      | Size of button                                                                                         | `TecButtonSize.giant \| TecButtonSize.large \| TecButtonSize.medium \| TecButtonSize.small \| TecButtonSize.tiny`       | `TecButtonSize.small`    |
| `status`             | `status`    | The status of button (color)                                                                           | `TecStatus.danger \| TecStatus.info \| TecStatus.primary \| TecStatus.secondary \| TecStatus.success \| TecStatus.warn` | `TecStatus.primary`      |
| `theme`              | `theme`     |                                                                                                        | `TecnologiaTheme.dark \| TecnologiaTheme.light`                                                                         | `defaultTheme`           |


## Events

| Event     | Description                                                                                                         | Type                   |
| --------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `clicked` | Emitted when button is clicked Captured by onClick listener. > Note: if button was disabled event can't be dispatch | `CustomEvent<UIEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
