import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BtnDownloadData } from './BtnDownloadData';

export default {
  title: 'Dash/Controls/BtnDownloadData',
  component: BtnDownloadData,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof BtnDownloadData>;

const Template: ComponentStory<typeof BtnDownloadData> = (args) => (
  <BtnDownloadData {...args} />
);

export const Main = Template.bind({});
Main.args = {};
