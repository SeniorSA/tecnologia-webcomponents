import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tec-product-header',
  styleUrl: 'product-header.scss',
  shadow: true,
})
export class ProductHeader {
  render() {
    return (
      <Host>
        <header>
          <slot name="title"></slot>
        </header>
      </Host>
    );
  }
}
