import { FiltersType } from './data-filters.enum';

export interface DataFilters {
  type: FiltersType;
  alertId?: number;
  from?: number | string;
  to?: number | string;
}

export interface DateRange {
  from: number;
  to: number;
}

// Post is {alertId: 1234}
