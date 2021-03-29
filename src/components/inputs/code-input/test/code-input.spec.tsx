import { newSpecPage } from '@stencil/core/testing';
import { CodeInput } from '../code-input';

describe('code-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodeInput],
      html: `<code-input></code-input>`,
    });
    expect(page.root).toEqualHtml(`
      <code-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </code-input>
    `);
  });
});
