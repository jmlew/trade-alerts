import { dashboardOptions } from '@kdb-dash/dashboard/domain';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DashSelector } from './DashSelector';

export default {
  title: 'Dash/Controls/DashSelector',
  component: DashSelector,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof DashSelector>;

const Template: ComponentStory<typeof DashSelector> = (args) => (
  <DashSelector {...args} />
);

export const Main = Template.bind({});
Main.args = {
  options: dashboardOptions,
};
