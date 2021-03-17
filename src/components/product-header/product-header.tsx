import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'tec-product-header',
  styleUrl: 'product-header.scss',
  shadow: true,
})
export class ProductHeader {
  /**
   * The product name
   */
  @Prop({ mutable: false })
  title: string;

  /**
   * Set `false` to remove `cursor: pointer` from title
   * @default true
   */
  @Prop({ mutable: false })
  titleCursorPointer = true;

  /**
   * Use to make a bar fixed on top
   * @default false
   */
  @Prop({ mutable: true, reflect: true })
  sticky = false;

  /**
   * Emitted when the title was clicked
   * @returns void
   */
  @Event({ bubbles: true, composed: true })
  titleClicked: EventEmitter<void>;

  render() {
    return (
      <Host>
        <header class={this.sticky && 'sticky'}>
          <div class="title" style={{ cursor: this.titleCursorPointer && 'pointer' }} onClick={() => this.titleClicked.emit()}>
            {this.title}
          </div>

          <div class="content">
            <slot name="content"></slot>
          </div>
        </header>
      </Host>
    );
  }
}
