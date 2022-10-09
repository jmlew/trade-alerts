import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AlertInfo } from '@trade-alerts/dashboard/api';

import { getInitialFormValues } from '../entities/manager-alerts.util';
import { AlertUpdateForm } from './AlertUpdateForm';

export default {
  title: 'Dash/Alert/AlertUpdateForm',
  component: AlertUpdateForm,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof AlertUpdateForm>;

const Template: ComponentStory<typeof AlertUpdateForm> = (args) => (
  <AlertUpdateForm {...args} />
);

const alert: AlertInfo = {
  alertID: 1234001,
  status: 0,
  cif: '86018218400',
  cip: '3205428633',
  rmId: 'SC32989',
  rmName: 'Sam Cook',
  advisoryCenter: '1201',
  bookingCenter: '321',
  aum: 25.67,
  vulnerableClient: 1,
  portfolio: '3205428633',
};
const initialValues = getInitialFormValues(alert);
export const Main = Template.bind({});
Main.args = { initialValues };
