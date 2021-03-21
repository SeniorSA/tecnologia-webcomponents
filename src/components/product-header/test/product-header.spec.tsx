import { newSpecPage } from '@stencil/core/testing';
import { ProductHeader } from '../product-header';

describe('product-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductHeader],
      html: `<tec-product-header></tec-product-header>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-product-header sticky="" theme="light">
        <mock:shadow-root>
          <header class="sticky text-title">
            <div class="title" style="cursor: pointer"></div>

            <div class="content">
              <slot name="content"></slot>
            </div>
          </header>
        </mock:shadow-root>
      </tec-product-header>
    `);
  });

  it('disable sticky', async () => {
    const page = await newSpecPage({
      components: [ProductHeader],
      html: `
        <tec-product-header title-product="My product" sticky="false"></tec-product-header>
      `,
    });
    expect(page.root).toEqualHtml(`
      <tec-product-header sticky="false" title-product="My product" theme="light">
         <mock:shadow-root>
           <header class="false text-title">
             <div class="title" style="cursor: pointer;">
               My product
             </div>
             <div class="content">
               <slot name="content"></slot>
             </div>
           </header>
        </mock:shadow-root>
      </tec-product-header>
    `);
  });
});
