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
          <div class="before-text">
             <slot name="before-text"></slot>
          </div>
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
            <div class="before-text">
              <slot name="before-text"></slot>
            </div>
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

  it('should emit event when titleCursorPointer is true', () => {
    const component = new ProductHeader();
    const eventSpy = jest.spyOn(component.titleClicked, 'emit').mockImplementation();
    component.titleCursorPointer = true;

    component.handleClick();

    expect(eventSpy).toHaveBeenCalled();
  });

  it('should not emit event when titleCursorPointer is false', () => {
    const component = new ProductHeader();
    const eventSpy = jest.spyOn(component.titleClicked, 'emit').mockImplementation();
    component.titleCursorPointer = false;

    component.handleClick();

    expect(eventSpy).not.toHaveBeenCalled();
  });
});
