import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DateRange, FiltersType, defaultDateRange } from '@kdb-dash/dashboard/domain';
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
  const { filtersParams } = useParams();
  // TODO: Get filters type from params and set initial.
  const [type, setType] = useState<FiltersType>(FiltersType.AlertId);
  // TODO: Get alertId from params and set initial.
  const [alertId, setAlertId] = useState<string>('');
  // TODO: Get dateRange from params and set initial.
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);

  useEffect(() => {
    switch (type) {
      case FiltersType.AlertId:
        console.log('alertId :>> ', alertId);
        break;
      case FiltersType.DateRange:
      default:
        console.log('dateRange :>> ', dateRange);
        break;
    }
  }, [dateRange, alertId, type]);

  function handleLoadData() {
    switch (type) {
      case FiltersType.AlertId:
        console.log('alertId :>> ', alertId);
        break;
      case FiltersType.DateRange:
      default:
        console.log('dateRange :>> ', dateRange);
        break;
    }
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
