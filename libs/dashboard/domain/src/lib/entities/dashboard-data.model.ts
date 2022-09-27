import { AlertStatus, BinaryBoolean, BuySell } from './dashboard-data.enum';

export interface DashboardData {
  // Displayed as charts.
  trades: TradesInfo[];
  // Displayed as grids.
  alerts: AlertInfo[];
  alertsTrans: AlertsTransInfo[];
  accountsTrans: AccountsTransInfo[];
}

export type DashboardDataGridField = AlertInfo | AccountsTransInfo | AlertsTransInfo;

export interface AlertInfo {
  alertID: number;
  status: AlertStatus;
  cif: string;
  cip: string;
  rmId: string;
  rmName: string;
  advisoryCenter: string;
  bookingCenter: string;
  aum: number;
  vulnerableClient: BinaryBoolean;
  portfolio: string;
}

interface CommonTransInfo {
  orderId: number;
  tradeDate: string;
  secName: string;
  isin: string;
  productCategory: string;
  riskCategory: string;
  tradeValue: string;
  buySell: BuySell;
}

export type AlertsTransInfo = CommonTransInfo;

export interface AccountsTransInfo extends CommonTransInfo {
  portfolio: string;
}

export interface TradesInfo {
  date: string;
  valueBuy: number;
  valueSell: number;
  countBuy: number;
  countSell: number;
}

export interface AlertOverviewInfo {
  field: keyof AlertInfo;
  heading: string;
  values: (string | number)[];
}
