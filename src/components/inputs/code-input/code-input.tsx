import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, Watch } from '@stencil/core'
import { defaultTheme } from '../../../defaultTheme'
import { removeStringWhiteSpace } from '../../../utils/utils'
import { TecnologiaTheme } from '../../interfaces'
import { CodeInputCase, CodeInputCustomEventValue, CodeInputEvent } from './code-input.model'

@Component({
  tag: 'tec-code-input',
  styleUrl: 'code-input.scss',
  shadow: true
})
export class CodeInput {
  private internalValue: string[];
  private internalPlaceholder: string[];

  @Element() element: HTMLElement;

  // Events for each input
  @Event() inputChange: EventEmitter<CodeInputEvent<string>>;
  @Event() inputFocus: EventEmitter<CodeInputEvent<CodeInputCustomEventValue>>;
  @Event() inputBlur: EventEmitter<CodeInputEvent<CodeInputCustomEventValue>>;

  // Events for wrapper (triggered for any input)
  /**
   * When `value` property changes
   */
  @Event() codeChange: EventEmitter<CodeInputEvent<string>>;
  @Event() codeFocus: EventEmitter<void>;
  @Event() codeBlur: EventEmitter<void>;
  @Event() completed: EventEmitter<CodeInputEvent<string>>

  /**
   * Emitted when the input was cleared
   */
  @Event() cleared: EventEmitter<void>;

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop({ mutable: true }) initialValue?: string = '';

  @Prop({ reflect: true }) placeholder?: string = '';

  @Prop({ reflect: true }) disabled?: boolean

  /**
   * Observer current value from component
   * > Note: don't use for set a initial value
   * @readonly value
   */
  @Prop({ mutable: true, reflect: true }) value?: string = '';

  /**
   * Auto focus on first input
   */
  @Prop({ reflect: true }) autofocus?: boolean = true;

  /**
   * Type of inputs
   */
  @Prop({ mutable: false, reflect: true }) type?: 'text' | 'password' = 'text'

  /**
   * Inputs quantity
   */
  @Prop({ mutable: false, reflect: true }) length: number = 5;

  /**
   * Add margin between inputs
   */
  @Prop({ mutable: false }) useMargin: boolean = true

  /**
   * Allow to parse all chars to UPPER or LOWER case
   * @default allow upper and lowercase values
   */
  @Prop() case: CodeInputCase = CodeInputCase.DEFAULT

  /**
   * Remove white spaces from value on events
   * @example if false the returned value
   * will be the same input order, like: `0   2`
   * @returns when false: `' 0 A 2'`
   * @return when true: `'0A2'`
   */
  @Prop({ mutable: false, attribute: 'event-remove-spaces' })
  removeWhiteSpacesOnEvents = false;

  @Watch('value')
  valueChanges (newValue: string, oldValue: string) {
    if (newValue && newValue !== oldValue) {
      this.valueChangesHandler(newValue)
    }
  }

  @Watch('placeholder')
  placeholderChanges () {
    this.internalPlaceholder = this.splitPlaceholder()
  }

  @Method()
  async clear (): Promise<void> {
    if (this.length) {
      this.value = ''
      this.initInternalValue()

      this.buildArrayIterator().forEach((_, index) => {
        const input = this.getInputByIndex(index)
        if (input) input.value = ''
      })

      this.codeChange.emit({ value: '' })
      this.cleared.emit()
    }
  }

  componentWillLoad () {
    this.initInternalValue()
    this.internalPlaceholder = this.splitPlaceholder()
    this.value = this.initialValue
  }

  render () {
    const Inputs = ({ useMargin = true }) => {
      const classList = {
        'text-mono text-8x1': true,
        'use-margin': useMargin
      }

      return this.buildArrayIterator().map((_, index) => {
        const placeholder = this.internalPlaceholder[index]
        const enableAufocus = this.autofocus && index === 0
        const value = this.internalValue[index]

        return (
          <input
            class={classList}
            autoComplete="false"
            autoCapitalize="false"
            maxlength="1"
            id={`field-${index}`}
            type={this.type}
            placeholder={placeholder}
            value={value}
            autoFocus={enableAufocus}
            disabled={this.disabled ?? null}
            onInput={(event: InputEvent) => this.inputInputHandler(event, index)}
            onFocus={event => this.inputFocusHandler(event, index)}
            onBlur={event => this.inputBlurHandler(event, index)}
            onKeyDown={event => this.inputKeyDown(event, index)}
            onKeyUp={event => this.inputKeyupHandler(event, index)}
          />
        )
      })
    }

    return (
      <Host>
        <div class="wrapper">
          <Inputs useMargin={this.useMargin} />
        </div>
      </Host >
    )
  }

  // ---------------
  // PRIVATE METHODS
  // ---------------

  private buildFinalValue (): string {
    const value = this.internalValue.join('')
    if (value?.length) return value
    return ''
  }

  private initInternalValue (): void {
    this.internalValue = this.splitInitialValue()
  }

  private inputInputHandler (event: InputEvent, index: number) {
    const currentInput = this.getInputByIndex(index)
    if (currentInput) {
      // handle input by case
      currentInput.value = this.caseHandler(currentInput.value)

      // build final value
      this.internalValue[index] = currentInput.value || ' '
      this.value = this.buildFinalValue()
    }

    // apply focus on next input
    if (event.data && index < (this.length - 1)) {
      const nextInput = this.getInputByIndex(index + 1)
      nextInput.focus()
    } else {
      // the input was completed
      this.completed.emit({ value: this.handleRemoveWhiteSpacesProp(this.value) })
    }

    this.inputChange.emit({ event, value: currentInput.value })
  }

  private inputFocusHandler (event: FocusEvent, index: number) {
    const input: HTMLInputElement = this.getInputByIndex(index)
    if (input) {
      input.select()

      this.inputFocus.emit({
        event,
        value: {
          id: input.id,
          index,
          value: input.value
        }
      })
    }

    this.codeFocus.emit()
  }

  private inputKeyupHandler (_event: KeyboardEvent, index: number) {
    const input: HTMLInputElement = this.getInputByIndex(index)
    if (input) input.value = this.caseHandler(input.value)
  }

  private inputKeyDown (event: KeyboardEvent, index: number): void {
    const actions = {
      Backspace: () => {
        setTimeout(() => {
          this.focusOnPreviousInput(index)
        }, 10)
      },
      ArrowLeft: () => {
        this.focusOnPreviousInput(index)
      },
      ArrowRight: () => {
        this.focusOnNextInput(index)
      }
    }

    const execAction = actions[event.code]
    if (execAction) execAction()
  }

  private inputBlurHandler (event: FocusEvent, index: number): void {
    const input = this.getInputByIndex(index)
    this.inputBlur.emit({
      event,
      value: {
        id: input?.id,
        index,
        value: input?.value
      }
    })

    this.codeBlur.emit()
  }

  /**
   * Focus and select a input on index
   * @param currentIndex current input index
   * @param select select all content from input
   * @returns input element focused and selected
   */
  inputFocusAndSelect (index: number, select = false): HTMLInputElement {
    const input = this.getInputByIndex(index)
    if (input) {
      input.focus()
      if (select) {
        setTimeout(() => {
          input.select()
        }, 10)
      }
    }
    return input
  }

  private getInputByIndex (index: number): HTMLInputElement {
    return this.element.shadowRoot.querySelector(`input#field-${index}`)
  }

  private focusOnNextInput (currentIndex: number): HTMLInputElement {
    if (currentIndex < (this.length - 1)) {
      return this.inputFocusAndSelect(currentIndex + 1, true)
    }
  }

  private focusOnPreviousInput (currentIndex: number): HTMLInputElement {
    if (currentIndex >= 0) {
      return this.inputFocusAndSelect(currentIndex - 1, true)
    }
  }

  private buildArrayIterator (length = this.length): any[] {
    return Array(length).fill(null)
  }

  private splitPlaceholder (): string[] {
    return this.placeholder.split('')
  }

  private splitInitialValue (): string[] {
    const valueSplitted = this.initialValue.split('')
    return this.buildArrayIterator().map((_, index) => valueSplitted[index] ?? ' ')
  }

  private valueChangesHandler (newValue: string): void {
    const valueSplitted = newValue.split('')
    if (valueSplitted) {
      this.buildArrayIterator().forEach((_, index) => {
        const currentValue = valueSplitted[index]
        const input = this.getInputByIndex(index)

        if (input && currentValue) {
          input.value = currentValue
        }
      })

      this.codeChange.emit({ value: this.handleRemoveWhiteSpacesProp(newValue) })
    }
  }

  private handleRemoveWhiteSpacesProp (value: string): string {
    return this.removeWhiteSpacesOnEvents ? removeStringWhiteSpace(value) : value
  }

  private caseHandler (value: string): string {
    if (this.case === CodeInputCase.LOWERCASE) return value.toLowerCase()
    if (this.case === CodeInputCase.UPPERCASE) return value.toUpperCase()
    return value
  }
}
