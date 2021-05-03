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
              <span class="close"><span>×</span></span>
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
              <span class="close"><span>×</span></span>
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
              <span class="close"><span>×</span></span>
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
              <span class="close"><span>×</span></span>
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

  it('Modal using footer', async () => {
    const page = await newSpecPage({
      components: [TecModal],
      html: `<tec-modal opened="true" modal-title="Test" full-width="true" responsive="false"><span slot="footer">Footer</span></tec-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-modal opened="true" theme="light" modal-title="Test" full-width="true" responsive="false">
        <mock:shadow-root>
          <div class="false modal show-background"><div class="false full-width modal-content open-animation">
            <div class="modal-title text-title">
            <h1 class="text-2x1">Test</h1>
            <div class="close-container">
              <span class="close"><span>×</span></span>
            </div>
            </div>
            <div class="content"><slot name="content"></slot>
            </div>
            <div class="footer right">
              <div class="footer-content">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
          </div>
        </mock:shadow-root>
        <span slot="footer">Footer</span>
      </tec-modal>
    `);
  });

  it('closeModal', () => {
    const comp = new TecModal();
    const handleParenteEvent = jest
      .spyOn(comp, 'handleParentOverflow')
      .mockImplementation();
    const hiddenEventSpy = jest.spyOn(comp.hidden, 'emit').mockImplementation();

    comp.closeModal();

    expect(handleParenteEvent).toHaveBeenCalled();
    expect(hiddenEventSpy).toHaveBeenCalled();
    expect(comp.opened).toBeFalsy();
  });

  it('should handle click not call closeModal', () => {
    const comp = new TecModal();
    comp['clickWasInside'] = true;
    comp['dismissOnBackdrop'] = true;
    const closeModalSpy = jest.spyOn(comp, 'closeModal').mockImplementation();

    comp.handleClick({});

    expect(closeModalSpy).toHaveBeenCalledTimes(0);
    expect(comp['clickWasInside']).toBeFalsy();

    comp['clickWasInside'] = false;
    comp['dismissOnBackdrop'] = false;
    comp.handleClick({});

    expect(closeModalSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle click call closeModal', () => {
    const comp = new TecModal();
    comp['clickWasInside'] = false;
    comp['dismissOnBackdrop'] = true;
    const closeModalSpy = jest.spyOn(comp, 'closeModal').mockImplementation();

    comp.handleClick({});

    expect(closeModalSpy).toHaveBeenCalledTimes(1);
  });

  it('watchOpened when is false', () => {
    jest.useFakeTimers()
    const comp = new TecModal();
    comp['openedAuxiliary'] = true;

    comp.watchOpened(false);

    jest.runOnlyPendingTimers()

    expect(comp['openedAuxiliary']).toBeFalsy()
  });

  it('watchOpened when is true', () => {
    const comp = new TecModal();
    comp['openedAuxiliary'] = false;
    const handleParentSpy = jest.spyOn(comp, 'handleParentOverflow').mockImplementation();

    comp.watchOpened(true);

    expect(comp['openedAuxiliary']).toBeTruthy();
    expect(handleParentSpy).toHaveBeenCalled();
  });

  it('componentWillLoad when open is true', () => {
    const comp = new TecModal();
    const hostElementSpy = jest.spyOn(comp.hostElement, 'querySelector').mockImplementation()
    const handleParentOverflowSpy = jest.spyOn(comp, 'handleParentOverflow').mockImplementation()
    comp.opened = true

    comp.componentWillLoad();

    expect(hostElementSpy).toHaveBeenCalledWith('[slot="footer"]')
    expect(handleParentOverflowSpy).toHaveBeenCalled()
    expect(comp['openedAuxiliary']).toBeTruthy()
  });

  it('componentWillLoad when open is false', () => {
    const comp = new TecModal();
    const hostElementSpy = jest.spyOn(comp.hostElement, 'querySelector').mockImplementation()
    const handleParentOverflowSpy = jest.spyOn(comp, 'handleParentOverflow').mockImplementation()
    comp.opened = false

    comp.componentWillLoad();

    expect(hostElementSpy).toHaveBeenCalledWith('[slot="footer"]')
    expect(handleParentOverflowSpy).toHaveBeenCalledTimes(0)
    expect(comp['openedAuxiliary']).toBeFalsy()
  });

  it('componentWillLoad when closeOnEscape is true', () => {
    const comp = new TecModal();
    const hostElementSpy = jest.spyOn(comp.hostElement, 'querySelector').mockImplementation()
    const documentSpy = jest.spyOn(document, 'addEventListener').mockImplementation()
    comp.closeOnEscape = true

    comp.componentWillLoad();

    expect(hostElementSpy).toHaveBeenCalledWith('[slot="footer"]')
    expect(documentSpy).toHaveBeenCalledWith("keydown", comp.handleKeyDown)
  });

  it('should close modal when press escape', () => {
    const comp = new TecModal();
    const closeModalSpy = jest.spyOn(comp, 'closeModal').mockImplementation()
    comp.opened = true

    const event = new KeyboardEvent('keydown')

    comp.handleKeyDown({...event, key: 'Escape'})

    expect(closeModalSpy).toHaveBeenCalled()
  });

  it('should not close modal when dont press Escape', () => {
    const comp = new TecModal();
    const closeModalSpy = jest.spyOn(comp, 'closeModal').mockImplementation()
    comp.opened = true

    const event = new KeyboardEvent('keydown')

    comp.handleKeyDown({...event, key: 'a'})

    expect(closeModalSpy).toHaveBeenCalledTimes(0)
  });

  it('should not close modal when modal is closed and press escape', () => {
    const comp = new TecModal();
    const closeModalSpy = jest.spyOn(comp, 'closeModal').mockImplementation()
    comp.opened = false

    const event = new KeyboardEvent('keydown')

    comp.handleKeyDown({...event, key: 'Escape'})

    expect(closeModalSpy).toHaveBeenCalledTimes(0)
  });

  it('setClickWasInside true event', () => {
    const comp = new TecModal();
    comp['clickWasInside'] = false

    comp.setClickWasInside(true)();

    expect(comp['clickWasInside']).toBeTruthy()
  });

  it('setClickWasInside true event', () => {
    const comp = new TecModal();
    comp['clickWasInside'] = true

    comp.setClickWasInside(false)();

    expect(comp['clickWasInside']).toBeFalsy()
  });
});
