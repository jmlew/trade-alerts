export interface DataFilters extends DateRange {
  alertId: number;
}

export interface DateRange {
  from: number;
  to: number;
}
