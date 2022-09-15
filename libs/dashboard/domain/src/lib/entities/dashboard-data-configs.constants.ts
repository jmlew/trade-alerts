import { DashboardDataConfig } from './dashboard-data-configs.model';
import { AlertInfoField, TransactionField } from './dashboard-data-fields.enum';
import { alertInfoLabels, transactionLabels } from './dashboard-data-labels.constants';

const defaultConfig: Partial<DashboardDataConfig> = { flex: 1 };

export const transactionConfigs: DashboardDataConfig[] = [
  {
    ...defaultConfig,
    field: TransactionField.OrderId,
    headerName: transactionLabels.get(TransactionField.OrderId),
    type: 'number',
  },
  {
    ...defaultConfig,
    field: TransactionField.TradeDate,
    headerName: transactionLabels.get(TransactionField.TradeDate),
  },
  {
    ...defaultConfig,
    field: TransactionField.SecName,
    headerName: transactionLabels.get(TransactionField.SecName),
  },
  {
    ...defaultConfig,
    field: TransactionField.Isin,
    headerName: transactionLabels.get(TransactionField.Isin),
  },
  {
    ...defaultConfig,
    field: TransactionField.ProductCategory,
    headerName: transactionLabels.get(TransactionField.ProductCategory),
  },
  {
    ...defaultConfig,
    field: TransactionField.RiskCategory,
    headerName: transactionLabels.get(TransactionField.RiskCategory),
  },
  {
    ...defaultConfig,
    field: TransactionField.TradeValue,
    headerName: transactionLabels.get(TransactionField.TradeValue),
  },
  {
    ...defaultConfig,
    field: TransactionField.BuySell,
    headerName: transactionLabels.get(TransactionField.BuySell),
    type: 'number',
  },
  {
    ...defaultConfig,
    field: TransactionField.Portfolio,
    headerName: transactionLabels.get(TransactionField.Portfolio),
  },
];

export const alertInfoConfigs: DashboardDataConfig[] = [
  {
    ...defaultConfig,
    field: AlertInfoField.AlertId,
    headerName: alertInfoLabels.get(AlertInfoField.AlertId),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.Cif,
    headerName: alertInfoLabels.get(AlertInfoField.Cif),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.Cip,
    headerName: alertInfoLabels.get(AlertInfoField.Cip),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.RmId,
    headerName: alertInfoLabels.get(AlertInfoField.RmId),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.RmName,
    headerName: alertInfoLabels.get(AlertInfoField.RmName),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.AdvisoryCenter,
    headerName: alertInfoLabels.get(AlertInfoField.AdvisoryCenter),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.BookingCenter,
    headerName: alertInfoLabels.get(AlertInfoField.BookingCenter),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.Aum,
    headerName: alertInfoLabels.get(AlertInfoField.Aum),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.VulnerableClient,
    headerName: alertInfoLabels.get(AlertInfoField.VulnerableClient),
  },
  {
    ...defaultConfig,
    field: AlertInfoField.Portfolio,
    headerName: alertInfoLabels.get(AlertInfoField.Portfolio),
  },
];
