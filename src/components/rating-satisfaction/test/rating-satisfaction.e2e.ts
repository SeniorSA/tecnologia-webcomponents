import { newE2EPage } from '@stencil/core/testing';

describe('rating-satisfaction', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rating-satisfaction></rating-satisfaction>');

    const element = await page.find('rating-satisfaction');
    expect(element).toHaveClass('hydrated');
  });
});
