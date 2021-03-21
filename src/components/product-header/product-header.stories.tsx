import { withActions } from '@storybook/addon-actions';
import { withTests } from '@storybook/addon-jest';
import results from '../../../.jest-test-results.json';
import { TecnologiaTheme } from '../interfaces';
import readme from './readme.md';

export default {
  title: 'Components/Header',
  decorators: [
    Header => {
      return `
        <div style="height: 110vh; text-align: left; box-sizing: border-box; padding: 0 !important; margin: 0;">
          ${Header()}

          <h1>Hello World</h1>
        </div>
      `;
    },
    withTests({ results }),
    withActions('clicked'),
  ],
  parameters: {
    notes: {
      markdown: readme,
    },
    jest: ['tec-product-header.spec.tsx'],
  },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: Object.keys(TecnologiaTheme),
      },
      defaultValue: TecnologiaTheme.light,
    },
    titleProduct: {
      control: 'text',
      defaultValue: 'My product name',
      description: 'The name of your product to show on bar title.',
      type: {
        required: true,
      },
    },
    titleCursorPointer: {
      control: 'boolean',
      description: 'Show `cursor: pointer` when mouse hover on title.',
      defaultValue: true,
    },
    sticky: {
      control: 'boolean',
      description: 'Use as a sticky bar on top.',
      defaultValue: true,
    },
  },
};

const Template = ({ theme, titleProduct, titleCursorPointer, sticky }) =>
  `<tec-product-header
    theme="${theme}"
    title-product="${titleProduct}"
    title-cursor-pointer=${titleCursorPointer}
    sticky=${sticky}
  ></tec-product-header>`;

export const Default = Template.bind({});

export const StickyDisabled = Template.bind({});
StickyDisabled.args = {
  sticky: false,
};

export const DisabledCursorPointer = Template.bind({});
DisabledCursorPointer.args = {
  titleCursorPointer: false,
};
