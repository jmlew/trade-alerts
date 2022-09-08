import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DateRange,
  FilterSearchParam,
  FiltersType,
  getAlertIdFromSearchParams,
  getDateRangeFromSearchParams,
} from '@kdb-dash/dashboard/domain';
import { AlertIdInput, DateRangeInputs } from '@kdb-dash/dashboard/ui/controls';

interface DataSelectorContainerProps {
  type: FiltersType;
}

export function DataSelectorContainer({ type }: DataSelectorContainerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [alertId, setAlertId] = useState<number | null>(
    getAlertIdFromSearchParams(searchParams)
  );
  const [dateRange, setDateRange] = useState<DateRange>(
    getDateRangeFromSearchParams(searchParams)
  );

  useEffect(() => {
    switch (type) {
      case FiltersType.AlertId:
        searchParams.set(FilterSearchParam.AlertId, alertId != null ? `${alertId}` : '');
        searchParams.delete(FilterSearchParam.DateFrom);
        searchParams.delete(FilterSearchParam.DateTo);
        setSearchParams(searchParams);
        break;
      case FiltersType.DateRange:
      default:
        searchParams.set(FilterSearchParam.DateFrom, `${dateRange.from}`);
        searchParams.set(FilterSearchParam.DateTo, `${dateRange.to}`);
        searchParams.delete(FilterSearchParam.AlertId);
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
        return <DateRangeInputs dateRange={dateRange} onSetDateRange={setDateRange} />;
    }
  }

  return renderFilterType(type);
}
