import { newE2EPage } from '@stencil/core/testing';

describe('tec-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-modal></tec-modal>');

    const element = await page.find('tec-modal');
    expect(element).toHaveClass('hydrated');
  });

  describe('properties/attributes', () => {
    describe('theme', () => {
      it('light', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('theme', 'light');
      });

      it('dark', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal theme="dark"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('theme', 'dark');
      });
    });

    describe('opened', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal');
        const modalDiv = element.shadowRoot.querySelector('.modal');
        expect(modalDiv).toBeDefined();
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened="false"></tec-modal>');

        const element = await page.find('tec-modal');
        const modalDiv = element.shadowRoot.querySelector('.modal');
        expect(modalDiv).toBeNull();
      });
    });

    describe('modalTitle', () => {
      it('has modalTitle', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened modal-title="Test"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element.shadowRoot.querySelector('.modal-title h1').textContent).toEqual(
          'Test',
        );
      });

      it('has not modalTitle', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element.shadowRoot.querySelector('.modal-title h1').textContent).toEqual(
          '',
        );
      });
    });

    describe('showCLoseIcon', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element.shadowRoot.querySelector('.close-container')).toBeDefined();
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened show-close-icon="false"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element.shadowRoot.querySelector('.close-container')).toBeNull();
      });
    });

    describe('size', () => {
      it('tiny', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened size="tiny"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('size', 'tiny');
      });
      it('small', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened size="small"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('size', 'small');
      });

      it('medium', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened size="medium"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('size', 'medium');
      });

      it('large', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened size="large"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('size', 'large');
      });

      it('giant', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened size="giant"></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element).toEqualAttribute('size', 'giant');
      });
    });

    describe('fullWidth', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened full-width></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element.shadowRoot.querySelector('.full-width')).toBeDefined();
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal');
        expect(element.shadowRoot.querySelector('.full-width')).toBeNull();
      });
    });

    describe('closeOnEscape', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal');
        const event = await element.spyOnEvent('hidden');

        await element.press('a');
        expect(event).not.toHaveReceivedEvent();

        await element.press('Escape');
        expect(event).toHaveReceivedEvent();
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened close-on-escape="false"></tec-modal>');

        const element = await page.find('tec-modal');
        const event = await element.spyOnEvent('hidden');
        await element.press('Escape');

        expect(event).not.toHaveReceivedEvent();
      });
    });

    describe('responsive', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal >>> .responsive');
        expect(element).toBeDefined();
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-modal opened responsive="false"></tec-modal>');

        const element = await page.find('tec-modal >>> .responsive');
        expect(element).toBeNull();
      });
    });

  });

  describe('footer', () => {
    it('has footer', async() => {
      const page = await newE2EPage();
        await page.setContent('<tec-modal opened><span slot="footer">Footer</span></tec-modal>');

        const element = await page.find('tec-modal >>> .footer');

        expect(element).toBeDefined()
    })

    it('has not footer', async() => {
      const page = await newE2EPage();
        await page.setContent('<tec-modal opened></tec-modal>');

        const element = await page.find('tec-modal >>> .footer');

        expect(element).toBeNull()
    })
  })

});
