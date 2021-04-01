import { TecStringCase } from '../models/case.model'
import { caseStringHandler, removeStringWhiteSpace } from './utils'

describe('removeStringWhiteSpace()', () => {
  it('should remove random spaces', () => {
    expect(removeStringWhiteSpace('0 A 21')).toEqual('0A21')
    expect(removeStringWhiteSpace('0 A21')).toEqual('0A21')
  })

  it('should remove space on start', () => {
    expect(removeStringWhiteSpace(' 0A21')).toEqual('0A21')
  })

  it('should remove space on end', () => {
    expect(removeStringWhiteSpace('0A21 ')).toEqual('0A21')
  })
})

describe('caseHandler()', () => {
  it('default', () => {
    const upper = caseStringHandler('A', TecStringCase.DEFAULT)
    expect(upper).toEqual('A')

    const lower = caseStringHandler('a', TecStringCase.DEFAULT)
    expect(lower).toEqual('a')

    const convertedNumeric = caseStringHandler('1', TecStringCase.DEFAULT)
    expect(convertedNumeric).toEqual('1')
  })

  it('toLowerCase', () => {
    const uppercase = caseStringHandler('A', TecStringCase.LOWERCASE)
    expect(uppercase).toEqual('a')

    const lowercase = caseStringHandler('a', TecStringCase.LOWERCASE)
    expect(lowercase).toEqual('a')

    const convertedNumeric = caseStringHandler('1', TecStringCase.LOWERCASE)
    expect(convertedNumeric).toEqual('1')
  })

  it('toUppercase', () => {
    const lower = caseStringHandler('a', TecStringCase.UPPERCASE)
    expect(lower).toEqual('A')

    const upper = caseStringHandler('A', TecStringCase.UPPERCASE)
    expect(upper).toEqual('A')

    const convertedNumeric = caseStringHandler('1', TecStringCase.UPPERCASE)
    expect(convertedNumeric).toEqual('1')
  })
})
