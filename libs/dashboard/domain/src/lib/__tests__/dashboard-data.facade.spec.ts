import { firstValueFrom, of } from 'rxjs';

import { ApiStatus } from '@trade-alerts/shared/data-access';

import { DashboardDataFacade } from '../application/dashboard-data.facade';
import { AlertInfo } from '../entities/dashboard-data.model';
import { DashboardDataService } from '../infrastructure/dashboard-data.service';
import { DashboardDataEffects } from '../state/dashboard-data.effects';
import { DashboardDataStore } from '../state/dashboard-data.store';
import { mockAlerts, mockDashboardApiData, mockDashboardData } from './mock-data';

let store: DashboardDataStore;
let effects: DashboardDataEffects;
let facade: DashboardDataFacade;
let dataService: DashboardDataService;

/**
 * Instantiates all dependancies for mocking the facade. To be called after spies and
 * mocks have been applied to the relevant methods on the class prototypes for each test.
 */
function createInstances() {
  // Clear previous store state on current instance.
  store && store.onClear();
  // Instantiate data store instance.
  store = DashboardDataStore.getInstance();
  dataService = new DashboardDataService();
  effects = new DashboardDataEffects(store, dataService);
  facade = new DashboardDataFacade(store, effects);
}

describe(DashboardDataFacade, () => {
  describe('Selectors', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });
    it('should select dashDataState$ from date store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(DashboardDataStore.prototype, 'selectApiState')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.dashDataState$)).resolves.toEqual(value);
    });
    it('should select dashData$ from date store', async () => {
      jest
        .spyOn(DashboardDataStore.prototype, 'selectData')
        .mockImplementation(() => of(mockDashboardData));

      createInstances();
      await expect(firstValueFrom(facade.dashData$)).resolves.toEqual(mockDashboardData);
    });
    it('should select dashAlerts$ from date store', async () => {
      jest
        .spyOn(DashboardDataStore.prototype, 'selectData')
        .mockImplementation(() => of(mockDashboardData));

      createInstances();
      await expect(firstValueFrom(facade.dashAlerts$)).resolves.toEqual(mockAlerts);
    });
  });
  describe('Actions', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });
    it('should load dashboard data from effects', async () => {
      // TODO: Move some tests below into separate effects test.
      jest
        .spyOn(DashboardDataService.prototype, 'getDashData')
        .mockImplementation(() => of(mockDashboardApiData));
      jest.spyOn(DashboardDataEffects.prototype, 'loadDashData');

      createInstances();
      const params = new URLSearchParams();
      facade.loadDashData(params);
      expect(effects.loadDashData).toHaveBeenCalledWith(params);
      expect(dataService.getDashData).toHaveBeenCalledWith(params);
      await expect(firstValueFrom(facade.dashData$)).resolves.toEqual(mockDashboardData);
    });

    it('should update the dashboard data with an alert', async () => {
      // TODO: Move some tests below into separate store test.
      const alert: AlertInfo = mockAlerts[0];
      const id = alert.alertID;
      const changes: Partial<AlertInfo> = {
        cif: 'Sample CIF',
        cip: 'Sample CIP',
        rmId: 'Sample RMID',
      };
      const updatedAlert: AlertInfo = { ...alert, ...changes };
      const updatedAlerts = { ...mockDashboardData.alerts, [id]: updatedAlert };
      const updatedDashData = { ...mockDashboardData, alerts: updatedAlerts };

      jest.spyOn(DashboardDataStore.prototype, 'onUpdateAlert');

      createInstances();
      store.onCompleted(mockDashboardApiData);
      facade.updateDashDataWithAlert(id, changes);
      expect(store.onUpdateAlert).toHaveBeenCalledWith(id, changes);
      await expect(firstValueFrom(facade.dashData$)).resolves.toEqual(updatedDashData);
    });
  });
});
