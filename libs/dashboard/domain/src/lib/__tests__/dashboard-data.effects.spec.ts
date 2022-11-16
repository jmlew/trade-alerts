import { of, throwError } from 'rxjs';

import { DashboardDataService } from '../infrastructure/dashboard-data.service';
import { DashboardDataEffects } from '../state/dashboard-data.effects';
import { DashboardDataStore } from '../state/dashboard-data.store';
import { mockDashboardApiData } from './mock-data';

let effects: DashboardDataEffects;
let store: DashboardDataStore;
let dataService: DashboardDataService;

/**
 * Instantiates all dependancies for mocking the tests. To be called after spies and
 * mocks have been applied to the relevant methods on the class prototypes for each test.
 */
function createInstances() {
  store = DashboardDataStore.getInstance();
  dataService = new DashboardDataService();
  effects = new DashboardDataEffects(store, dataService);
}

describe(DashboardDataEffects, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should load dash data and update the store', () => {
    const params = new URLSearchParams({ sample: 'tests' });
    jest
      .spyOn(DashboardDataService.prototype, 'getDashData')
      .mockReturnValue(of(mockDashboardApiData));
    jest.spyOn(DashboardDataStore.prototype, 'onPending');
    jest.spyOn(DashboardDataStore.prototype, 'onCompleted');

    createInstances();

    effects.loadDashData(params);
    expect(store.onPending).toHaveBeenCalled();
    expect(store.onCompleted).toHaveBeenCalledWith(mockDashboardApiData);
  });
  it('should throw error and update the store', () => {
    const params = new URLSearchParams({ sample: 'tests' });
    const error = 'sample error';
    jest
      .spyOn(DashboardDataService.prototype, 'getDashData')
      .mockReturnValue(throwError(() => error));
    jest.spyOn(DashboardDataStore.prototype, 'onPending');
    jest.spyOn(DashboardDataStore.prototype, 'onFailed');

    createInstances();

    effects.loadDashData(params);
    expect(store.onPending).toHaveBeenCalled();
    expect(store.onFailed).toHaveBeenCalledWith(error);
  });
});
