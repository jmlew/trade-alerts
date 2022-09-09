export enum DashApiUri {
  // Prod API which is used in this app.
  Base = 'api/',
  // Mock API is being redirected to the target defined in proxy.conf.json
  MockBase = 'api/',
  // API endpoints
  Dashboard = 'dashboard',
}

// ? May not be used, depending on endpoint shape.
export enum UserApiParam {
  Filters = 'filters',
}
