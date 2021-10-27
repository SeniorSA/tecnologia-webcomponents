import { newSpecPage } from '@stencil/core/testing';
import { CardMessage } from '../card-message';

describe('card-message', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CardMessage],
      html: '<tec-card-message></tec-card-message>',
    });
    expect(root).toEqualHtml(`
      <tec-card-message>
        <mock:shadow-root>
          <div class="card-message" style={}>
            <div class="card-icon">
              <slot></slot>
            </div>
            <div></div>
          </div>
        </mock:shadow-root>
      </tec-card-message>
    `);
  });

  it('renders with prop', async () => {
    const { root } = await newSpecPage({
      components: [CardMessage],
      html: '<tec-card-message message="Você não tem permissão para ver os campos do formulário."></tec-card-message>',
    });
    expect(root).toEqualHtml(`
      <tec-card-message message="Você não tem permissão para ver os campos do formulário.">
        <mock:shadow-root>
          <div class="card-message">
            <div class="card-icon">
              <slot></slot>
            </div>
            <div>Você não tem permissão para ver os campos do formulário.</div>
          </div>
        </mock:shadow-root>
      </tec-card-message>
    `);
  });

  // it('renders with slot', async () => {
  //   const { root } = await newSpecPage({
  //     components: [CardMessage],
  //     html: '<tec-card-message message="Você não tem permissão para ver os campos do formulário."><i class="fa fa-ban"></i></tec-card-message>',
  //   });
  //   expect(root).toEqualHtml(`
  //     <tec-card-message message="Você não tem permissão para ver os campos do formulário.">
  //       <mock:shadow-root>
  //         <div class="card-message">
  //           <div class="card-icon">
  //             <slot></slot>
  //           </div>
  //           <div>Você não tem permissão para ver os campos do formulário.</div>
  //         </div>
  //       </mock:shadow-root>
  //     </tec-card-message>
  //   `);
  // });
});
