import { withActions } from '@storybook/addon-actions';
import { withTests } from '@storybook/addon-jest';
import results from '../../../.jest-test-results.json';
import { TecSize } from '../../models/size.model';
import { TecnologiaTheme } from '../interfaces';
import readme from './readme.md';

export default {
  title: 'Components/Modal',
  decorators: [
    Modal => {
      return `
        <div style="height: 110vh; text-align: left; box-sizing: border-box; padding: 0 !important; margin: 0;">
          ${Modal()}

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
    jest: ['tec-modal.spec.tsx'],
  },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: Object.keys(TecnologiaTheme),
      },
      defaultValue: TecnologiaTheme.light,
    },
    opened: {
      control: 'boolean',
      description: 'Show or hide modal',
      defaultValue: true,
    },
    modalTitle: {
      control: 'text',
      description: 'Modal title',
      defaultValue: 'Modal Title',
    },
    showCloseIcon: {
      control: 'boolean',
      description: 'Show close icon',
      defaultValue: true,
    },
    dismissOnBackdrop: {
      control: 'boolean',
      description: 'Close modal when click outside',
      defaultValue: true,
    },
    size: {
      control: {
        type: 'select',
        options: Object.keys(TecSize),
      },
      defaultValue: TecSize.small,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Set modal width 100%',
      defaultValue: false,
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when press Escape',
      defaultValue: true,
    },
    blockScroll: {
      control: 'boolean',
      description: 'Block scroll',
      defaultValue: true,
    },
  },
};

const Template = ({ theme, opened, modalTitle, showCloseIcon, dismissOnBackdrop, size, fullWidth = false, closeOnEscape, blockScroll}) =>
  `<tec-modal
      theme="${theme}"
      opened="${opened}"
      modal-title="${modalTitle}"
      show-close-icon="${showCloseIcon}"
      dimiss-on-backdrop="${dismissOnBackdrop}"
      size="${size}"
      full-width="${fullWidth}"
      close-on-escape="${closeOnEscape}"
      block-scroll="${blockScroll}"
  >
  <div slot="content">
    <span>content here</span>
  </div>
  <div slot="footer" style="width: 100%; display: flex;">
  <tec-button buttonId="1" label="Confirm" size="small" mode="rounded" status="success" style="margin-left: auto;"></tec-button>
  </div>
</tec-modal>`;

export const Default = Template.bind({});

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const RemoveCloseIcon = Template.bind({});
RemoveCloseIcon.args = {
  showCloseIcon: false,
};

export const TinyModal = Template.bind({});
TinyModal.args = {
  size: TecSize.tiny,
};

export const SmallModal = Template.bind({});
SmallModal.args = {
  size: TecSize.small,
};

export const MediumModal = Template.bind({});
MediumModal.args = {
  size: TecSize.medium,
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  size: TecSize.large,
};

export const GiantModal = Template.bind({});
GiantModal.args = {
  size: TecSize.giant,
};

export const RemoveCloseOnClickOut = Template.bind({});
RemoveCloseOnClickOut.args = {
  dismissOnBackdrop: false,
};

export const RemoveCloseOnPressEscape = Template.bind({});
RemoveCloseOnPressEscape.args = {
  closeOnEscape: false,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  theme: 'dark',
};
