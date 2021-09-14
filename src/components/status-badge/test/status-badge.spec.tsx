import { newSpecPage } from '@stencil/core/testing';
import { StatusBadge } from '../status-badge';

describe('status-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StatusBadge],
      html: `<tec-status-badge badge-text="test"></tec-status-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-status-badge badge-text="test">
        <mock:shadow-root>
        <div class="badge text-sans">
          <span class="badge-value primary">test</span>
        </div>
        </mock:shadow-root>
      </tec-status-badge>
    `);
  });
});
