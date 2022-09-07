import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DataFilters,
  DateRange,
  FilterSearchParam,
  FiltersType,
  getAlertIdFromSearchParams,
  getDataFiltersFromSearchParams,
  getDateRangeFromSearchParams,
  getInitialFilterType,
} from '@kdb-dash/dashboard/domain';
import {
  AlertIdInput,
  BtnLoadData,
  DateRangeInputs,
  FiltersTypeBtns,
} from '@kdb-dash/dashboard/ui/controls';
import { Box } from '@mui/material';

const styles = {
  root: {
    width: 0.5,
    minWidth: 750,
    height: 38,
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export function DataSelectorContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<FiltersType>(getInitialFilterType(searchParams));
  const [alertId, setAlertId] = useState<number | null>(
    getAlertIdFromSearchParams(searchParams)
  );
  const [dateRange, setDateRange] = useState<DateRange>(
    getDateRangeFromSearchParams(searchParams)
  );

  useEffect(() => {
    switch (type) {
      case FiltersType.AlertId:
        if (alertId == null) {
          return;
        }
        searchParams.set(FilterSearchParam.AlertId, `${alertId}`);
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

  function handleLoadData() {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    console.log('handleLoadData with filters :>> ', filters);
  }

  function renderFilterType(type: FiltersType) {
    switch (type) {
      case FiltersType.AlertId:
        return <AlertIdInput value={alertId} onSetValue={setAlertId} />;
      case FiltersType.DateRange:
      default:
        return <DateRangeInputs dateRange={dateRange} onSetDateRange={setDateRange} />;
    }
  }

  return (
    <Box sx={styles.root}>
      <FiltersTypeBtns type={type} onSetType={setType} />
      {renderFilterType(type)}
      <BtnLoadData isDisabled={false} onClick={handleLoadData} />
    </Box>
  );
}
