import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EditButtonSmall } from './EditButtonSmall';

export default {
  title: 'Shared/Controls/EditButtonSmall',
  component: EditButtonSmall,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof EditButtonSmall>;

const Template: ComponentStory<typeof EditButtonSmall> = (args) => (
  <EditButtonSmall {...args} />
);

export const Main = Template.bind({});
Main.args = {};
