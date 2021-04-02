import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { defaultTheme } from '../../../defaultTheme'
import { TecStringCase } from '../../../models/case.model'
import { caseStringHandler, removeStringWhiteSpace } from '../../../utils/utils'
import { TecnologiaTheme } from '../../interfaces'
import { CodeInputCustomEventValue, CodeInputEvent } from './code-input.model'

@Component({
  tag: 'tec-code-input',
  styleUrl: 'code-input.scss',
  shadow: true
})
export class CodeInput {
  private internalValue: string[];
  private internalPlaceholder: string[];

  @State() value?: string = '';

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
  @Prop() case: TecStringCase = TecStringCase.DEFAULT

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
      this.initialValue
        ? this.clearWithInitialValue()
        : this.clearWithoutInitialValue()

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
        const placeholder = this.internalPlaceholder[index] || ''
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
            value={placeholder && !value.trim() ? null : value}
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
      <Host value={this.value}>
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
    this.inputChange.emit({ event, value: currentInput.value })

    if (currentInput) {
      // handle input by case
      currentInput.value = caseStringHandler(currentInput.value, this.case)

      // build final value
      this.internalValue[index] = currentInput.value || ' '
      this.value = this.buildFinalValue()
    }

    if (event.data && index < (this.length - 1)) {
      // apply focus on next input
      const nextInput = this.getInputByIndex(index + 1)
      nextInput.focus()
    }

    this.handleCompletedEvent()
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
    if (input) input.value = caseStringHandler(input.value, this.case)
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

      this.codeChange.emit({ value: removeStringWhiteSpace(newValue) })
    }
  }

  private clearWithInitialValue (): void {
    this.initInternalValue()
    this.internalPlaceholder = this.splitPlaceholder()
    this.value = this.initialValue
  }

  private clearWithoutInitialValue (): void {
    this.value = ''
    this.initInternalValue()

    this.buildArrayIterator().forEach((_, index) => {
      const input = this.getInputByIndex(index)
      if (input) input.value = ''
    })
  }

  private handleCompletedEvent (): void {
    const shouldEmit = removeStringWhiteSpace(this.value).length === this.length

    if (shouldEmit) {
      this.completed.emit({
        value: removeStringWhiteSpace(this.value)
      })
    }
  }
}
