import { DateTime } from 'luxon';

import { getDateTimeToMills } from '@trade-alerts/shared/util-common';

import { DateRange } from './data-filters.model';

const defaultFrom: DateTime = DateTime.now().minus({ days: 22 });
const defaultTo: DateTime = DateTime.now();
export const defaultDateRange: DateRange = {
  from: getDateTimeToMills(defaultFrom),
  to: getDateTimeToMills(defaultTo),
};
