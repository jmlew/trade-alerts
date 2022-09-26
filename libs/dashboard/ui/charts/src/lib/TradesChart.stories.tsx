import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TradesInfo } from '@trade-alerts/dashboard/domain';

import { TradeChartDataKeys, TradesChart } from './TradesChart';

export default {
  title: 'Dash/Charts/TradesChart',
  component: TradesChart,
  decorators: [
    (Story) => (
      <Box sx={{ width: 600, height: 400 }}>
        <Story />
      </Box>
    ),
  ],
} as ComponentMeta<typeof TradesChart>;

const Template: ComponentStory<typeof TradesChart> = (args) => <TradesChart {...args} />;

const dataKeys: TradeChartDataKeys = {
  dataKeyX: 'date',
  dataKeyYA: 'countBuy',
  dataKeyYB: 'countSell',
};

const data: TradesInfo[] = [
  {
    date: '08/01/2022',
    valueBuy: 1,
    valueSell: 1,
    countBuy: 29544,
    countSell: 39544,
  },
  {
    date: '08/02/2022',
    valueBuy: 0.56,
    valueSell: 0.56,
    countBuy: 4200,
    countSell: 1200,
  },
  {
    date: '08/03/2022',
    valueBuy: 1.2,
    valueSell: 1.2,
    countBuy: 2300,
    countSell: 2300,
  },
  {
    date: '08/04/2022',
    valueBuy: 2,
    valueSell: 2,
    countBuy: 43000,
    countSell: 43000,
  },
  {
    date: '08/05/2022',
    valueBuy: 0.92,
    valueSell: 0.92,
    countBuy: 98543,
    countSell: 98543,
  },
];

export const Main = Template.bind({});
Main.args = { data, dataKeys };
