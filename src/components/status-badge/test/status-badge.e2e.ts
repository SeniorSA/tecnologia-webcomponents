import { newE2EPage } from '@stencil/core/testing';

describe('status-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-status-badge></tec-status-badge>');

    const element = await page.find('tec-status-badge');
    expect(element).toHaveClass('hydrated');
  });

  it('has text', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-status-badge badge-text="test"></tec-status-badge>');

    const element = await page.find('tec-status-badge >>> span');

    expect(element).toEqualText('test');
  });

  it('has not text', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-status-badge></tec-status-badge>');

    const element = await page.find('tec-status-badge >>> span');

    expect(element).toEqualText('');
  });

  describe('status', () => {
    it('primary', async () => {
      const page = await newE2EPage();
      await page.setContent('<tec-status-badge status="primary"></tec-status-badge>');

      const element = await page.find('tec-status-badge >>> span');

      expect(element).toEqualAttribute('class', 'badge-value primary')
    });
    it('secondary', async () => {
      const page = await newE2EPage();
      await page.setContent('<tec-status-badge status="secondary"></tec-status-badge>');

      const element = await page.find('tec-status-badge >>> span');

      expect(element).toEqualAttribute('class', 'badge-value secondary')
    });
    it('success', async () => {
      const page = await newE2EPage();
      await page.setContent('<tec-status-badge status="success"></tec-status-badge>');

      const element = await page.find('tec-status-badge >>> span');

      expect(element).toEqualAttribute('class', 'badge-value success')
    });
    it('danger', async () => {
      const page = await newE2EPage();
      await page.setContent('<tec-status-badge status="danger"></tec-status-badge>');

      const element = await page.find('tec-status-badge >>> span');

      expect(element).toEqualAttribute('class', 'badge-value danger')
    });
    it('warn', async () => {
      const page = await newE2EPage();
      await page.setContent('<tec-status-badge status="warn"></tec-status-badge>');

      const element = await page.find('tec-status-badge >>> span');

      expect(element).toEqualAttribute('class', 'badge-value warn')
    });
    it('info', async () => {
      const page = await newE2EPage();
      await page.setContent('<tec-status-badge status="info"></tec-status-badge>');

      const element = await page.find('tec-status-badge >>> span');

      expect(element).toEqualAttribute('class', 'badge-value info')
    });
  });
});
