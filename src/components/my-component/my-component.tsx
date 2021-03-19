import { Component, Prop, h } from '@stencil/core';
import { defaultTheme } from '../../defaultTheme';
import { format } from '../../utils/utils';
import { TecnologiaTheme } from '../interfaces';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  render() {
    return <h1 class="bg-primary text-title text-3x1">Hello, World!</h1>;
  }
}
