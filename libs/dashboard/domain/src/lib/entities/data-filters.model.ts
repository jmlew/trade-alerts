import { FiltersType } from './data-filters.enum';

export interface DataFilters {
  type: FiltersType;
  alertId?: number;
  dateRange?: DateRange;
}

export interface DateRange {
  from: number;
  to: number;
}
