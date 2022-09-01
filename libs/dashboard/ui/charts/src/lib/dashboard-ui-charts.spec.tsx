import { render } from '@testing-library/react';

import DashboardUiCharts from './dashboard-ui-charts';

describe('DashboardUiCharts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardUiCharts />);
    expect(baseElement).toBeTruthy();
  });
});
