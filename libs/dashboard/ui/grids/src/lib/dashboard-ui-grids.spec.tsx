import { render } from '@testing-library/react';

import DashboardUiGrids from './dashboard-ui-grids';

describe('DashboardUiGrids', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardUiGrids />);
    expect(baseElement).toBeTruthy();
  });
});
