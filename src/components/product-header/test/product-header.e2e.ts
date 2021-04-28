import { newE2EPage } from '@stencil/core/testing';

describe('product-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-product-header></tec-product-header>');

    const element = await page.find('tec-product-header');
    expect(element).toHaveClass('hydrated');
  });

  describe('properties/attributes', () => {
    describe('theme', () => {
      it('light', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header></tec-product-header>');

        const element = await page.find('tec-product-header');
        expect(element).toEqualAttribute('theme', 'light');
      });

      it('dark', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header theme="dark"></tec-product-header>');

        const element = await page.find('tec-product-header');
        expect(element).toEqualAttribute('theme', 'dark');
      });
    });

    describe('titleProduct', () => {
      it('has titleProduct', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header title-product="Test"></tec-product-header>');

        const element = await page.find('tec-product-header >>> .title');
        expect(element).toEqualText('Test')
      });

      it('has not titleProduct', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header></tec-product-header>');

        const element = await page.find('tec-product-header >>> .title');
        expect(element).toEqualText('')
      });
    });


    describe('titleCursorPointer', () => {
      it('should set cursor pointer', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header></tec-product-header>');

        const element = await page.find('tec-product-header');

        expect(element.shadowRoot.querySelector('.title').getAttribute('style')).toBe('cursor: pointer;');
      });

      it('should emit event when click', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header title-product="Test"></tec-product-header>');

        const element = await page.find('tec-product-header');
        const title = await page.find('tec-product-header >>> .title')

        const event = await element.spyOnEvent('title-clicked');

        await title.click();

        expect(event).toHaveReceivedEvent()
      });


      it('should not set cursor pointer', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header title-cursor-pointer="false"></tec-product-header>');

        const element = await page.find('tec-product-header');

        expect(element.shadowRoot.querySelector('.title').getAttribute('style')).toBe(null);
      });

      it('should not emit event when click', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header title-product="Test" title-cursor-pointer="false"></tec-product-header>');

        const element = await page.find('tec-product-header');
        const title = await page.find('tec-product-header >>> .title')

        const event = await element.spyOnEvent('title-clicked');

        await title.click();

        expect(event).not.toHaveReceivedEvent()
      });

    });

    describe('sticky', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header></tec-product-header>');

        const element = await page.find('tec-product-header >>> .sticky');

        expect(element).toBeDefined()
      });

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-product-header sticky="false"></tec-product-header>');

        const element = await page.find('tec-product-header >>> .sticky');

        expect(element).toBeNull()
      });

    })

  })
});
