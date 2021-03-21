import { newE2EPage } from '@stencil/core/testing';

describe('product-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-product-header></tec-product-header>');

    const element = await page.find('tec-product-header');
    expect(element).toHaveClass('hydrated');
  });
});
