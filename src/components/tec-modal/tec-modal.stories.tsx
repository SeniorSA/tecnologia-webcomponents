import { withActions } from '@storybook/addon-actions';
import { withTests } from '@storybook/addon-jest';
import results from '../../../.jest-test-results.json';
import { TecnologiaTheme } from '../interfaces';
import readme from './readme.md';
import { TecModalSize } from './tec.modal.model';

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
    backDrop: {
      control: 'boolean',
      description: 'Close modal when click outside',
      defaultValue: true,
    },
    size: {
      control: {
        type: 'select',
        options: Object.keys(TecModalSize),
      },
      defaultValue: TecModalSize.small,
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
  },
};

const Template = ({ theme, opened, modalTitle, showCloseIcon, backDrop, size, fullWidth = false, closeOnEscape }) =>
  `<tec-modal
      theme="${theme}"
      opened="${opened}"
      modalTitle="${modalTitle}"
      showCloseIcon="${showCloseIcon}"
      backDrop="${backDrop}"
      size="${size}"
      fullWidth="${fullWidth}"
      closeOnEscape="${closeOnEscape}"
  >
  <div slot="content">
    <span>content here</span>
  </div>
  <div slot="footer" style="width: 100%; display: flex;">
  <tec-button buttonId="1" label="Confirm" size="small" mode="rounded" status="success" style="margin-left: auto;"></tec-button>
  </div>
</tec-modal>`;

export const Default = Template.bind({});

export const DarkMode = Template.bind({});
DarkMode.args = {
  theme: 'dark',
};

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
  size: TecModalSize.tiny,
};

export const SmallModal = Template.bind({});
SmallModal.args = {
  size: TecModalSize.small,
};

export const MediumModal = Template.bind({});
MediumModal.args = {
  size: TecModalSize.medium,
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  size: TecModalSize.large,
};

export const GiantModal = Template.bind({});
GiantModal.args = {
  size: TecModalSize.giant,
};

export const RemoveCloseOnClickOut = Template.bind({});
RemoveCloseOnClickOut.args = {
  backDrop: false,
};

export const RemoveCloseOnPressEscape = Template.bind({});
RemoveCloseOnPressEscape.args = {
  closeOnEscape: false,
};
