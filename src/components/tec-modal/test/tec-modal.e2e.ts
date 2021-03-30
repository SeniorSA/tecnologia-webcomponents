import { newE2EPage } from '@stencil/core/testing';

describe('tec-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-modal></tec-modal>');

    const element = await page.find('tec-modal');
    expect(element).toHaveClass('hydrated');
  });
});
