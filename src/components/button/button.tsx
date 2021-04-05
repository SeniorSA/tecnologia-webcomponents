import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { TecnologiaTheme } from '../interfaces';
import { defaultTheme } from '../../defaultTheme';
import { TecStatus } from '../../models/status.model';
import { TecButtonColor, TecButtonIconMode, TecButtonMode, TecButtonSize } from './button.model';

@Component({
  tag: 'tec-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class TecButton {
  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  /**
   * Emitted when button is clicked
   * Captured by onClick listener.
   * > Note: if button was disabled event can't be dispatch
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  clicked: EventEmitter<UIEvent>;

  /**
   * Optional ID to be attached on button
   */
  @Prop({ attribute: 'buttonId', mutable: false, reflect: true })
  buttonId: string;

  /**
   * Text to show inside button
   */
  @Prop({ mutable: true })
  label!: string;

  /**
   * The status of button (color)
   */
  @Prop({ mutable: true })
  status: TecStatus = TecStatus.primary;

  /**
   * Mode of button (like square or rounded)
   */
  @Prop({ mutable: true })
  mode: TecButtonMode = TecButtonMode.rounded;

  /**
   * Colors of button (like gradient)
   */
  @Prop({ mutable: true })
  color: TecButtonColor = TecButtonColor.solid;

  /**
   * Size of button
   */
  @Prop({ mutable: true })
  size: TecButtonSize = TecButtonSize.small;

  /**
   * Boolean to indicate if button is disabled
   */
  @Prop({ attribute: 'disabled', mutable: true })
  disabled: boolean = false;

  /**
   * If `true` button use `width: 100%`
   */
  @Prop({ reflect: true })
  fullWidth = false;

  /**
   * If `true` button removes label
   */
  @Prop({ attribute: 'onlyIcon' })
  onlyIcon = false;

  /**
   * Position of icon
   */
  @Prop({ attribute: 'iconMode' })
  iconMode: TecButtonIconMode = TecButtonIconMode.left;

  /**
   * Icon class from FontAwesome 5 Free
   * Allows to use: brands, regular, solid
   * Example: 'far fa-paper-plane'
   */

  @Prop()
  icon: string;

  /**
   * Add a loading indicator to button
   * You need add a manual control to remove loading
   */

  componentDidLoad() {
    if (this.onlyIcon && !this.icon) {
      throw new Error(`When 'onlyIcon' property is enabled a 'icon' should be passed!`);
    }
  }

  handleEventClick = (event: MouseEvent): void => {
    if (!this.isDisabled) this.clicked.emit(event);
  };

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  @Prop({ mutable: true, reflect: true })
  loading = false;

  render() {
    const classList = {
      [this.color]: true,
      [this.mode]: true,
      [this.status]: true,
      'disabled': this.isDisabled,
      'responsive': this.fullWidth,
      'text-sans': true,
      'text-base': true,
    };

    const iconClasses = {
      'reverse': !!this.icon && this.iconMode === TecButtonIconMode.right,
      'no-margins': this.onlyIcon,
    };

    return (
      <Host>
        <button type="button" id={this.buttonId} class={classList} disabled={this.isDisabled} onClick={this.handleEventClick}>
          <span class={iconClasses}>
            {!!this.icon && <i class={this.icon}></i>}
            {!this.onlyIcon && this.label}
          </span>
        </button>
      </Host>
    );
  }
}
