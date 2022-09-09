export interface DashboardData {
  alertsInfo: AlertsInfo;
  alertsTrans: Transaction[];
  accountsTrans: Transaction[];
  tradesInfo: TradesInfo;
}

export interface Transaction {
  orderId: number[];
  tradeDate: string[];
  secName: string[];
  isin: string[];
  productCategory: ProductCategory[];
  riskCategory: string[];
  tradeValue: string[];
  buySell: number[];
  portfolio?: string[];
}

export enum ProductCategory {
  Equity = 'Equity',
  FixedIncome = 'Fixed Income',
}

export interface AlertsInfo {
  alertID: string[];
  cif: string[];
  cip: string[];
  rmId: string[];
  rmName: string[];
  advisoryCenter: string[];
  bookingCenter: string[];
  aum: number[];
  vulnerableClient: number[];
  portfolio: string[];
}

export interface TradesInfo {
  date: string[];
  valueBuy: number[];
  valueSell: number[];
  countBuy: number[];
  countSell: number[];
}
