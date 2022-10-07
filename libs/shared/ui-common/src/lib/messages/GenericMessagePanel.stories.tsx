import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GenericMessagePanel } from './GenericMessagePanel';

export default {
  title: 'Dash/Common/GenericMessagePanel',
  component: GenericMessagePanel,
} as ComponentMeta<typeof GenericMessagePanel>;

const Template: ComponentStory<typeof GenericMessagePanel> = (args) => (
  <GenericMessagePanel {...args} />
);

export const Main = Template.bind({});
Main.args = {};
