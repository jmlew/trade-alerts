import { DateTime } from 'luxon';

import { DateRange } from './data-filters.model';

const defaultFrom: DateTime = DateTime.now().minus({ days: 30 });
const defaultTo: DateTime = DateTime.now();
export const defaultDateRange: DateRange = {
  from: defaultFrom.toMillis(),
  to: defaultTo.toMillis(),
};

export const dateTimeFormat = 'dd LLL yyyy';
