import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AlertUpdateFormParams } from '../entities/manager-alerts.model';
import { AlertUpdateForm } from './AlertUpdateForm';

export default {
  title: 'Dash/Alert/AlertUpdateForm',
  component: AlertUpdateForm,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof AlertUpdateForm>;

const Template: ComponentStory<typeof AlertUpdateForm> = (args) => (
  <AlertUpdateForm {...args} />
);

const initialValues: AlertUpdateFormParams = {
  status: 0,
  comment: '',
};
export const Main = Template.bind({});
Main.args = { initialValues };
