import { AlertInfoField, TransactionField } from './dashboard-data-fields.enum';

export const transactionLabels: Map<TransactionField, string> = new Map([
  [TransactionField.OrderId, 'Order ID'],
  [TransactionField.TradeDate, 'Trade Date'],
  [TransactionField.SecName, 'SEC Name'],
  [TransactionField.Isin, 'ISIN'],
  [TransactionField.ProductCategory, 'Product Category'],
  [TransactionField.RiskCategory, 'Risk Category'],
  [TransactionField.TradeValue, 'Trade Value'],
  [TransactionField.BuySell, 'Buy / Sell'],
  [TransactionField.Portfolio, 'Portfolio'],
]);

export const alertInfoLabels: Map<AlertInfoField, string> = new Map([
  [AlertInfoField.AlertId, 'Alert ID'],
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
