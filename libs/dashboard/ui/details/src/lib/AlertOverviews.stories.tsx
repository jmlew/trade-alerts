import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AlertOverviewInfo } from '@trade-alerts/dashboard/domain';

import { AlertOverviews } from './AlertOverviews';

export default {
  title: 'Dash/Details/AlertOverviews',
  component: AlertOverviews,
  argTypes: {
    onSetType: { action: 'onSetType' },
  },
} as ComponentMeta<typeof AlertOverviews>;

const Template: ComponentStory<typeof AlertOverviews> = (args) => (
  <AlertOverviews {...args} />
);

const overviews: AlertOverviewInfo[] = [
  {
    field: 'alertID',
    heading: 'Alert ID',
    values: [1234001, 1234002, 1234003],
  },
  {
    field: 'rmId',
    heading: 'RM ID',
    values: ['SC32989', 'GR5422', 'MS12229'],
  },
  {
    field: 'cif',
    heading: 'CIF',
    values: ['86018218400', '86018218411', '86018218412'],
  },
  {
    field: 'portfolio',
    heading: 'Portfolio',
    values: ['3205428633', '3205428633', '3205428633'],
  },
];

export const Main = Template.bind({});
Main.args = { overviews };
