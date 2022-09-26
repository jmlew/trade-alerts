import { UiControlOption } from '@kdb-dash/shared/data-access';
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

export const options: UiControlOption[] = [
  {
    value: 'ScenarioA',
    label: 'Some Scenario',
  },
  {
    value: 'ScenarioB',
    label: 'Some Other Scenario',
  },
  {
    value: 'ScenarioC',
    label: 'And Another Scenario',
  },
];

export const Main = Template.bind({});
Main.args = {
  options,
};
