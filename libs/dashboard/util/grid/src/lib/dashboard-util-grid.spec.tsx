import { render } from '@testing-library/react';

import DashboardUtilGrid from './dashboard-util-grid';

describe('DashboardUtilGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardUtilGrid />);
    expect(baseElement).toBeTruthy();
  });
});
