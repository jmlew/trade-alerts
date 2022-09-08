import { DashOption } from './dashboards.model';
import { getDasboardOption } from './dashboards.util';
import { defaultDateRange } from './data-filters.constants';
import { FilterSearchParam, FiltersType } from './data-filters.enum';
import { DataFilters, DateRange } from './data-filters.model';

export function getDataFiltersFromSearchParams(params: URLSearchParams): DataFilters {
  const type: FiltersType = getInitialFilterType(params);
  switch (type) {
    case FiltersType.AlertId:
      return { type, alertId: getAlertIdFromSearchParams(params) || 0 };
    case FiltersType.DateRange:
    default:
      return { type, dateRange: getDateRangeFromSearchParams(params) };
  }
}

export function getInitialFilterType(params: URLSearchParams): FiltersType {
  return getAlertIdFromSearchParams(params) ? FiltersType.AlertId : FiltersType.DateRange;
}

export function getDateRangeFromSearchParams(params: URLSearchParams): DateRange {
  const from: string =
    params.get(FilterSearchParam.DateFrom) || `${defaultDateRange.from}`;
  const to: string = params.get(FilterSearchParam.DateTo) || `${defaultDateRange.to}`;
  return { from: parseInt(from, 10), to: parseInt(to, 10) };
}

export function getAlertIdFromSearchParams(params: URLSearchParams): number | null {
  const id: string | null = params.get(FilterSearchParam.AlertId) || null;
  return id != null ? parseInt(id, 10) : null;
}

export function getDashboardOptionFromSearchParams(params: URLSearchParams): DashOption {
  return getDasboardOption(params.get(FilterSearchParam.DashId) || '');
}
