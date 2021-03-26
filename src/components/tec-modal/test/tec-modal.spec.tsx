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
      html: `<tec-modal opened="true" modalTitle="Test"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modalTitle="Test">
        <mock:shadow-root>
          <div class="modal show-background false"><div class="modal-content false open-animation">
            <div class="modal-title text-title">
            <h1>Test</h1>
            <span class="close">×</span>
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
      html: `<tec-modal opened="true" modalTitle="Test" theme="dark"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="dark" modalTitle="Test">
        <mock:shadow-root>
          <div class="modal show-background false"><div class="modal-content false open-animation">
            <div class="modal-title text-title">
            <h1>Test</h1>
            <span class="close">×</span>
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
      html: `<tec-modal opened="true" modalTitle="Test" showCloseIcon="false"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modalTitle="Test" showCloseIcon="false">
        <mock:shadow-root>
          <div class="modal show-background false"><div class="modal-content false open-animation">
            <div class="modal-title text-title">
            <h1>Test</h1>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
          </div>
          </div>
        </mock:shadow-root>
      </tec-modal>
    `);
  });

  it('use fullWidth', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modalTitle="Test" fullWidth="true"></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modalTitle="Test" fullWidth="true">
        <mock:shadow-root>
          <div class="false modal show-background"><div class="false full-width modal-content open-animation">
            <div class="modal-title text-title">
            <h1>Test</h1>
            <span class="close">×</span>
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
