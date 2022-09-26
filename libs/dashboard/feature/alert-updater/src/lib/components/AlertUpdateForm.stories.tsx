import { ComponentMeta, ComponentStory } from '@storybook/react';

import { getInitialFormValues } from '../entities/alert-updater.util';
import { AlertUpdateForm } from './AlertUpdateForm';

export default {
  title: 'Dash/Alert/AlertUpdateForm',
  component: AlertUpdateForm,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof AlertUpdateForm>;

const Template: ComponentStory<typeof AlertUpdateForm> = (args) => (
  <AlertUpdateForm {...args} />
);

const initialValues = getInitialFormValues();
export const Main = Template.bind({});
Main.args = { initialValues };
