import { newSpecPage } from '@stencil/core/testing';
import { TecButton } from '../button';

describe('tec-button', () => {
  it('renders theme light', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button theme="light">
        <mock:shadow-root>
          <button type="button" class="solid rounded primary text-sans text-base"><span class=""></span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders theme dark', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button theme="dark"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button theme="dark">
        <mock:shadow-root>
          <button type="button" class="solid rounded primary text-sans text-base"><span class=""></span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with props', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" mode="rounded" size="small" theme="light">
        <mock:shadow-root>
          <button type="button" id="1" class="solid rounded primary text-sans text-base"><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with disabled', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded" disabled="true"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" mode="rounded" size="small" theme="light" disabled="true">
        <mock:shadow-root>
          <button type="button" id="1" class="solid rounded primary text-sans text-base disabled" disabled=""><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with full-width', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded" full-width="true"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" mode="rounded" size="small" theme="light" full-width="">
        <mock:shadow-root>
          <button type="button" id="1" class="responsive solid rounded primary text-sans text-base"><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('renders with success status', async () => {
    const page = await newSpecPage({
      components: [TecButton],
      html: `<tec-button buttonId="1" label="Confirm" size="small" mode="rounded" status="success"></tec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tec-button buttonid="1" label="Confirm" size="small" mode="rounded" status="success" theme="light">
        <mock:shadow-root>
        <button type="button" id="1" class="solid rounded success text-sans text-base"><span class="">Confirm</span></button>
        </mock:shadow-root>
      </tec-button>
    `);
  });

  it('should throw error', async () => {
    const component = new TecButton();
    component.onlyIcon = true;
    component.icon = '';
    try {
      component.componentDidLoad()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error.message).toBe('When \'onlyIcon\' property is enabled a \'icon\' should be passed!')
    }
  })

  it('should not throw error', async () => {
    const component = new TecButton();
    component.onlyIcon = true;
    component.icon = 'test';
    try {
      component.componentDidLoad()
      expect(true).toBeTruthy()
    } catch (error) {
      expect(true).toBeFalsy()
    }

    component.onlyIcon = false;
    component.icon = '';
    try {
      component.componentDidLoad()
      expect(true).toBeTruthy()
    } catch (error) {
      expect(true).toBeFalsy()
    }
  })

  it('should isDisabled be true', () => {
    const component = new TecButton();
    component.disabled = true

    expect(component.isDisabled).toBeTruthy()
  })

  it('should isDisabled be true when is loading', () => {
    const component = new TecButton();
    component.disabled = false
    component.loading = true

    expect(component.isDisabled).toBeTruthy()
  })

  it('should isDisabled be false', () => {
    const component = new TecButton();
    component.disabled = false
    component.loading = false

    expect(component.isDisabled).toBeFalsy()
  })

  it('should emit event', () => {
    const component = new TecButton();
    const eventSpy = jest.spyOn(component.clicked, 'emit').mockImplementation();
    component.disabled = false;
    component.loading = false;

    component.handleEventClick({} as MouseEvent)

    expect(eventSpy).toHaveBeenCalled()
  })

  it('should not emit event', () => {
    const component = new TecButton();
    const eventSpy = jest.spyOn(component.clicked, 'emit').mockImplementation();
    component.disabled = true;
    component.loading = false;

    component.handleEventClick({} as MouseEvent)

    expect(eventSpy).not.toHaveBeenCalled()
  })

  it('should not emit event', () => {
    const component = new TecButton();
    const eventSpy = jest.spyOn(component.clicked, 'emit').mockImplementation();
    component.disabled = false;
    component.loading = true;

    component.handleEventClick({} as MouseEvent)

    expect(eventSpy).not.toHaveBeenCalled()
  })


});
