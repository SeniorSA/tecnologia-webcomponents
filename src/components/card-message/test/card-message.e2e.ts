import { newE2EPage } from '@stencil/core/testing';

describe('tec-card-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<tec-card-message></tec-card-message>');
    const element = await page.find('tec-card-message');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-card-message message="Mensagem original"></tec-card-message>');

    const component = await page.find('tec-card-message');
    const messageElement = await page.find('tec-card-message >>> div');

    expect(messageElement.textContent).toEqual(`Mensagem original`);

    component.setProperty('message', 'Outra mensagem');
    await page.waitForChanges();

    expect(messageElement.textContent).toEqual(`Outra mensagem`);
  });

});
