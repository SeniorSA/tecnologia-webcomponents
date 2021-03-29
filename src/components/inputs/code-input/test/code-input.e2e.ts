import { newE2EPage } from '@stencil/core/testing';

describe('code-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<code-input></code-input>');

    const element = await page.find('code-input');
    expect(element).toHaveClass('hydrated');
  });
});
