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
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" mode="rounded" size="small" theme="light">
        <mock:shadow-root>
          <button type="button" id="1" class="solid rounded primary text-sans text-base"><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with disabled', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded" disabled="true"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" mode="rounded" size="small" theme="light" disabled="true">
        <mock:shadow-root>
          <button type="button" id="1" class="solid rounded primary text-sans text-base disabled" disabled=""><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with full-width', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded" full-width="true"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" mode="rounded" size="small" theme="light" full-width="">
        <mock:shadow-root>
          <button type="button" id="1" class="responsive solid rounded primary text-sans text-base"><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with success status', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded" status="success"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" size="small" mode="rounded" status="success" theme="light">
        <mock:shadow-root>
        <button type="button" id="1" class="solid rounded success text-sans text-base"><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });
});
