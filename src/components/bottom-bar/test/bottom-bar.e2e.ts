import { newE2EPage } from '@stencil/core/testing';

describe('bottom-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-bottom-bar></tec-bottom-bar>');

    const element = await page.find('tec-bottom-bar');
    expect(element).toHaveClass('hydrated');
  });
});
