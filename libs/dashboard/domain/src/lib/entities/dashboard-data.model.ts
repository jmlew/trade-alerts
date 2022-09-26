import { BinaryBoolean, BuySell, ProductCategory } from './dashboard-data.enum';

export interface DashboardData {
  // Displayed as charts.
  trades: TradesInfo[];
  // Displayed as grids.
  alerts: AlertInfo[];
  alertsTrans: TransInfo[];
  accountsTrans: TransInfo[];
}

export type DashboardDataGridField = TradesInfo | AlertInfo | TransInfo;

export interface TransInfo {
  orderId: number;
  tradeDate: string;
  secName: string;
  isin: string;
  productCategory: ProductCategory;
  riskCategory: string;
  tradeValue: string;
  buySell: BuySell;
  portfolio?: string;
}

export interface AlertInfo {
  alertID: number;
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
