import { newSpecPage } from '@stencil/core/testing';
import { TecButton } from '../tec-button';

describe('tec-button', () => {
  it('renders theme light', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button theme="light">
        <mock:shadow-root>
          <button type="button" class="solid rounded primary text-sans text-base"><span class=""></span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders theme dark', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button theme="dark"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button theme="dark">
        <mock:shadow-root>
          <button type="button" class="solid rounded primary text-sans text-base"><span class=""></span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with props', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirmar" size="small" mode="rounded"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirmar" mode="rounded" size="small" theme="light">
        <mock:shadow-root>
          <button type="button" id="1" class="solid rounded primary text-sans text-base"><span class="">Confirmar</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });
});
