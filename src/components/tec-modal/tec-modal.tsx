import { Component, Host, h, Prop, Event, EventEmitter, Element, Watch, State } from '@stencil/core';
import { defaultTheme } from '../../defaultTheme';
import { TecnologiaTheme } from '../interfaces';
import { TecButtonSize } from '../tec-button/tec-button.model';

@Component({
  tag: 'tec-modal',
  styleUrl: 'tec-modal.scss',
  shadow: true,
})
export class TecModal {
  private clickWasInside = false;
  private hasFooterContent = false;
  @State() private openedAuxiliary = false;

  @Element() hostElement: HTMLElement;

  @Event({
    bubbles: true,
    composed: true,
  })
  hidden: EventEmitter<UIEvent>;

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop({ attribute: 'opened', mutable: true })
  opened = false;

  @Prop({ attribute: 'modalTitle', mutable: true })
  modalTitle: string;

  @Prop({ attribute: 'showCloseIcon', mutable: true })
  showCloseIcon = true;

  @Prop({ attribute: 'backDrop' })
  backDrop = true;

  @Prop({ attribute: 'size', mutable: true })
  size = TecButtonSize.small;

  @Prop({ attribute: 'fullWidth', mutable: true })
  fullWidth = false;

  @Prop({ attribute: 'closeOnEscape' })
  closeOnEscape = true;

  @Watch('opened')
  watchOpened(newValue: boolean) {
    if (!newValue) {
      setTimeout(() => {
        this.openedAuxiliary = false;
      }, 400);
    } else {
      this.openedAuxiliary = true;
    }
  }

  handleClick(event) {
    if (!this.clickWasInside && this.backDrop) this.closeModal(event);

    this.clickWasInside = false
  }

  closeModal(event?: MouseEvent) {
    this.opened = false;
    this.hidden.emit(event);
  }

  componentWillLoad() {
    this.openedAuxiliary = this.opened;
    if (this.closeOnEscape)
      document.addEventListener('keydown', event => {
        if (this.opened && event.key === 'Escape') this.closeModal();
      });
  }

  render() {
    this.hasFooterContent = !!this.hostElement.querySelector('[slot="footer"]');

    return (
      this.openedAuxiliary && (
        <Host>
          <div class={`modal ${this.opened && 'show-background'} ${!this.opened && 'remove-background'}`} onClick={(event) => this.handleClick(event)}>
            <div
              class={`modal-content ${this.fullWidth && 'full-width'} ${this.opened && 'open-animation'} ${!this.opened && 'close-animation'}`}
              onClick={() => this.clickWasInside = true}
            >
              <div class="modal-title text-title">
                <h1>{this.modalTitle}</h1>
                {this.showCloseIcon && (
                  <span class="close" onClick={event => this.closeModal(event)}>
                    &times;
                  </span>
                )}
              </div>

              <div class="content">
                <slot name="content"></slot>
              </div>

              {this.hasFooterContent && (
                <div class="footer">
                  <slot name="footer"></slot>
                </div>
              )}
            </div>
          </div>
        </Host>
      )
    );
  }
}
