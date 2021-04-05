import { newE2EPage } from '@stencil/core/testing';

describe('tec-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-button></tec-button>');

    const element = await page.find('tec-button');
    expect(element).toHaveClass('hydrated');
  });
});
