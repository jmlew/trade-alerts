import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AlertIdInput, DateRangeInputs } from '@trade-alerts/dashboard/ui/controls';
import {
  DateRange,
  FilterParam,
  FiltersType,
  getAlertIdFromSearchParams,
  getDateRangeFromSearchParams,
} from '@trade-alerts/shared/util-filters';

import { defaultDateRange } from '../entities/dates.constants';

interface DataSelectorContainerProps {
  type: FiltersType;
}

export function DataFiltersContainer({ type }: DataSelectorContainerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [alertId, setAlertId] = useState<number | null>(
    getAlertIdFromSearchParams(searchParams)
  );
  const [dateRange, setDateRange] = useState<DateRange>(
    getDateRangeFromSearchParams(searchParams, defaultDateRange)
  );

  useEffect(() => {
    switch (type) {
      case FiltersType.AlertId:
        searchParams.set(FilterParam.AlertId, alertId != null ? `${alertId}` : '');
        searchParams.delete(FilterParam.DateFrom);
        searchParams.delete(FilterParam.DateTo);
        setSearchParams(searchParams);
        break;
      case FiltersType.DateRange:
      default:
        searchParams.set(FilterParam.DateFrom, `${dateRange.from}`);
        searchParams.set(FilterParam.DateTo, `${dateRange.to}`);
        searchParams.delete(FilterParam.AlertId);
        setSearchParams(searchParams);
        break;
    }
  }, [dateRange, alertId, type]);

  function renderFilterType(type: FiltersType) {
    switch (type) {
      case FiltersType.AlertId:
        return <AlertIdInput value={alertId} onSetValue={setAlertId} />;
      case FiltersType.DateRange:
      default:
        return (
          <DateRangeInputs
            dateRange={dateRange}
            defaultDateRange={defaultDateRange}
            onSetDateRange={setDateRange}
          />
        );
    }
  }

  return renderFilterType(type);
}
