import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AlertIdInput } from './AlertIdInput';

export default {
  title: 'Dash/Controls/AlertIdInput',
  component: AlertIdInput,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof AlertIdInput>;

const Template: ComponentStory<typeof AlertIdInput> = (args) => (
  <AlertIdInput {...args} />
);

export const Main = Template.bind({});
Main.args = {};
