export enum CodeInputCase {
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
  DEFAULT = 'default',
}

export interface CodeInputEvent<T> {
  event?: any;
  value?: T;
}

export interface CodeInputCustomEventValue {
  id: string;
  index: number;
  value: string;
}
