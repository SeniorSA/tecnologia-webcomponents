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

  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
