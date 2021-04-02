import { newE2EPage } from '@stencil/core/testing'

describe('tec-code-input', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<tec-code-input></tec-code-input>')

    const element = await page.find('tec-code-input')
    expect(element).toHaveClass('hydrated')
  })

  it('should show placeholder', async () => {
    const page = await newE2EPage()
    await page.setContent('<tec-code-input placeholder="01234"></tec-code-input>')

    const element = await page.find('tec-code-input')
    expect(element).toHaveAttribute('placeholder')
    expect(element.getAttribute('placeholder')).toEqual('01234')

    for (let index = 0; index < 5; index++) {
      expect(
        (element.shadowRoot.querySelector(`input#field-${index}`) as HTMLInputElement)
          .placeholder
      ).toEqual(`${index}`)
    }
  })
})
