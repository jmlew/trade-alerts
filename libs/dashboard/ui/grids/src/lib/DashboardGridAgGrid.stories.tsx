import { ColDef } from 'ag-grid-community';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  AlertInfo,
  DashboardDataConfig,
  DashboardDataGridField,
} from '@trade-alerts/dashboard/domain';

import { DashboardGridAgGrid } from './DashboardGridAgGrid';

export default {
  title: 'Dash/Grids/DashboardGridAgGrid',
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

export const Main = Template.bind({});
Main.args = {
  data: mockData(),
  configs: mockConfigs(),
};

function mockData(): AlertInfo[] {
  return [
    {
      alertID: 1234001,
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
      alertID: 1234002,
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
      alertID: 1234003,
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
}

const defaultConfig: Partial<DashboardDataConfig> = { flex: 1 };
function mockConfigs(): ColDef<DashboardDataGridField>[] {
  return [
    { ...defaultConfig, field: 'alertID', headerName: 'Alert ID' },
    { ...defaultConfig, field: 'cif', headerName: 'CIF' },
    { ...defaultConfig, field: 'cip', headerName: 'CIP' },
    { ...defaultConfig, field: 'rmId', headerName: 'RM ID' },
    { ...defaultConfig, field: 'rmName', headerName: 'RM Name' },
    { ...defaultConfig, field: 'advisoryCenter', headerName: 'Advisory Center' },
    { ...defaultConfig, field: 'bookingCenter', headerName: 'Booking Center' },
    { ...defaultConfig, field: 'aum', headerName: 'AUM' },
    { ...defaultConfig, field: 'vulnerableClient', headerName: 'Vulnerable Client' },
    { ...defaultConfig, field: 'portfolio', headerName: 'Portfolio' },
  ];
}
