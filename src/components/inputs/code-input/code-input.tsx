import { Component, Host, h, Prop, Event, EventEmitter, Element, Watch, State, Method } from '@stencil/core';
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
  private internalPlaceholder: string[];

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

  @Prop({ mutable: false, reflect: true }) length: number = 5;

  @Prop({ mutable: false }) validator?: RegExp = /^[0-9A-Za-z]+$/

  /**
   * Allow to parse all chars to UPPER or LOWER case
   * @default allow upper and lowercase values
   */
  @Prop() case: CodeInputCase = CodeInputCase.DEFAULT

  @State() currentValue: string;

  input!: HTMLInputElement

  // @Watch('value')
  // validateValue(newValue: string, oldValue: string) {
  //   console.log('newValue', newValue)
  //   console.log('oldValue', oldValue)

  //   console.log(this.validator.test(newValue))

  //   this.currentValue = this.validator.test(newValue) ? newValue : oldValue
  // }

  @Watch('placeholder')
  placeholderChanges() {
    this.internalPlaceholder = this.buildPlaceholder()
  }

  @Method()
  async clear(): Promise<void> {
    // TODO: implement
  }

  componentWillLoad() {
    this.defaultValue = this.value
    this.currentValue = this.value
    this.internalPlaceholder = this.buildPlaceholder()

  }

  render() {
    const Inputs = () => {
      return Array(this.length).fill(null).map((_, index) => {

        const placeholder = this.internalPlaceholder[index]
        const enableAufocus = this.autofocus && index === 0

        return (
          <input
            class="text-mono text-8x1"
            type="text"
            id={`field-${index}`}
            placeholder={placeholder ?? ""}
            autoFocus={enableAufocus}
            maxlength="1"
            onInput={(event: InputEvent) => this.inputInputHandler(event, index)}
            onFocus={event => this.inputFocusHandler(event, index)}
            onKeyDown={event => this.inputKeyDown(event, index)}
          />
        )
      })
    }

    return (
      <Host>
        <div class="wrapper">
          <Inputs />
        </div>
        {/* <div class="wrapper">
          <div class="input">
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
        </div> */}
      </Host >
    );
  }


  // ---------------
  // PRIVATE METHODS
  // ---------------
  private inputInputHandler = (event: InputEvent, index: number) => {
    if (event.data && index < (this.length - 1)) {
      const nextInput = this.getInputByIndex(index + 1)
      nextInput.focus()
    }
  }

  private inputFocusHandler = (_event: FocusEvent, index: number) => {
    const input: HTMLInputElement = this.getInputByIndex(index)
    if (input) input.select()
  }

  private inputKeyDown = (event: KeyboardEvent, index: number) => {
    console.log(event)
    const actions = {
      'Backspace': () => {
        setTimeout(() => {
          this.focusOnPreviousInput(index)
        }, 10);
      },
      'ArrowLeft': () => {
        this.focusOnPreviousInput(index, true)
      },
      'ArrowRight': () => {
        this.focusOnNextInput(index, true)
      }
    }

    // FIXME: improvement this
    const execAction = actions[event.code]
    if (execAction) execAction()

  }


  /**
   * Focus on next input field
   * @param currentIndex current input index
   * @returns input element focused
   */
  private focusOnNextInput(currentIndex: number, select = false): HTMLInputElement {
    if (currentIndex < (this.length - 1)) {
      const nextInput = this.getInputByIndex(currentIndex + 1)
      nextInput.focus()
      if (select) {
        setTimeout(() => {
          nextInput.select()
        }, 10);
      }
      return nextInput
    }
  }

  private focusOnPreviousInput(currentIndex: number, select = false): HTMLInputElement {
    if (currentIndex >= 0) {
      const previousInput = this.getInputByIndex(currentIndex - 1)
      previousInput.focus()
      if (select) {
        setTimeout(() => {
          previousInput.select()
        }, 10);
      }
      return previousInput
    }
  }

  private getInputByIndex = (index: number): HTMLInputElement => {
    return this.element.shadowRoot.querySelector(`input#field-${index}`)
  }

  private buildPlaceholder(): string[] {
    return this.placeholder.split("")
  }

  private buildDefaultValue(): string[] {
    return this.defaultValue.split("")
  }


  // private inputFocusHandler = () => {
  //   this.inputFocus.emit({
  //     element: this.input,
  //     value: this.value
  //   });
  // };

  // private inputBlurHandler = () => {
  //   this.inputBlur.emit({
  //     element: this.input,
  //     value: this.value
  //   });
  // };

  // private inputInputHandler = (e: any) => {
  //   this.value = e.target.value;
  //   this.inputInput.emit({
  //     element: this.input,
  //     value: this.value
  //   });
  // };

  // private valueChanges = () => {
  //   this.inputChanges.emit({
  //     element: this.input,
  //     value: this.value
  //   })
  // }

}
