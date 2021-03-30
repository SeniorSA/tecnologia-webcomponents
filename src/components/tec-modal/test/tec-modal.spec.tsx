import { newSpecPage } from '@stencil/core/testing';
import { TecModal } from '../tec-modal';

describe('tec-modal', () => {
  it('closed', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal theme="light">
        <mock:shadow-root></mock:shadow-root>
      </tec-modal>
    `);
  });

  it('opened', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modal-title="Test"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modal-title="Test">
        <mock:shadow-root>
          <div class="modal show-background false"><div class="responsive modal-content false open-animation">
            <div class="modal-title text-title">
            <h1 class="text-2x1">Test</h1>
            <div class="close-container">
              <span class="close">×</span>
            </div>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
          </div>
          </div>
        </mock:shadow-root>
      </tec-modal>
    `);
  });

  it('dark', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modal-title="Test" theme="dark"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="dark" modal-title="Test">
        <mock:shadow-root>
          <div class="modal show-background false"><div class="responsive modal-content false open-animation">
            <div class="modal-title text-title">
            <h1 class="text-2x1">Test</h1>
            <div class="close-container">
              <span class="close">×</span>
            </div>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
          </div>
          </div>
        </mock:shadow-root>
      </tec-modal>
    `);
  });

  it('remove close icon', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modal-title="Test" show-close-icon="false"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modal-title="Test" show-close-icon="false">
        <mock:shadow-root>
          <div class="modal show-background false"><div class="responsive modal-content false open-animation">
            <div class="modal-title text-title">
            <h1 class="text-2x1">Test</h1>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
          </div>
          </div>
        </mock:shadow-root>
      </tec-modal>
    `);
  });

  it('use full-width', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modal-title="Test" full-width="true"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modal-title="Test" full-width="true">
        <mock:shadow-root>
          <div class="false modal show-background"><div class="false full-width modal-content open-animation responsive">
            <div class="modal-title text-title">
            <h1 class="text-2x1">Test</h1>
            <div class="close-container">
              <span class="close">×</span>
            </div>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
          </div>
          </div>
        </mock:shadow-root>
      </tec-modal>
    `);
  });

  it('remove responsive property', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modal-title="Test" full-width="true" responsive="false"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modal-title="Test" full-width="true" responsive="false">
        <mock:shadow-root>
          <div class="false modal show-background"><div class="false full-width modal-content open-animation">
            <div class="modal-title text-title">
            <h1 class="text-2x1">Test</h1>
            <div class="close-container">
              <span class="close">×</span>
            </div>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
          </div>
          </div>
        </mock:shadow-root>
      </tec-modal>
    `);
  });

});
