import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'tec-product-header',
  styleUrl: 'product-header.scss',
  shadow: true,
})
export class ProductHeader {
  @Prop({ mutable: true, reflect: true })
  sticky = false;

  render() {
    return (
      <Host>
        <header class={this.sticky && 'sticky'}>
          <slot name="title"></slot>
          <slot name="content"></slot>
        </header>
      </Host>
    );
  }
}
