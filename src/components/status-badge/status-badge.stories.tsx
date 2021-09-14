import { withActions } from '@storybook/addon-actions';
import { withTests } from '@storybook/addon-jest';
import results from '../../../.jest-test-results.json';
import { TecStatus } from '../../models/status.model';
import readme from './readme.md';

export default {
  title: 'Components/Status badge',
  decorators: [
    StatusBadge => {
      return `
        <div style="height: 110vh; text-align: left; box-sizing: border-box; padding: 0 !important; margin: 0;">
          ${StatusBadge()}
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
    jest: ['status-badge.spec.tsx'],
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: Object.keys(TecStatus),
      },
      defaultValue: TecStatus.primary,
    },
    badgeText: {
      control: 'text',
      description: 'Badge text',
      defaultValue: 'Badge text',
    },
  },
};

const Template = ({ badgeText, status }) =>
  `<tec-status-badge badge-text="${badgeText}" status="${status}"></tec-status-badge>`;

export const Default = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  status: TecStatus.secondary
}

export const Success = Template.bind({});
Success.args = {
  status: TecStatus.success
}

export const Danger = Template.bind({});
Danger.args = {
  status: TecStatus.danger
}

export const Warn = Template.bind({});
Warn.args = {
  status: TecStatus.warn
}

export const Info = Template.bind({});
Info.args = {
  status: TecStatus.info
}


