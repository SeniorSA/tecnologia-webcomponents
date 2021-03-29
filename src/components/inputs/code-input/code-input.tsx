import { Component, Host, h, Prop } from '@stencil/core';
import { defaultTheme } from '../../../defaultTheme';
import { TecnologiaTheme } from '../../interfaces';
import { CodeInputCase } from './code-input.model';

@Component({
  tag: 'tec-code-input',
  styleUrl: 'code-input.scss',
  shadow: true,
})
export class CodeInput {

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  /**
   * Allow to parse all chars to UPPER or LOWER case
   * @default allow upper and lowercase values
   */
  @Prop()
  case: CodeInputCase = CodeInputCase.DEFAULT

  @Prop({ mutable: false, reflect: true })
  length: number = 4;

  @Prop()
  accept: RegExp = /\d+/g

  @Prop()
  initialValue: string;

  render() {
    return (
      <Host>
        <div>
          <input
            class="text-mono text-8x1"
            type="text"
            maxLength={this.length}
            pattern={`${this.accept}`}
          />
        </div>
      </Host>
    );
  }

}
