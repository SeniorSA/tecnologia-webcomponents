import { newSpecPage } from '@stencil/core/testing';
import { TecStringCase } from '../../../../models/case.model';
import { CodeInput } from '../code-input';

describe('code-input', () => {
  it('render with default values', async () => {
    const page = await newSpecPage({
      components: [CodeInput],
      html: '<tec-code-input></tec-code-input>',
    });
    expect(page.root).toEqualHtml(`
      <tec-code-input autofocus="" length="5" placeholder="" theme="light" type="text" value="">
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
    `);
  });

  describe('methods', () => {
    it('buildFinalValue()', async () => {
      const comp = new CodeInput();
      comp['internalValue'] = ['0', '1', '2', '3', '4'];
      expect(comp['buildFinalValue']()).toEqual('01234');

      comp['internalValue'] = [];
      expect(comp['buildFinalValue']()).toEqual('');
    });

    it('buildArrayIterator()', () => {
      const comp = new CodeInput();
      expect(comp['buildArrayIterator'](2)).toEqual([null, null]);
    });

    it('splitInitialValue()', () => {
      const comp = new CodeInput();
      comp['initialValue'] = '';
      expect(comp['splitInitialValue']()).toEqual([' ', ' ', ' ', ' ', ' ']);

      comp['initialValue'] = '12345';
      expect(comp['splitInitialValue']()).toEqual(['1', '2', '3', '4', '5']);
    });

    it('splitPlaceholder()', () => {
      const comp = new CodeInput();
      comp.placeholder = '1234';
      expect(comp['splitPlaceholder']()).toEqual(['1', '2', '3', '4']);
    });

    it('buildFinalValue()', () => {
      const comp = new CodeInput();
      comp['internalValue'] = ['1', '2', '3'];
      expect(comp['buildFinalValue']()).toEqual('123');

      comp['internalValue'] = [];
      expect(comp['buildFinalValue']()).toEqual('');
    });

    describe('valueChanges', () => {
      it('different value', () => {
        const comp = new CodeInput();
        const valueChangesHandler = jest.spyOn(comp.codeChange, 'emit');

        jest.spyOn(comp as any, 'getInputByIndex').mockImplementation();

        comp.valueChanges('12', '1');

        expect(valueChangesHandler).toHaveBeenCalledWith({ value: '12' });
      });

      it('same value', () => {
        const comp = new CodeInput();
        const valueChangesHandler = jest.spyOn(comp.codeChange, 'emit');

        jest.spyOn(comp as any, 'getInputByIndex').mockImplementation();

        comp.valueChanges('12', '12');

        expect(valueChangesHandler).not.toHaveBeenCalled();
      });
    });

    it('placeholderChanges ', () => {
      const comp = new CodeInput();
      comp.placeholder = '123';

      comp.placeholderChanges();

      expect(comp['internalPlaceholder']).toEqual(['1', '2', '3']);
    });

    describe('clear', () => {
      describe('has length', () => {
        it('has initialValue', async () => {
          const comp = new CodeInput();
          const eventSpy = jest
            .spyOn(comp as any, 'clearWithInitialValue')
            .mockImplementation();
          const codeChangeEvent = jest
            .spyOn(comp.codeChange, 'emit')
            .mockImplementation();
          const clearedEvent = jest.spyOn(comp.cleared, 'emit').mockImplementation();

          comp.length = 5;
          comp.initialValue = '12345';

          await comp.clear();

          expect(eventSpy).toHaveBeenCalled();
          expect(codeChangeEvent).toHaveBeenCalledWith({ value: '' });
          expect(clearedEvent).toHaveBeenCalled();
        });

        it('has not initialValue', async () => {
          const comp = new CodeInput();
          const eventSpy = jest
            .spyOn(comp as any, 'clearWithoutInitialValue')
            .mockImplementation();
          const codeChangeEvent = jest
            .spyOn(comp.codeChange, 'emit')
            .mockImplementation();
          const clearedEvent = jest.spyOn(comp.cleared, 'emit').mockImplementation();
          comp.length = 5;
          comp.initialValue = '';

          await comp.clear();

          expect(eventSpy).toHaveBeenCalled();
          expect(codeChangeEvent).toHaveBeenCalledWith({ value: '' });
          expect(clearedEvent).toHaveBeenCalled();
        });
      });

      describe('has not length', () => {
        it('should not call clearWithInitialValue', async () => {
          const comp = new CodeInput();
          const eventSpy = jest
            .spyOn(comp as any, 'clearWithInitialValue')
            .mockImplementation();
          const codeChangeEvent = jest
            .spyOn(comp.codeChange, 'emit')
            .mockImplementation();
          const clearedEvent = jest.spyOn(comp.cleared, 'emit').mockImplementation();
          comp.length = 0;
          comp.initialValue = '12345';

          await comp.clear();

          expect(eventSpy).not.toHaveBeenCalled();
          expect(codeChangeEvent).not.toHaveBeenCalledWith({ value: '' });
          expect(clearedEvent).not.toHaveBeenCalled();
        });

        it('should not call clearWithoutInitialValue', async () => {
          const comp = new CodeInput();
          const eventSpy = jest
            .spyOn(comp as any, 'clearWithoutInitialValue')
            .mockImplementation();
          const codeChangeEvent = jest
            .spyOn(comp.codeChange, 'emit')
            .mockImplementation();
          const clearedEvent = jest.spyOn(comp.cleared, 'emit').mockImplementation();
          comp.length = 0;
          comp.initialValue = '';

          await comp.clear();

          expect(eventSpy).not.toHaveBeenCalled();
          expect(codeChangeEvent).not.toHaveBeenCalledWith({ value: '' });
          expect(clearedEvent).not.toHaveBeenCalled();
        });
      });
    });

    describe('inputInputHandler', () => {
      it('should set value with 1', () => {
        const comp = new CodeInput();

        comp['internalValue'] = [];
        const handleCompletedSpy = jest
          .spyOn(comp as any, 'handleCompletedEvent')
          .mockImplementation();
        const buildFinalValue = jest.spyOn(comp as any, 'buildFinalValue');
        const getInputSpy = jest
          .spyOn(comp as any, 'getInputByIndex')
          .mockReturnValue({ value: '1' });
        const inputChangeSpy = jest.spyOn(comp.inputChange, 'emit').mockImplementation();

        comp['inputInputHandler']({} as InputEvent, 0);

        expect(inputChangeSpy).toHaveBeenCalledWith({ event: {}, value: '1' });
        expect(getInputSpy).toHaveBeenCalledWith(0);
        expect(comp['internalValue'][0]).toEqual('1');
        expect(comp.value).toEqual('1');
        expect(buildFinalValue).toHaveBeenCalled();
        expect(handleCompletedSpy).toHaveBeenCalled();
      });

      it("should set value with ' '", () => {
        const comp = new CodeInput();

        const handleCompletedSpy = jest
          .spyOn(comp as any, 'handleCompletedEvent')
          .mockImplementation();
        comp['internalValue'] = ['1'];
        const buildFinalValue = jest.spyOn(comp as any, 'buildFinalValue');
        const getInputSpy = jest
          .spyOn(comp as any, 'getInputByIndex')
          .mockReturnValue({ value: '' });
        const inputChangeSpy = jest.spyOn(comp.inputChange, 'emit').mockImplementation();

        comp['inputInputHandler']({} as InputEvent, 1);

        expect(inputChangeSpy).toHaveBeenCalledWith({ event: {}, value: '' });
        expect(getInputSpy).toHaveBeenCalledWith(1);
        expect(comp['internalValue'][1]).toEqual(' ');
        expect(comp['internalValue'][0]).toEqual('1');
        expect(buildFinalValue).toHaveBeenCalled();
        expect(handleCompletedSpy).toHaveBeenCalled();
        expect(comp.value).toEqual('1 ');
      });

      it('should set value with lowerCase', () => {
        const comp = new CodeInput();
        comp['internalValue'] = [];
        const handleCompletedSpy = jest
          .spyOn(comp as any, 'handleCompletedEvent')
          .mockImplementation();
        comp.case = TecStringCase.LOWERCASE;
        jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue({ value: 'A' });

        comp['inputInputHandler']({} as InputEvent, 0);

        expect(comp['internalValue'][0]).toEqual('a');
        expect(handleCompletedSpy).toHaveBeenCalled();
      });

      it('should set value with upperCase', () => {
        const comp = new CodeInput();
        comp['internalValue'] = [];
        const handleCompletedSpy = jest
          .spyOn(comp as any, 'handleCompletedEvent')
          .mockImplementation();
        comp.case = TecStringCase.UPPERCASE;
        jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue({ value: 'a' });

        comp['inputInputHandler']({} as InputEvent, 0);

        expect(comp['internalValue'][0]).toEqual('A');
        expect(handleCompletedSpy).toHaveBeenCalled();
      });

      describe('next input', () => {
        it('should focus nextInput', () => {
          const comp = new CodeInput();
          comp['internalValue'] = [];
          comp.length = 2;
          const handleCompletedSpy = jest
            .spyOn(comp as any, 'handleCompletedEvent')
            .mockImplementation();
          const event = { value: 'a', focus: () => undefined };
          const focusSpy = jest.spyOn(event, 'focus');
          const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(event);

          comp['inputInputHandler']({ data: {} } as InputEvent, 0);

          expect(spy).toHaveBeenCalledTimes(2);
          expect(spy).toHaveBeenCalledWith(1);
          expect(focusSpy).toHaveBeenCalled();
          expect(handleCompletedSpy).toHaveBeenCalled();
        });

        it('should not focus nextInput', () => {
          const comp = new CodeInput();
          comp['internalValue'] = ['1'];
          comp.length = 2;
          const handleCompletedSpy = jest
            .spyOn(comp as any, 'handleCompletedEvent')
            .mockImplementation();
          const event = { value: 'a', focus: () => undefined };
          const focusSpy = jest.spyOn(event, 'focus');
          const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(event);

          comp['inputInputHandler']({ data: {} } as InputEvent, 1);

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).not.toHaveBeenCalledWith(3);
          expect(focusSpy).not.toHaveBeenCalled();
          expect(handleCompletedSpy).toHaveBeenCalled();
        });

        it('should not focus nextInput', () => {
          const comp = new CodeInput();
          comp['internalValue'] = ['1'];
          comp.length = 3;
          const handleCompletedSpy = jest
            .spyOn(comp as any, 'handleCompletedEvent')
            .mockImplementation();
          const event = { value: 'a', focus: () => undefined };
          const focusSpy = jest.spyOn(event, 'focus');
          const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(event);

          comp['inputInputHandler']({} as InputEvent, 1);

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).not.toHaveBeenCalledWith(3);
          expect(focusSpy).not.toHaveBeenCalled();
          expect(handleCompletedSpy).toHaveBeenCalled();
        });
      });
    });

    describe('inputFocusHandler', () => {
      it('should focus', () => {
        const comp = new CodeInput();
        const event = { id: 1, value: 'a', select: () => undefined };
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(event);
        const inputFocusEventSpy = jest
          .spyOn(comp.inputFocus, 'emit')
          .mockImplementation();
        const codeFocusEventSpy = jest.spyOn(comp.codeFocus, 'emit').mockImplementation();
        const selectSpy = jest.spyOn(event, 'select');

        comp['inputFocusHandler']({} as any, 0);

        expect(spy).toHaveBeenCalledWith(0);
        expect(selectSpy).toHaveBeenCalled();
        expect(inputFocusEventSpy).toHaveBeenCalledWith({
          event: {},
          value: { id: 1, index: 0, value: 'a' },
        });
        expect(codeFocusEventSpy).toHaveBeenCalled();
      });

      it('should not focus', () => {
        const comp = new CodeInput();
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(undefined);
        const inputFocusEventSpy = jest
          .spyOn(comp.inputFocus, 'emit')
          .mockImplementation();
        const codeFocusEventSpy = jest.spyOn(comp.codeFocus, 'emit').mockImplementation();

        comp['inputFocusHandler']({} as any, 0);

        expect(spy).toHaveBeenCalledWith(0);
        expect(inputFocusEventSpy).not.toHaveBeenCalled();
        expect(codeFocusEventSpy).toHaveBeenCalled();
      });
    });

    describe('inputKeyupHandler', () => {
      it('should set input value with lowercase', () => {
        const comp = new CodeInput();
        comp.case = TecStringCase.LOWERCASE;
        const event = { value: 'A' };
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(event);

        comp['inputKeyupHandler']({} as KeyboardEvent, 0);

        expect(spy).toHaveBeenCalledWith(0);
        expect(event.value).toEqual('a');
      });

      it('should set input value with uppeercase', () => {
        const comp = new CodeInput();
        comp.case = TecStringCase.UPPERCASE;
        const event = { value: 'a' };
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(event);

        comp['inputKeyupHandler']({} as KeyboardEvent, 0);

        expect(spy).toHaveBeenCalledWith(0);
        expect(event.value).toEqual('A');
      });

      it('should not set input value', () => {
        const comp = new CodeInput();
        comp.case = TecStringCase.UPPERCASE;
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(undefined);

        comp['inputKeyupHandler']({} as KeyboardEvent, 0);

        expect(spy).toHaveBeenCalledWith(0);
      });
    });

    describe('inputKeyDown', () => {
      jest.useFakeTimers();
      it('Backspace', () => {
        const comp = new CodeInput();
        const spy = jest.spyOn(comp as any, 'focusOnPreviousInput').mockImplementation();

        comp['inputKeyDown']({ code: 'Backspace' } as KeyboardEvent, 0);

        jest.runOnlyPendingTimers();

        expect(spy).toHaveBeenCalledWith(0);
      });

      it('ArrowLeft', () => {
        const comp = new CodeInput();
        const spy = jest.spyOn(comp as any, 'focusOnPreviousInput').mockImplementation();

        comp['inputKeyDown']({ code: 'ArrowLeft' } as KeyboardEvent, 0);

        expect(spy).toHaveBeenCalledWith(0);
      });

      it('ArrowRight', () => {
        const comp = new CodeInput();
        const spy = jest.spyOn(comp as any, 'focusOnNextInput').mockImplementation();

        comp['inputKeyDown']({ code: 'ArrowRight' } as KeyboardEvent, 0);

        expect(spy).toHaveBeenCalledWith(0);
      });

      it('should not call', () => {
        const comp = new CodeInput();
        const next = jest.spyOn(comp as any, 'focusOnNextInput').mockImplementation();
        const previus = jest
          .spyOn(comp as any, 'focusOnPreviousInput')
          .mockImplementation();

        comp['inputKeyDown']({ code: 'Escape' } as KeyboardEvent, 0);

        expect(next).not.toHaveBeenCalled();
        expect(previus).not.toHaveBeenCalled();
      });
    });

    it('inputBlurHandler', () => {
      const comp = new CodeInput();
      const inputBlur = jest.spyOn(comp.inputBlur, 'emit').mockImplementation();
      const codeBlur = jest.spyOn(comp.codeBlur, 'emit').mockImplementation();
      const spy = jest
        .spyOn(comp as any, 'getInputByIndex')
        .mockReturnValue({ id: 1, value: 'a' });

      comp['inputBlurHandler']({} as FocusEvent, 0);

      expect(spy).toHaveBeenCalledWith(0);
      expect(inputBlur).toHaveBeenCalledWith({
        event: {},
        value: { id: 1, index: 0, value: 'a' },
      });
      expect(codeBlur).toHaveBeenCalled()
    });

    describe('inputFocusAndSelect', () => {
      jest.useFakeTimers();
      it('should select input', () => {
        const comp = new CodeInput();
        const input = { focus: () => undefined, select: () => undefined }
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(input);
        const focusSpy = jest.spyOn(input, 'focus');
        const selectSpy = jest.spyOn(input, 'select');

        comp['inputFocusAndSelect'](0, true)

        jest.runOnlyPendingTimers();

        expect(spy).toHaveBeenCalledWith(0)
        expect(focusSpy).toHaveBeenCalled()
        expect(selectSpy).toHaveBeenCalled()
      })

      it('should not select input', () => {
        const comp = new CodeInput();
        const input = { focus: () => undefined, select: () => undefined }
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(input);
        const focusSpy = jest.spyOn(input, 'focus');
        const selectSpy = jest.spyOn(input, 'select');

        comp['inputFocusAndSelect'](0)

        expect(spy).toHaveBeenCalledWith(0)
        expect(focusSpy).toHaveBeenCalled()
        expect(selectSpy).not.toHaveBeenCalled()
      })

      it('has not input', () => {
        const comp = new CodeInput();
        const input = undefined
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(input);

        comp['inputFocusAndSelect'](0)

        expect(spy).toHaveBeenCalledWith(0)
      })
    })

    describe('focusOnNextInput', () => {
      it('should focus next input', () => {
        const comp = new CodeInput();
        const spy = jest.spyOn(comp as any, 'inputFocusAndSelect').mockImplementation()

        comp['focusOnNextInput'](1)

        expect(spy).toHaveBeenCalledWith(2, true)
      })

      it('should focus and select next input', () => {
        const comp = new CodeInput();
        comp.length = 2
        const spy = jest.spyOn(comp as any, 'inputFocusAndSelect').mockImplementation()

        comp['focusOnNextInput'](2)

        expect(spy).not.toHaveBeenCalled()
      })
    })

    describe('focusOnPreviousInput', () => {
      it('should not focus previous input', () => {
        const comp = new CodeInput();
        const spy = jest.spyOn(comp as any, 'inputFocusAndSelect').mockImplementation()

        comp['focusOnPreviousInput'](1)

        expect(spy).toHaveBeenCalledWith(0, true)
      })
    })

    describe('valueChangesHandler', () => {
      it('has new value', () => {
        const comp = new CodeInput();
        comp.length = 1
        const input = { value: '' }
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(input);
        const codeChange = jest.spyOn(comp.codeChange, 'emit').mockImplementation()

        comp['valueChangesHandler']('a');

        expect(input.value).toEqual('a')
        expect(spy).toHaveBeenCalledWith(0)
        expect(codeChange).toHaveBeenCalledWith({value: 'a'})
      })

      it('has not new value', () => {
        const comp = new CodeInput();
        comp.length = 1
        const input = { value: '' }
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(input);
        const codeChange = jest.spyOn(comp.codeChange, 'emit').mockImplementation()

        comp['valueChangesHandler'](' ');

        expect(input.value).toEqual(' ')
        expect(spy).toHaveBeenCalledWith(0)
        expect(codeChange).toHaveBeenCalledWith({value: ''})
      })

      it('should call getInputByIndex', () => {
        const comp = new CodeInput();
        comp.length = 3
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockImplementation()
        const codeChange = jest.spyOn(comp.codeChange, 'emit').mockImplementation()

        comp['valueChangesHandler']('abc');


        expect(spy).toHaveBeenCalledTimes(3)
        expect(spy).toHaveBeenNthCalledWith(1, 0)
        expect(spy).toHaveBeenNthCalledWith(2, 1)
        expect(spy).toHaveBeenNthCalledWith(3, 2)
        expect(codeChange).toHaveBeenCalledWith({value: 'abc'})
      })
    })

    it('clearWithInitialValue', () => {
      const comp = new CodeInput();
      comp.value = 'ab'
      comp.initialValue = '12'
      const initSpy = jest.spyOn(comp as any, 'initInternalValue').mockImplementation()
      const placeholderSpy = jest.spyOn(comp as any, 'splitPlaceholder').mockImplementation()

      comp['clearWithInitialValue']()

      expect(comp.value).toEqual(comp.initialValue)
      expect(initSpy).toHaveBeenCalled()
      expect(placeholderSpy).toHaveBeenCalled()
    })

    describe('clearWithoutInitialValue', () => {

      it('should set input value', () => {
        const comp = new CodeInput();
        comp.length = 1
        comp.value = 'a'
        const initSpy = jest.spyOn(comp as any, 'initInternalValue').mockImplementation()
        const input = { value: '' }
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockReturnValue(input);

        comp['clearWithoutInitialValue']()

        expect(comp.value).toEqual('')
        expect(initSpy).toHaveBeenCalled()
        expect(spy).toHaveBeenCalled()
      })

      it('multiple times', () => {
        const comp = new CodeInput();
        comp.length = 3
        comp.value = 'abc'
        const initSpy = jest.spyOn(comp as any, 'initInternalValue').mockImplementation()
        const spy = jest.spyOn(comp as any, 'getInputByIndex').mockImplementation()

        comp['clearWithoutInitialValue']()

        expect(comp.value).toEqual('')
        expect(initSpy).toHaveBeenCalled()
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenNthCalledWith(1, 0)
        expect(spy).toHaveBeenNthCalledWith(2, 1)
        expect(spy).toHaveBeenNthCalledWith(3, 2)
      })
    })

    describe('handleCompletedEvent', () => {
      it('should emit', () => {
        const comp = new CodeInput();
        comp.value = '123'
        comp.length = 3
        const spy = jest.spyOn(comp.completed, 'emit').mockImplementation()

        comp['handleCompletedEvent']()

        expect(spy).toHaveBeenCalledWith({value: '123'})
      })

      it('should not emit', () => {
        const comp = new CodeInput();
        comp.value = '123'
        comp.length = 4
        const spy = jest.spyOn(comp.completed, 'emit').mockImplementation()

        comp['handleCompletedEvent']()

        expect(spy).not.toHaveBeenCalled()
      })
    })

  });
});
