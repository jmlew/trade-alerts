import { DataFilters } from './data-filters.model';

export function getFiltersFromParams(
  params: Record<string, string | undefined>
): DataFilters {
  return {} as DataFilters;
}

export function getFiltersParams(filters: DataFilters) {
  return {};
}
