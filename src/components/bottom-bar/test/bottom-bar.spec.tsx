import { newSpecPage } from '@stencil/core/testing';
import { BottomBar } from '../bottom-bar';
import { ButtonPosition } from '../bottom-bar.model';

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

  describe('handleButtonPositionStyle', () => {
    it ('should return row-reverse', () => {
      const component = new BottomBar();

      expect(component['handleButtonPositionStyle'](ButtonPosition.left).flexDirection).toEqual('row-reverse')
    })

    it ('should return row', () => {
      const component = new BottomBar();

      expect(component['handleButtonPositionStyle'](ButtonPosition.right).flexDirection).toEqual('row')
    })
  })
});
