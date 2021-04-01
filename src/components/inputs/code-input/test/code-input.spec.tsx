import { newSpecPage } from '@stencil/core/testing'
import { CodeInput } from '../code-input'
import { CodeInputCase } from '../code-input.model'

describe('code-input', () => {
  it('render with default values', async () => {
    const page = await newSpecPage({
      components: [CodeInput],
      html: '<tec-code-input></tec-code-input>'
    })
    expect(page.root).toEqualHtml(`
      <tec-code-input autofocus="" length="5" placeholder="" theme="light" type="text" value="">
        <mock:shadow-root>
          <div class="wrapper">
            <input autocapitalize="false" autocomplete="false" autofocus="" class="text-8x1 text-mono use-margin" id="field-0" maxlength="1" type="text">
            <input autocapitalize="false" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-1" maxlength="1" type="text">
            <input autocapitalize="false" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-2" maxlength="1" type="text">
            <input autocapitalize="false" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-3" maxlength="1" type="text">
            <input autocapitalize="false" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-4" maxlength="1" type="text">
          </div>
        </mock:shadow-root>
      </tec-code-input>
    `)
  })

  describe('methods', () => {
    it('buildFinalValue()', async () => {
      const comp = new CodeInput()
      comp['internalValue'] = ['0', '1', '2', '3', '4']
      expect(comp['buildFinalValue']()).toEqual('01234')

      comp['internalValue'] = []
      expect(comp['buildFinalValue']()).toEqual('')
    })

    it('buildArrayIterator()', () => {

    })
  })
})
