import { AlertStatus, BinaryBoolean, BuySell } from './dashboard-data.enum';

export const alertStatuses: Map<AlertStatus, string> = new Map([
  [AlertStatus.StatusA, 'Close Alert'],
  [AlertStatus.StatusB, 'Needs Investigation'],
  [AlertStatus.StatusC, 'False Positive'],
]);

export const buySellTypes: Map<BuySell, string> = new Map([
  [BuySell.Buy, 'Buy'],
  [BuySell.Sell, 'Sell'],
]);

export const binaryBooleans: Map<BinaryBoolean, string> = new Map([
  [BinaryBoolean.True, 'True'],
  [BinaryBoolean.False, 'False'],
]);
