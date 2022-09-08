import { DateRange } from '@kdb-dash/dashboard/domain';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DateRangeInputs } from './DateRangeInputs';

const mockDateRanges: DateRange[] = [
  { from: 1660024561132, to: 1662616561138 },
  { from: 1675832161000, to: 1692856561000 },
];

function mockSetDateRange(dateRange: DateRange) {
  console.log('dateRange', dateRange);
}

export default {
  title: 'Dash/Controls/DateRangeInputs',
  component: DateRangeInputs,
  // parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    onSetDateRange: { action: 'onSetDateRange' },
  },
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Story />
      </LocalizationProvider>
    ),
  ],
} as ComponentMeta<typeof DateRangeInputs>;

const Template: ComponentStory<typeof DateRangeInputs> = (args) => (
  <DateRangeInputs {...args} />
);

export const Main = Template.bind({});
Main.args = {
  dateRange: mockDateRanges[0],
  onSetDateRange: mockSetDateRange,
};
