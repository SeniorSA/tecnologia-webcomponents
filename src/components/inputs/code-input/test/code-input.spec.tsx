import { newSpecPage } from '@stencil/core/testing'
import { CodeInput } from '../code-input'

describe('code-input', () => {
  it('render with default values', async () => {
    const page = await newSpecPage({
      components: [CodeInput],
      html: '<tec-code-input></tec-code-input>'
    })
    expect(page.root).toEqualHtml(`
      <tec-code-input autofocus="" length="5" placeholder="" responsive="" theme="light" type="text" value="">
        <mock:shadow-root>
          <div class="responsive wrapper">
            <input autocapitalize="false" value=" " placeholder="" autocomplete="false" autofocus="" class="text-8x1 text-mono use-margin" id="field-0" maxlength="1" type="text">
            <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-1" maxlength="1" type="text">
            <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-2" maxlength="1" type="text">
            <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-3" maxlength="1" type="text">
            <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-4" maxlength="1" type="text">
          </div>
        </mock:shadow-root>
      </tec-code-input>
    `)
  })

  describe('responsive', () => {
    it('should render with responsive class', async () => {
      const page = await newSpecPage({
        components: [CodeInput],
        html: '<tec-code-input></tec-code-input>'
      })
      expect(page.root).toEqualHtml(`
        <tec-code-input autofocus="" length="5" placeholder="" responsive="" theme="light" type="text" value="">
          <mock:shadow-root>
            <div class="responsive wrapper">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" autofocus="" class="text-8x1 text-mono use-margin" id="field-0" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-1" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-2" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-3" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-4" maxlength="1" type="text">
            </div>
          </mock:shadow-root>
        </tec-code-input>
      `)
    })

    it('should not render with responsive class', async () => {
      const page = await newSpecPage({
        components: [CodeInput],
        html: '<tec-code-input responsive="false"></tec-code-input>'
      })
      expect(page.root).toEqualHtml(`
        <tec-code-input autofocus="" length="5" placeholder="" responsive="false" theme="light" type="text" value="">
          <mock:shadow-root>
            <div class="wrapper">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" autofocus="" class="text-8x1 text-mono use-margin" id="field-0" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-1" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-2" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-3" maxlength="1" type="text">
              <input autocapitalize="false" value=" " placeholder="" autocomplete="false" class="text-8x1 text-mono use-margin" id="field-4" maxlength="1" type="text">
            </div>
          </mock:shadow-root>
        </tec-code-input>
      `)
    })
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
      const comp = new CodeInput()
      expect(comp['buildArrayIterator'](2)).toEqual([null, null])
    })

    it('splitInitialValue()', () => {
      const comp = new CodeInput()
      comp['initialValue'] = ''
      expect(comp['splitInitialValue']()).toEqual([' ', ' ', ' ', ' ', ' '])

      comp['initialValue'] = '12345'
      expect(comp['splitInitialValue']()).toEqual(['1', '2', '3', '4', '5'])
    })

    it('splitPlaceholder()', () => {
      const comp = new CodeInput()
      comp.placeholder = '1234'
      expect(comp['splitPlaceholder']()).toEqual(['1', '2', '3', '4'])
    })

    it('buildFinalValue()', () => {
      const comp = new CodeInput()
      comp['internalValue'] = ['1', '2', '3']
      expect(comp['buildFinalValue']()).toEqual('123')

      comp['internalValue'] = []
      expect(comp['buildFinalValue']()).toEqual('')
    })
  })
})
