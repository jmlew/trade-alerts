import { defaultDateRange } from './data-filters.constants';
import { FilterParam, FiltersType } from './data-filters.enum';
import { DataFilters, DateRange } from './data-filters.model';

export function getDataFiltersFromSearchParams(params: URLSearchParams): DataFilters {
  const type: FiltersType = getInitialFilterTypeFromSearchParams(params);
  switch (type) {
    case FiltersType.AlertId:
      return { type, alertId: getAlertIdFromSearchParams(params) || 0 };
    case FiltersType.DateRange:
    default: {
      const dateRange: DateRange = getDateRangeFromSearchParams(params);
      return { type, from: dateRange.from, to: dateRange.to };
    }
  }
}

export function getSearchParamsFromDataFilters(filters: DataFilters): URLSearchParams {
  const params: URLSearchParams = new URLSearchParams();
  Object.keys(filters).forEach((key: keyof DataFilters) => {
    params.append(key, JSON.stringify(filters[key]));
  });
  return params;
}

export function getDefaultFilterType(type: FiltersType): FiltersType {
  return type === 1 ? FiltersType.AlertId : FiltersType.DateRange;
}

export function getInitialFilterTypeFromSearchParams(
  params: URLSearchParams
): FiltersType {
  return getAlertIdFromSearchParams(params) ? FiltersType.AlertId : FiltersType.DateRange;
}

export function getDateRangeFromSearchParams(params: URLSearchParams): DateRange {
  const from: string = params.get(FilterParam.DateFrom) || `${defaultDateRange.from}`;
  const to: string = params.get(FilterParam.DateTo) || `${defaultDateRange.to}`;
  return { from: parseInt(from, 10), to: parseInt(to, 10) };
}

export function getAlertIdFromSearchParams(params: URLSearchParams): number | null {
  const id: string | null = params.get(FilterParam.AlertId) || null;
  return id != null ? parseInt(id, 10) : null;
}
