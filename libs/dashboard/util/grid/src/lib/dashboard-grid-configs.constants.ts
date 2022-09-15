import { GridColDef } from '@mui/x-data-grid';

import { AlertInfoField, TransactionField } from './dashboard-grid-fields.enum';

export const transactionLabels: Map<TransactionField, string> = new Map([
  [TransactionField.OrderId, 'Order Id'],
  [TransactionField.TradeDate, 'Trade Date'],
  [TransactionField.SecName, 'Sec Name'],
  [TransactionField.Isin, 'Isin'],
  [TransactionField.ProductCategory, 'Product Category'],
  [TransactionField.RiskCategory, 'Risk Category'],
  [TransactionField.TradeValue, 'Trade Value'],
  [TransactionField.BuySell, 'Buy Sell'],
  [TransactionField.Portfolio, 'Portfolio'],
]);

export const alertInfoLabels: Map<AlertInfoField, string> = new Map([
  [AlertInfoField.AlertId, 'Alert Id'],
  [AlertInfoField.Cif, 'Cif'],
  [AlertInfoField.Cip, 'Cip'],
  [AlertInfoField.RmId, 'Rm Id'],
  [AlertInfoField.RmName, 'Rm Name'],
  [AlertInfoField.AdvisoryCenter, 'Advisory Center'],
  [AlertInfoField.BookingCenter, 'Booking Center'],
  [AlertInfoField.Aum, 'Aum'],
  [AlertInfoField.VulnerableClient, 'Vulnerable Client'],
  [AlertInfoField.Portfolio, 'Portfolio'],
]);

const defaultDef: Partial<GridColDef> = { flex: 1 };

export const transactionColDefs: GridColDef[] = [
  {
    ...defaultDef,
    field: TransactionField.OrderId,
    headerName: transactionLabels.get(TransactionField.OrderId),
    type: 'number',
  },
  {
    ...defaultDef,
    field: TransactionField.TradeDate,
    headerName: transactionLabels.get(TransactionField.TradeDate),
  },
  {
    ...defaultDef,
    field: TransactionField.SecName,
    headerName: transactionLabels.get(TransactionField.SecName),
  },
  {
    ...defaultDef,
    field: TransactionField.Isin,
    headerName: transactionLabels.get(TransactionField.Isin),
  },
  {
    ...defaultDef,
    field: TransactionField.ProductCategory,
    headerName: transactionLabels.get(TransactionField.ProductCategory),
  },
  {
    ...defaultDef,
    field: TransactionField.RiskCategory,
    headerName: transactionLabels.get(TransactionField.RiskCategory),
  },
  {
    ...defaultDef,
    field: TransactionField.TradeValue,
    headerName: transactionLabels.get(TransactionField.TradeValue),
  },
  {
    ...defaultDef,
    field: TransactionField.BuySell,
    headerName: transactionLabels.get(TransactionField.BuySell),
    type: 'number',
  },
  {
    ...defaultDef,
    field: TransactionField.Portfolio,
    headerName: transactionLabels.get(TransactionField.Portfolio),
  },
];

export const alertInfoColDefs: GridColDef[] = [
  {
    ...defaultDef,
    field: AlertInfoField.AlertId,
    headerName: alertInfoLabels.get(AlertInfoField.AlertId),
  },
  {
    ...defaultDef,
    field: AlertInfoField.Cif,
    headerName: alertInfoLabels.get(AlertInfoField.Cif),
  },
  {
    ...defaultDef,
    field: AlertInfoField.Cip,
    headerName: alertInfoLabels.get(AlertInfoField.Cip),
  },
  {
    ...defaultDef,
    field: AlertInfoField.RmId,
    headerName: alertInfoLabels.get(AlertInfoField.RmId),
  },
  {
    ...defaultDef,
    field: AlertInfoField.RmName,
    headerName: alertInfoLabels.get(AlertInfoField.RmName),
  },
  {
    ...defaultDef,
    field: AlertInfoField.AdvisoryCenter,
    headerName: alertInfoLabels.get(AlertInfoField.AdvisoryCenter),
  },
  {
    ...defaultDef,
    field: AlertInfoField.BookingCenter,
    headerName: alertInfoLabels.get(AlertInfoField.BookingCenter),
  },
  {
    ...defaultDef,
    field: AlertInfoField.Aum,
    headerName: alertInfoLabels.get(AlertInfoField.Aum),
  },
  {
    ...defaultDef,
    field: AlertInfoField.VulnerableClient,
    headerName: alertInfoLabels.get(AlertInfoField.VulnerableClient),
  },
  {
    ...defaultDef,
    field: AlertInfoField.Portfolio,
    headerName: alertInfoLabels.get(AlertInfoField.Portfolio),
  },
];
