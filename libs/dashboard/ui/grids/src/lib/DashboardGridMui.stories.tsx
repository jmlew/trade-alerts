import {
  AlertInfo,
  DashboardDataConfig,
  DashboardDataGridField,
} from '@kdb-dash/dashboard/domain';
import { GridColDef } from '@mui/x-data-grid';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DashboardGridMui } from './DashboardGridMui';

export default {
  title: 'Dash/Grids/DashboardGridMui',
  component: DashboardGridMui,
} as ComponentMeta<typeof DashboardGridMui>;

const Template: ComponentStory<typeof DashboardGridMui> = (args) => (
  <DashboardGridMui {...args} />
);

export const Main = Template.bind({});
Main.args = {
  data: mockData(),
  configs: mockConfigs(),
};

type MuiGridData<T> = T & { id: number };
function mockData(): MuiGridData<AlertInfo>[] {
  return [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
}

const defaultConfig: Partial<DashboardDataConfig> = { flex: 1 };
function mockConfigs(): GridColDef<DashboardDataGridField>[] {
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
