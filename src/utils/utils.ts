import { TecStringCase } from '../models/case.model'

export function removeStringWhiteSpace (text: string): string {
  return text.replace(/\s/g, '')
}

export function caseStringHandler (value: string, toCase: TecStringCase): string {
  if (toCase === TecStringCase.LOWERCASE) return value.toLowerCase()
  if (toCase === TecStringCase.UPPERCASE) return value.toUpperCase()
  return value
}
