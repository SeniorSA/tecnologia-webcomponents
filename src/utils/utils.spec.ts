import { removeStringWhiteSpace } from './utils'

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
