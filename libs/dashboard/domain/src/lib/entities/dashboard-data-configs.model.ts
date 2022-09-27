import { CellRenderType } from './dashboard-data-configs.constants';
export interface DashboardDataConfig {
  field: string;
  headerName?: string;
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean';
  valueMap?: Map<any, string>;
  cellRenderType?: CellRenderType;
  flex?: number;
}
