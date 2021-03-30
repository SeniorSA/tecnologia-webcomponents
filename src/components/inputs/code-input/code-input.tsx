import { Component, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { defaultTheme } from '../../../defaultTheme';
import { TecnologiaTheme } from '../../interfaces';
import { CodeInputCase } from './code-input.model';

@Component({
  tag: 'tec-code-input',
  styleUrl: 'code-input.scss',
  shadow: true,
})
export class CodeInput {

  @Element() element: HTMLElement;

  @Event() inputFocus: EventEmitter;

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop({ mutable: true, reflect: true }) value?: string = "";

  @Prop() autofocus?: boolean = true;

  @Prop({ mutable: true, reflect: true }) disabled?: boolean

  @Prop() placeholder?: string;

  @Prop({ reflect: true, mutable: false }) type?: "text" | "password" = "text"

  /**
   * Allow to parse all chars to UPPER or LOWER case
   * @default allow upper and lowercase values
   */
  @Prop() case: CodeInputCase = CodeInputCase.DEFAULT

  @Prop({ mutable: false, reflect: true }) length?: number = 5;

  @Prop() accept?: RegExp = /[0-9A-Za-z]+/g

  input!: HTMLInputElement

  render() {
    return (
      <Host>
        <div>
          <input
            class="text-mono text-8x1"
            onFocus={this.inputFocusHandler}
            disabled={this.disabled ? true : null}
            autoFocus={this.autofocus ? true : null}
            ref={(el) => this.input = el as HTMLInputElement}
            maxLength={this.length}
            pattern={`${this.accept}`}
            onKeyDown={this.valueChanges}
            value={this.value}
            placeholder={this.placeholder}
          />
        </div>
      </Host>
    );
  }


  // ---------------
  // PRIVATE METHODS
  // ---------------
  private inputFocusHandler = (_e: FocusEvent) => {
    this.inputFocus.emit({
      element: this.input,
      value: this.value
    });
  };


  private valueChanges = (event) => {
    if (this.accept.test(event.target.value)) {
      console.log('regex válido')
      this.input = event
    } else {
      this.element.innerHTML = 'inválido'
    }
  }

}
