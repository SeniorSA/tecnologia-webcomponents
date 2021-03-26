import { newSpecPage } from '@stencil/core/testing';
import { BottomBar } from '../bottom-bar';

describe('bottom-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BottomBar],
      html: `<tec-bottom-bar></tec-bottom-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-bottom-bar theme="light">
        <mock:shadow-root>
          <div class="container use-animation">
            <div class="flex-align-center wrapper" style="flex-direction: row-reverse;">
              <div class="button">
                <slot name="button"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </tec-bottom-bar>
    `);
  });
});
