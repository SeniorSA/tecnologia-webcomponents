import { withActions } from '@storybook/addon-actions';
import { withTests } from '@storybook/addon-jest';
import results from '../../../.jest-test-results.json';
import { TecnologiaTheme } from '../interfaces';
import { ButtonPosition } from './bottom-bar.model';
import readme from './readme.md';

export default {
  title: 'Components/Bottom bar',
  decorators: [
    BottomBar => {
      return `
        <div style="height: 110vh; text-align: left; box-sizing: border-box; padding: 0 !important; margin: 0;">
          ${BottomBar()}

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
    jest: ['tec-bottom-bar.spec.tsx'],
  },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: Object.keys(TecnologiaTheme),
      },
      defaultValue: TecnologiaTheme.light,
    },
    text: {
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel massa vestibulum, scelerisque justo sed, suscipit massa. Vestibulum tempor turpis vitae lacus lacinia, vel finibus eros pellentesque.',
      description: 'Use a text to Terms of Service and others.',
      type: {
        required: false,
      },
    },
    buttonPosition: {
      control: {
        type: 'select',
        options: Object.keys(ButtonPosition),
      },
      description: 'Position to show button.',
      defaultValue: ButtonPosition.right,
    },
    useAnimation: {
      control: 'boolean',
      description: 'Show when bar is loaded.',
      defaultValue: true,
    },
  },
};

const Template = ({ theme, text, buttonPosition, useAnimation }) =>
  `<tec-bottom-bar
    theme="${theme}"
    button-position="${buttonPosition}"
    text="${text}"
    use-animation=${useAnimation}
  >
  <tec-button slot="button" theme="${theme}" label="Accept" size="medium"></tec-button>
  </tec-bottom-bar>`;

export const Default = Template.bind({});

// export const StickyDisabled = Template.bind({});
// StickyDisabled.args = {
//   sticky: false,
// };
