import { newE2EPage } from '@stencil/core/testing';

describe('tec-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tec-button></tec-button>');

    const element = await page.find('tec-button');
    expect(element).toHaveClass('hydrated');
  });

  describe('properties/attributes', () => {
    describe('theme', () => {
      it('light', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button');
        expect(element).toEqualAttribute('theme', 'light');
      });

      it('dark', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button theme="dark"></tec-button>');

        const element = await page.find('tec-button');
        expect(element).toEqualAttribute('theme', 'dark');
      });
    });

    describe('buttonId', () => {
      it('has buttonId', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button button-id="2"></tec-button>');

        const element = await page.find('tec-button');
        expect(element).toEqualAttribute('button-id', '2');
      });

      it('has not buttonId', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button');
        expect(element).toEqualAttribute('button-id', null);
      });
    });

    describe('label', () => {
      it('has label', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button label="test"></tec-button>');

        const element = await page.find('tec-button >>> span');

        expect(element).toEqualText('test')
      });

      it('has not label', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> span');

        expect(element).toEqualText('')
      });

      it('has not label when is onlyIcon', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button onlyIcon icon="icon" label="test"></tec-button>');

        const icon = await page.find('tec-button >>> i');
        const element = await page.find('tec-button >>> span');

        expect(element).toEqualText('')
        expect(icon).toEqualAttribute('class', 'icon')
      });
    });

    describe('status', () => {

      it('primary', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('primary')
      })

      it('secondary', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button status="secondary"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('secondary')
      })

      it('success', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button status="success"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('success')
      })

      it('danger', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button status="danger"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('danger')
      })

      it('warn', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button status="warn"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('warn')
      })

      it('info', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button status="info"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('info')
      })

    })

    describe('mode', () => {

      it('rounded', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('solid')
      })

      it('square', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button mode="square"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('square')
      })

      it('radius', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button mode="radius"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('radius')
      })

    })

    describe('color', () => {

      it('solid', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('solid')
      })

      it('gradient', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button color="gradient"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('gradient')
      })

      it('outline', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button color="outline"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('outline')
      })

      it('basic', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button color="basic"></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('basic')
      })

    })

    describe('size', () => {
      it('tiny', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button size="tiny"></tec-button>');

        const element = await page.find('tec-button');

        expect(element).toEqualAttribute('size', 'tiny')
      })

      it('small', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button size="small"></tec-button>');

        const element = await page.find('tec-button');

        expect(element).toEqualAttribute('size', 'small')
      })

      it('medium', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button size="medium"></tec-button>');

        const element = await page.find('tec-button');

        expect(element).toEqualAttribute('size', 'medium')
      })

      it('large', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button size="large"></tec-button>');

        const element = await page.find('tec-button');

        expect(element).toEqualAttribute('size', 'large')
      })

      it('giant', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button size="giant"></tec-button>');

        const element = await page.find('tec-button');

        expect(element).toEqualAttribute('size', 'giant')
      })
    })

    describe('disabled', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button disabled></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('disabled');
      })

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).not.toHaveClass('disabled');
      })

    })

    describe('fullWidth', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button full-width></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('responsive');
      })

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).not.toHaveClass('responsive');
      })
    })

    describe('onlyIcon', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button onlyIcon icon="test" label="test"></tec-button>');

        const element = await page.find('tec-button >>> span');

        expect(element).toHaveClass('no-margins');
        expect(element).toEqualText('')
      })

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button label="test"></tec-button>');

        const element = await page.find('tec-button >>> span');

        expect(element).not.toHaveClass('no-margins');
        expect(element).toEqualText('test')
      })
    })

    describe('iconMode', () => {
      it('right', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button icon="test" label="test" iconMode="right"></tec-button>');

        const element = await page.find('tec-button >>> span');

        expect(element).toHaveClass('reverse');
        expect(element).toEqualText('test')
      })

      it('left', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button icon="test" label="test"></tec-button>');

        const element = await page.find('tec-button >>> span');

        expect(element).not.toHaveClass('reverse');
        expect(element).toEqualText('test')
      })
    })

    describe('icon', () => {
      it('has icon', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button icon="test"></tec-button>');

        const element = await page.find('tec-button >>> i');

        expect(element).toBeDefined()
      })

      it('has not icon', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> i');

        expect(element).toBeNull()
      })
    })

    describe('loading', () => {
      it('true', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button loading></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).toHaveClass('disabled');
      })

      it('false', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button></tec-button>');

        const element = await page.find('tec-button >>> button');

        expect(element).not.toHaveClass('disabled');
      })

    })

  })

  describe('events', () => {
    describe('clicked', () => {
      it('should emit', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button label="test"></tec-button>');

        const element = await page.find('tec-button');
        const button = await page.find('tec-button >>> button');

        const event = await element.spyOnEvent('clicked');

        await button.click()

        expect(event).toHaveReceivedEvent()
      })

      it('should not emit when is disabled', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button label="test" disabled></tec-button>');

        const element = await page.find('tec-button');
        const button = await page.find('tec-button >>> button');

        const event = await element.spyOnEvent('clicked');

        await button.click()

        expect(event).not.toHaveReceivedEvent()
      })

      it('should not emit when is loading', async () => {
        const page = await newE2EPage();
        await page.setContent('<tec-button label="test" loading></tec-button>');

        const element = await page.find('tec-button');
        const button = await page.find('tec-button >>> button');

        const event = await element.spyOnEvent('clicked');

        await button.click()

        expect(event).not.toHaveReceivedEvent()
      })
    })
  })

});
