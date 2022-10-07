import { BinaryBoolean, BuySell } from './dashboard-data.enum';

export const buySellTypes: Map<BuySell, string> = new Map([
  [BuySell.Buy, 'Buy'],
  [BuySell.Sell, 'Sell'],
]);

export const binaryBooleans: Map<BinaryBoolean, string> = new Map([
  [BinaryBoolean.True, 'True'],
  [BinaryBoolean.False, 'False'],
]);
