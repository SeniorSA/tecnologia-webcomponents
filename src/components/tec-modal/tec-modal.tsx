import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
  State,
} from '@stencil/core';
import { defaultTheme } from '../../defaultTheme';
import { TecSize } from '../../models/size.model';
import { TecnologiaTheme } from '../interfaces';

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

  @Event({ bubbles: true, composed: true })
  hidden: EventEmitter<UIEvent>;

  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop({ mutable: true })
  opened = false;

  @Prop({ mutable: true })
  modalTitle: string;

  @Prop({ mutable: true })
  showCloseIcon = true;

  @Prop()
  dismissOnBackdrop = true;

  @Prop({ mutable: true })
  size: TecSize = TecSize.small;

  @Prop({ mutable: true })
  fullWidth = false;

  @Prop()
  closeOnEscape = true;

  @Prop()
  blockBodyScroll = true;

  @Prop()
  responsive = true;

  @Watch('opened')
  watchOpened(newValue: boolean) {
    if (!newValue) {
      setTimeout(() => {
        this.openedAuxiliary = false;
      }, 200);
    } else {
      this.handleParentOverflow();
      this.openedAuxiliary = true;
    }
  }

  handleClick(event) {
    if (!this.clickWasInside && this.dismissOnBackdrop) this.closeModal(event);

    this.clickWasInside = false;
  }

  closeModal(event?: MouseEvent) {
    this.opened = false;
    this.handleParentOverflow();
    this.hidden.emit(event);
  }

  componentWillLoad() {
    this.hasFooterContent = !!this.hostElement.querySelector('[slot="footer"]');
    if (this.opened) this.handleParentOverflow();
    this.openedAuxiliary = this.opened;
    if (this.closeOnEscape)
      document.addEventListener('keydown', event => {
        if (this.opened && event.key === 'Escape') this.closeModal();
      });
  }

  handleParentOverflow() {
    const property = this.opened && this.blockBodyScroll ? 'hidden' : 'inherit';
    this.hostElement.parentElement.style.overflow = property;
  }

  render() {
    return (
      this.openedAuxiliary && (
        <Host>
          <div
            class={`modal ${this.opened && 'show-background'} ${
              !this.opened && 'remove-background'
            }`}
            onClick={event => this.handleClick(event)}
          >
            <div
              class={`modal-content ${this.fullWidth && 'full-width'} ${
                this.opened && 'open-animation'
              } ${!this.opened && 'close-animation'} ${this.responsive && 'responsive'}`}
              onClick={() => (this.clickWasInside = true)}
            >
              <div class="modal-title text-title">
                <h1 class="text-2x1">{this.modalTitle}</h1>
                {this.showCloseIcon && (
                  <div class="close-container" onClick={event => this.closeModal(event)}>
                    <span class="close">
                      &times;
                    </span>
                  </div>
                )}
              </div>

              <div class="content">
                <slot name="content"></slot>
              </div>

              {this.hasFooterContent && (
                <div class="footer">
                  <div class="footer-content">
                    <slot name="footer"></slot>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Host>
      )
    );
  }
}
