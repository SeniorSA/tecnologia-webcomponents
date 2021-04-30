import { newE2EPage } from '@stencil/core/testing'

describe('tec-code-input', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<tec-code-input></tec-code-input>')

    const element = await page.find('tec-code-input')
    expect(element).toHaveClass('hydrated')
  })

  it('should contain correct id for each input', async () => {
    const page = await newE2EPage()
    await page.setContent('<tec-code-input></tec-code-input>')

    const element = await page.find('tec-code-input')
    element.shadowRoot.querySelectorAll('input').forEach(el => {
      expect(el.id).toContain('field-')
    })
  })

  describe('properties/attributes', () => {
    describe('placeholder', () => {
      it('should contain the attribute', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input placeholder="01234"></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toHaveAttribute('placeholder')
      })

      it('each input should contain placeholder char', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input placeholder="01234"></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('placeholder', '01234')

        for (let index = 0; index < 5; index++) {
          expect(
            (element.shadowRoot.querySelector(`input#field-${index}`) as HTMLInputElement)
              .placeholder
          ).toEqual(`${index}`)
        }
      })
    })

    describe('length', () => {
      const DEFAULT_LENGTH = 5

      it('attribute is empty', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('length', DEFAULT_LENGTH)
        expect(element.shadowRoot.querySelectorAll('input').length).toEqual(
          DEFAULT_LENGTH
        )
      })

      it('on modify length value', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input length="2"></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('length', '2')
      })
    })

    describe('initial-value', () => {
      it('should contain the attribute', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input initial-value="01234"></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('initial-value', '01234')
        expect(element).toEqualAttribute('value', '01234')
      })
    })

    describe('type', () => {
      it('default type should be text', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('type', 'text')

        for (let index = 0; index < 5; index++) {
          expect(
            (element.shadowRoot.querySelector(`input#field-${index}`) as HTMLInputElement)
              .type
          ).toEqual('text')
        }
      })

      it('text', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input type="text"></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('type', 'text')

        for (let index = 0; index < 5; index++) {
          expect(
            (element.shadowRoot.querySelector(`input#field-${index}`) as HTMLInputElement)
              .type
          ).toEqual('text')
        }
      })

      it('password', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input type="password"></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('type', 'password')

        for (let index = 0; index < 5; index++) {
          expect(
            (element.shadowRoot.querySelector(`input#field-${index}`) as HTMLInputElement)
              .type
          ).toEqual('password')
        }
      })
    })

    describe('disabled', () => {
      it('attribute is empty', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).not.toHaveAttribute('disabled')
      })

      it('attribute is present', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input disabled></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toHaveAttribute('disabled')

        for (let index = 0; index < 5; index++) {
          expect(
            (element.shadowRoot.querySelector(`input#field-${index}`) as HTMLInputElement)
              .disabled
          ).toBeTruthy()
        }
      })
    })

    describe('case', () => {
      describe('default case', () => {
        jest.useFakeTimers()
        it('test 1', async () => {
          const page = await newE2EPage()
          await page.setContent('<tec-code-input length="5"></tec-code-input>')
          const element = await page.find('tec-code-input')

          await element.type('A123B')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'A123B')
        })

        it('test 2', async () => {
          const page = await newE2EPage()
          await page.setContent('<tec-code-input length="5"></tec-code-input>')
          const element = await page.find('tec-code-input')

          await element.type('a123b')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'a123b')
        })

        it('test 3', async () => {
          const page = await newE2EPage()
          await page.setContent('<tec-code-input length="5"></tec-code-input>')
          const element = await page.find('tec-code-input')

          await element.type('A123b')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'A123b')
        })
      })

      describe('lowercase', () => {
        jest.useFakeTimers()
        it('test 1', async () => {
          const page = await newE2EPage()
          await page.setContent(
            '<tec-code-input case="lowercase" length="5"></tec-code-input>'
          )
          const element = await page.find('tec-code-input')

          await element.type('A123B')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'a123b')
        })

        it('test 2', async () => {
          const page = await newE2EPage()
          await page.setContent(
            '<tec-code-input case="lowercase" length="5"></tec-code-input>'
          )
          const element = await page.find('tec-code-input')

          await element.type('a123b')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'a123b')
        })

        it('test 3', async () => {
          const page = await newE2EPage()
          await page.setContent(
            '<tec-code-input case="lowercase" length="5"></tec-code-input>'
          )
          const element = await page.find('tec-code-input')

          await element.type('A123b')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'a123b')
        })
      })

      describe('uppercase', () => {
        jest.useFakeTimers()
        it('test 1', async () => {
          const page = await newE2EPage()
          await page.setContent(
            '<tec-code-input case="uppercase" length="5"></tec-code-input>'
          )
          const element = await page.find('tec-code-input')

          await element.type('A123B')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'A123B')
        })

        it('test 2', async () => {
          const page = await newE2EPage()
          await page.setContent(
            '<tec-code-input case="uppercase" length="5"></tec-code-input>'
          )
          const element = await page.find('tec-code-input')

          await element.type('a123b')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'A123B')
        })

        it('test 3', async () => {
          const page = await newE2EPage()
          await page.setContent(
            '<tec-code-input case="uppercase" length="5"></tec-code-input>'
          )
          const element = await page.find('tec-code-input')

          await element.type('A123b')
          jest.runAllTimers()
          jest.runOnlyPendingTimers()
          expect(element).toEqualAttribute('value', 'A123B')
        })
      })
    })

    describe('use-margin', () => {
      it('default', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input></tec-code-input>')

        const element = await page.find('tec-code-input')
        expect(element).toEqualAttribute('use-margin', null)

        const firstInput = element.shadowRoot.querySelector('input')
        expect(firstInput).toHaveClass('use-margin')
      })

      it('explict use margins as true', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input use-margin="true"></tec-code-input>')

        const element = await page.find('tec-code-input')

        const firstInput = element.shadowRoot.querySelector('input')
        expect(firstInput).toHaveClass('use-margin')
      })

      it('without margins', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input use-margin="false"></tec-code-input>')

        const element = await page.find('tec-code-input')

        const firstInput = element.shadowRoot.querySelector('input')
        expect(firstInput).not.toHaveClass('use-margin')
      })
    })
  })

  describe('events', () => {
    describe('completed', () => {
      it('complete code', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input length="5"></tec-code-input>')

        const element = await page.find('tec-code-input')
        const event = await element.spyOnEvent('completed')

        await page.waitForChanges()

        await element.type('012')
        expect(event).not.toHaveReceivedEvent()

        await element.type('AA', { delay: 2 })
        expect(event).toHaveReceivedEvent()
        expect(event).toHaveReceivedEventDetail({ value: '012AA' })
      })

      it('complete and backspace', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input length="5"></tec-code-input>')

        const element = await page.find('tec-code-input')
        const event = await element.spyOnEvent('completed')

        await page.waitForChanges()

        await element.type('012AA')
        expect(event).toHaveReceivedEvent()
        expect(event).toHaveReceivedEventDetail({ value: '012AA' })

        await element.press('Backspace')
        await element.type('BB', { delay: 2 })
        expect(event).toHaveReceivedEvent()
        expect(event).toHaveReceivedEventDetail({ value: '012BB' })
      })
    })

    describe('codeChange', () => {
      it('emit for each typed letter', async () => {
        const page = await newE2EPage()
        await page.setContent('<tec-code-input length="2"></tec-code-input>')

        const element = await page.find('tec-code-input')
        const event = await element.spyOnEvent('codeChange')

        await page.waitForChanges()

        await element.type('0')
        expect(event).toHaveReceivedEventTimes(1)
        expect(event).toHaveReceivedEventDetail({ value: '0' })

        await element.type('A', { delay: 2 })
        expect(event).toHaveReceivedEventTimes(2)
        expect(event).toHaveReceivedEventDetail({ value: '0A' })
      })
    })

    it('inputChange', async () => {
      const page = await newE2EPage()
      await page.setContent('<tec-code-input length="2"></tec-code-input>')

      const element = await page.find('tec-code-input')
      const event = await element.spyOnEvent('inputChange')

      await page.waitForChanges()

      await element.type('0')
      expect(event).toHaveReceivedEventTimes(1)
      expect(event).toHaveReceivedEventDetail({
        event: { isTrusted: true },
        value: '0'
      })

      await element.type('A', { delay: 2 })
      expect(event).toHaveReceivedEventTimes(2)
      expect(event).toHaveReceivedEventDetail({
        event: { isTrusted: true },
        value: 'A'
      })
    })

    it('inputFocus', async () => {
      const page = await newE2EPage()
      await page.setContent('<tec-code-input length="2" autofocus="false"></tec-code-input>')

      const element = await page.find('tec-code-input')
      const event = await element.spyOnEvent('inputFocus')

      const firstInput = await page.find('tec-code-input >>> input')
      await firstInput.focus()

      expect(event).toHaveReceivedEventTimes(1)
      expect(event).toHaveReceivedEventDetail({
        event: { isTrusted: true },
        value: {
          index: 0,
          id: 'field-0',
          value: ' '
        }
      })
    })
  })
})
