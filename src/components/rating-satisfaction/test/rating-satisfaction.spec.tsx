import { newSpecPage } from '@stencil/core/testing';
import { RatingSatisfaction } from '../rating-satisfaction';

describe('rating-satisfaction', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RatingSatisfaction],
      html: `<rating-satisfaction></rating-satisfaction>`,
    });
    expect(page.root).toEqualHtml(`
      <rating-satisfaction>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rating-satisfaction>
    `);
  });
});
