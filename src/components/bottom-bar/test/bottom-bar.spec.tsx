import { newSpecPage } from '@stencil/core/testing';
import { BottomBar } from '../bottom-bar';

describe('bottom-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BottomBar],
      html: `<tec-bottom-bar></tec-bottom-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-bottom-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tec-bottom-bar>
    `);
  });
});
