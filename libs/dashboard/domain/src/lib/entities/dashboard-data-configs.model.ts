export interface DashboardDataConfig {
  field: string;
  headerName?: string;
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean';
  valueMap?: Map<any, string>;
  flex?: number;
}
