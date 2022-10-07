import { alertStatuses } from './alert-status.util';
import { DashboardDataConfig } from './dashboard-data-configs.model';
import { AlertInfoField, TransactionField } from './dashboard-data-fields.enum';
import {
  accountsTransLabels,
  alertInfoLabels,
  commonTransLabels,
} from './dashboard-data-labels.constants';
import { binaryBooleans, buySellTypes } from './dashboard-data.constants';

const defaultConfig: Partial<DashboardDataConfig> = { flex: 1 };

export enum CellRenderType {
  EditButton,
}

export const alertInfoConfigs: DashboardDataConfig[] = [
  {
    ...defaultConfig,
    field: AlertInfoField.AlertId,
    headerName: alertInfoLabels.get(AlertInfoField.AlertId),
    cellRenderType: CellRenderType.EditButton,
  },
  {
    ...defaultConfig,
    field: AlertInfoField.Status,
    headerName: alertInfoLabels.get(AlertInfoField.Status),
    valueMap: alertStatuses,
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
    valueMap: binaryBooleans,
  },
  {
    ...defaultConfig,
    field: AlertInfoField.Portfolio,
    headerName: alertInfoLabels.get(AlertInfoField.Portfolio),
  },
];

const commonTransConfigs: DashboardDataConfig[] = [
  {
    ...defaultConfig,
    field: TransactionField.OrderId,
    headerName: commonTransLabels.get(TransactionField.OrderId),
    type: 'number',
  },
  {
    ...defaultConfig,
    field: TransactionField.TradeDate,
    headerName: commonTransLabels.get(TransactionField.TradeDate),
  },
  {
    ...defaultConfig,
    field: TransactionField.SecName,
    headerName: commonTransLabels.get(TransactionField.SecName),
  },
  {
    ...defaultConfig,
    field: TransactionField.Isin,
    headerName: commonTransLabels.get(TransactionField.Isin),
  },
  {
    ...defaultConfig,
    field: TransactionField.ProductCategory,
    headerName: commonTransLabels.get(TransactionField.ProductCategory),
  },
  {
    ...defaultConfig,
    field: TransactionField.RiskCategory,
    headerName: commonTransLabels.get(TransactionField.RiskCategory),
  },
  {
    ...defaultConfig,
    field: TransactionField.TradeValue,
    headerName: commonTransLabels.get(TransactionField.TradeValue),
  },
  {
    ...defaultConfig,
    field: TransactionField.BuySell,
    headerName: commonTransLabels.get(TransactionField.BuySell),
    valueMap: buySellTypes,
  },
];

export const alertsTransConfigs: DashboardDataConfig[] = [...commonTransConfigs];
export const accountsTransConfigs: DashboardDataConfig[] = [
  ...commonTransConfigs,
  {
    ...defaultConfig,
    field: TransactionField.Portfolio,
    headerName: accountsTransLabels.get(TransactionField.Portfolio),
  },
];
