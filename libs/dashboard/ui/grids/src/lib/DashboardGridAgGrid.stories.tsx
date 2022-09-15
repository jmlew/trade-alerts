import { ColDef } from 'ag-grid-community';

import { AlertInfo, DashboardDataGridField } from '@kdb-dash/dashboard/domain';
import { AlertInfoField } from '@kdb-dash/dashboard/util/grid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DashboardGridAgGrid } from './DashboardGridAgGrid';

export default {
  title: 'Dash/grids/DashboardGridAgGrid',
  component: DashboardGridAgGrid,
  decorators: [
    (Story) => (
      <div className="ag-theme-material">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof DashboardGridAgGrid>;

const Template: ComponentStory<typeof DashboardGridAgGrid> = (args) => (
  <DashboardGridAgGrid {...args} />
);

const mockData: AlertInfo[] = [
  {
    alertID: '1234001',
    cif: '86018218400',
    cip: '3205428633',
    rmId: 'SC32989',
    rmName: 'Sam Cook',
    advisoryCenter: '1201',
    bookingCenter: '321',
    aum: 25.67,
    vulnerableClient: 1,
    portfolio: '3205428633',
  },
  {
    alertID: '1234002',
    cif: '86018218411',
    cip: '3205428633',
    rmId: 'GR5422',
    rmName: 'Green Robert',
    advisoryCenter: '1201',
    bookingCenter: '323',
    aum: 120,
    vulnerableClient: 1,
    portfolio: '3205428633',
  },
  {
    alertID: '1234003',
    cif: '86018218412',
    cip: '3205428633',
    rmId: 'MS12229',
    rmName: 'Manish Singh',
    advisoryCenter: '1202',
    bookingCenter: '500',
    aum: 200,
    vulnerableClient: 0,
    portfolio: '3205428633',
  },
];

const mockConfigs: ColDef<DashboardDataGridField>[] = [
  { field: AlertInfoField.AlertId },
  { field: AlertInfoField.Cif },
  { field: AlertInfoField.Cip },
  { field: AlertInfoField.RmId },
  { field: AlertInfoField.RmName },
  { field: AlertInfoField.AdvisoryCenter },
  { field: AlertInfoField.BookingCenter },
  { field: AlertInfoField.Aum },
  { field: AlertInfoField.VulnerableClient },
  { field: AlertInfoField.Portfolio },
];

export const Main = Template.bind({});
Main.args = {
  data: mockData,
  configs: mockConfigs,
};
