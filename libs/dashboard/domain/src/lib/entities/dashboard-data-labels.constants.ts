import { AlertInfoField, TransactionField } from './dashboard-data-fields.enum';

export const commonTransLabels: Map<TransactionField, string> = new Map([
  [TransactionField.OrderId, 'Order ID'],
  [TransactionField.TradeDate, 'Trade Date'],
  [TransactionField.SecName, 'SEC Name'],
  [TransactionField.Isin, 'ISIN'],
  [TransactionField.ProductCategory, 'Product Category'],
  [TransactionField.RiskCategory, 'Risk Category'],
  [TransactionField.TradeValue, 'Trade Value'],
  [TransactionField.BuySell, 'Buy / Sell'],
]);

export const alertsTransLabels: Map<TransactionField, string> = new Map([
  ...commonTransLabels,
]);

export const accountsTransLabels: Map<TransactionField, string> = new Map([
  ...commonTransLabels,
  [TransactionField.Portfolio, 'Portfolio'],
]);

export const alertInfoLabels: Map<AlertInfoField, string> = new Map([
  [AlertInfoField.AlertId, 'Alert ID'],
  [AlertInfoField.Status, 'Status'],
  [AlertInfoField.Cif, 'CIF'],
  [AlertInfoField.Cip, 'CIP'],
  [AlertInfoField.RmId, 'RM ID'],
  [AlertInfoField.RmName, 'RM Name'],
  [AlertInfoField.AdvisoryCenter, 'Advisory Center'],
  [AlertInfoField.BookingCenter, 'Booking Center'],
  [AlertInfoField.Aum, 'AUM'],
  [AlertInfoField.VulnerableClient, 'Vulnerable Client'],
  [AlertInfoField.Portfolio, 'Portfolio'],
]);
