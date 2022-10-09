export enum AlertManagerApiUri {
  // Prod API which is used in this app.
  Base = 'api/',
  // Mock API is being redirected to the target defined in proxy.conf.json
  MockBase = 'api/',
  // API endpoints
  Alert = 'alert',
}
