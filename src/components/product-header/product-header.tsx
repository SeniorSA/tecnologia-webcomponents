import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { defaultTheme } from '../../defaultTheme';
import { TecnologiaTheme } from '../interfaces';

@Component({
  tag: 'tec-product-header',
  styleUrl: 'product-header.scss',
  shadow: true,
})
export class ProductHeader {
  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  /**
   * The product name
   */
  @Prop({ mutable: false })
  titleProduct: string;

  /**
   * Set `false` to remove `cursor: pointer` from title
   * @summary when `false` this property disable `titleClicked` event.
   * @default true
   */
  @Prop({ mutable: false })
  titleCursorPointer = true;

  /**
   * Use to make a bar fixed on top
   * @default true
   */
  @Prop({ mutable: true, reflect: true })
  sticky = true;

  /**
   * Emitted when the title was clicked
   * @returns void
   */
  @Event({ bubbles: true, composed: true, eventName: 'title-clicked' })
  titleClicked: EventEmitter<void>;

  handleClick = () => {
    if (this.titleCursorPointer) this.titleClicked.emit()
  }

  render() {
    return (
      <Host>
        <header class={`text-title ${this.sticky && 'sticky'}`}>
          <div class="before-text">
            <slot name="before-text"></slot>
          </div>
          <div
            class="title"
            style={{ cursor: this.titleCursorPointer && 'pointer' }}
            onClick={this.handleClick}
          >
            {this.titleProduct}
          </div>

          <div class="content">
            <slot name="content"></slot>
          </div>
        </header>
      </Host>
    );
  }
}
