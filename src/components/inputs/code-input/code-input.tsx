import { Component, Host, h, Prop, Event, EventEmitter, Element, Watch, State } from '@stencil/core';
import { defaultTheme } from '../../../defaultTheme';
import { TecnologiaTheme } from '../../interfaces';
import { CodeInputCase } from './code-input.model';

@Component({
  tag: 'tec-code-input',
  styleUrl: 'code-input.scss',
  shadow: true,
})
export class CodeInput {

  private defaultValue: string;

  @Element() element: HTMLElement;

  @Event() inputFocus: EventEmitter;

  @Event() inputBlur: EventEmitter;

  @Event() inputChanges: EventEmitter;

  @Event() inputInput: EventEmitter;

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop({ mutable: true, reflect: true }) value?: string;

  @Prop({ reflect: true }) autofocus?: boolean = true;

  @Prop({ reflect: true }) disabled?: boolean

  @Prop({ reflect: true }) placeholder?: string;

  @Prop({ reflect: true, mutable: false }) type?: "text" | "password" = "text"

  @Prop({ mutable: false, reflect: true }) length?: number = 5;

  @Prop({ mutable: false }) validator?: RegExp = /^[0-9A-Za-z]+$/

  /**
   * Allow to parse all chars to UPPER or LOWER case
   * @default allow upper and lowercase values
   */
  @Prop() case: CodeInputCase = CodeInputCase.DEFAULT

  @State() currentValue: string;

  input!: HTMLInputElement

  @Watch('value')
  validateValue(newValue: string, oldValue: string) {
    console.log('newValue', newValue)
    console.log('oldValue', oldValue)

    console.log(this.validator.test(newValue))

    this.currentValue = this.validator.test(newValue) ? newValue : oldValue
  }

  componentWillLoad() {
    this.defaultValue = this.value
    this.currentValue = this.value
  }

  render() {
    return (
      <Host>
        <div>
          <input
            class="text-mono text-8x1"
            autoFocus={this.autofocus ? true : null}
            maxLength={this.length}
            placeholder={this.placeholder || ""}
            disabled={this.disabled ? true : null}
            pattern={`${this.validator}`}
            value={this.currentValue}
            defaultValue={this.defaultValue}
            onInput={this.inputInputHandler}
            onFocus={this.inputFocusHandler}
            onBlur={this.inputBlurHandler}
            onKeyDown={this.valueChanges}
            ref={(el) => this.input = el as HTMLInputElement}
          />
        </div>
      </Host>
    );
  }


  // ---------------
  // PRIVATE METHODS
  // ---------------
  private inputFocusHandler = () => {
    this.inputFocus.emit({
      element: this.input,
      value: this.value
    });
  };

  private inputBlurHandler = () => {
    this.inputBlur.emit({
      element: this.input,
      value: this.value
    });
  };

  private inputInputHandler = (e: any) => {
    this.value = e.target.value;
    this.inputInput.emit({
      element: this.input,
      value: this.value
    });
  };

  private valueChanges = () => {
    this.inputChanges.emit({
      element: this.input,
      value: this.value
    })
  }

}
