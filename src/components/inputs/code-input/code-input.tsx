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

  private internalValue: string[];
  private internalPlaceholder: string[];

  @Element() element: HTMLElement;

  @Event() inputFocus: EventEmitter;

  @Event() inputBlur: EventEmitter;

  @Event() inputChanges: EventEmitter;

  @Event() inputInput: EventEmitter;

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop({ mutable: true }) initialValue: string;

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
    this.currentValue = this.value
    this.internalValue = this.buildDefaultValue()
    this.internalPlaceholder = this.buildPlaceholder()
    this.value = this.initialValue
  }

  render() {
    const Inputs = () => {
      return Array(this.length).fill(null).map((_, index) => {

        const placeholder = this.internalPlaceholder[index]
        const enableAufocus = this.autofocus && index === 0
        const value = this.internalValue[index]

        return (
          <input
            class="text-mono text-8x1"
            type="text"
            id={`field-${index}`}
            placeholder={placeholder ?? ""}
            value={value ?? ""}
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
      </Host >
    );
  }

  // ---------------
  // PRIVATE METHODS
  // ---------------
  private inputInputHandler = (event: InputEvent, index: number) => {
    console.log(event)

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
    const actions = {
      'Backspace': () => {
        setTimeout(() => {
          this.focusOnPreviousInput(index)
        }, 10);
      },
      'ArrowLeft': () => {
        this.focusOnPreviousInput(index)
      },
      'ArrowRight': () => {
        this.focusOnNextInput(index)
      }
    }

    const execAction = actions[event.code]
    if (execAction) execAction()
  }

  /**
   * Focus and select a input on index
   * @param currentIndex current input index
   * @param select select all content from input
   * @returns input element focused and selected
   */
  inputFocusAndSelect(index: number, select = false): HTMLInputElement {
    const input = this.getInputByIndex(index)
    if (input) {
      input.focus()
      if (select) {
        setTimeout(() => {
          input.select()
        }, 10);
      }
    }
    return input
  }

  private focusOnNextInput(currentIndex: number): HTMLInputElement {
    if (currentIndex < (this.length - 1)) {
      return this.inputFocusAndSelect(currentIndex + 1, true)
    }
  }

  private focusOnPreviousInput(currentIndex: number): HTMLInputElement {
    if (currentIndex >= 0) {
      return this.inputFocusAndSelect(currentIndex - 1, true)
    }
  }

  private getInputByIndex = (index: number): HTMLInputElement => {
    return this.element.shadowRoot.querySelector(`input#field-${index}`)
  }

  private buildPlaceholder(): string[] {
    return this.placeholder.split("")
  }

  private buildDefaultValue(): string[] {
    return this.initialValue.split("")
  }

}
