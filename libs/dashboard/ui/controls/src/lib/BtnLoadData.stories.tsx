import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BtnLoadData } from './BtnLoadData';

export default {
  title: 'Dash/Controls/BtnLoadData',
  component: BtnLoadData,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof BtnLoadData>;

const Template: ComponentStory<typeof BtnLoadData> = (args) => <BtnLoadData {...args} />;

export const Main = Template.bind({});
Main.args = {};
