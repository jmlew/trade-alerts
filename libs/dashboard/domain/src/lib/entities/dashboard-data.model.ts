import { Entity } from '@trade-alerts/shared/util-common';

import { AlertStatus, BinaryBoolean, BuySell } from './dashboard-data.enum';

// Dashboard data object returned by the api.
export interface DashboardApiData {
  alerts: AlertInfo[];
  trades: TradesInfo[];
  alertsTrans: AlertsTransInfo[];
  accountsTrans: AccountsTransInfo[];
}

// Dashboard data object after normalisation for the app.
export interface DashboardData {
  // Alerts are stored as entites to facilliate managing the data in the facade.
  alerts: Entity<AlertInfo>;
  // All other collections are readonly and consumed as arrays throughout the app.
  trades: TradesInfo[];
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

export interface AlertUpdateParams {
  status: AlertStatus;
  comment: string | null;
}

export type AlertUpdateResponseStatus = 'success' | 'failed';
export interface AlertUpdateResponse {
  id: number;
  status: AlertUpdateResponseStatus;
}
