import { newSpecPage } from '@stencil/core/testing';
import { ProductHeader } from '../product-header';

describe('product-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductHeader],
      html: `<tec-product-header></tec-product-header>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-product-header>
        <mock:shadow-root>
          <header>
            <slot name="title"></slot>
          </header>
        </mock:shadow-root>
      </tec-product-header>
    `);
  });
});
