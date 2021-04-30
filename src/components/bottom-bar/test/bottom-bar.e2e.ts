import { newE2EPage } from '@stencil/core/testing';

describe('bottom-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-bottom-bar></tec-bottom-bar>');

    const element = await page.find('tec-bottom-bar');
    expect(element).toHaveClass('hydrated');
  });

  describe('properties/attributes', () => {
    describe('theme', () => {
      it('light', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar');
        expect(element).toEqualAttribute('theme', 'light');
      });

      it('dark', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar theme="dark"></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar');
        expect(element).toEqualAttribute('theme', 'dark');
      });
    });

    describe('text', () => {
      it('has text', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar text="test"></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar >>> .text');
        const text = await page.find('tec-bottom-bar >>> .text >>> span');
        const wrapper = await page.find('tec-bottom-bar >>> .wrapper');

        expect(element).toBeDefined()
        expect(text).toEqualText('test')
        expect(wrapper).not.toHaveClass('flex-align-center')
      });

      it('has not text', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar >>> .text');
        const text = await page.find('tec-bottom-bar >>> .text >>> span');
        const wrapper = await page.find('tec-bottom-bar >>> .wrapper');

        expect(element).toBeNull()
        expect(text).toBeNull()
        expect(wrapper).toHaveClass('flex-align-center')
      });
    });

    describe('buttonPosition', () => {
      it('buttonPosition left', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar text="test"></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar');


        expect(element.shadowRoot.querySelector('.wrapper').getAttribute('style')).toBe('flex-direction: row-reverse;');
        expect(element.shadowRoot.querySelector('.text').getAttribute('style')).toBe('margin: 0px 0px 0px 20px;');
      });

      it('buttonPosition right', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar text="test" button-position="right"></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar');


        expect(element.shadowRoot.querySelector('.wrapper').getAttribute('style')).toBe('flex-direction: row;');
        expect(element.shadowRoot.querySelector('.text').getAttribute('style')).toBe('margin: 0px 20px 0px 0px;');
      });
    });

    describe('useAnimation', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar >>> .container');

        expect(element).toHaveClass('use-animation')
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-bottom-bar use-animation="false"></tec-bottom-bar>');

        const element = await page.find('tec-bottom-bar >>> .container');

        expect(element).not.toHaveClass('use-animation')
      });
    });

  })

});
