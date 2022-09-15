// Applies to both Alerts Transactions and Accounts Transactions.
export enum TransactionField {
  OrderId = 'orderId',
  TradeDate = 'tradeDate',
  SecName = 'secName',
  Isin = 'isin',
  ProductCategory = 'productCategory',
  RiskCategory = 'riskCategory',
  TradeValue = 'tradeValue',
  BuySell = 'buySell',
  Portfolio = 'portfolio',
}

export enum AlertInfoField {
  AlertId = 'alertID',
  Cif = 'cif',
  Cip = 'cip',
  RmId = 'rmId',
  RmName = 'rmName',
  AdvisoryCenter = 'advisoryCenter',
  BookingCenter = 'bookingCenter',
  Aum = 'aum',
  VulnerableClient = 'vulnerableClient',
  Portfolio = 'portfolio',
}
