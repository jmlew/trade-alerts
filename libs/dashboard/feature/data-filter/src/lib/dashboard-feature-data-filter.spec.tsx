import { render } from '@testing-library/react';

import DashboardFeatureDataFilter from './dashboard-feature-data-filter';

describe('DashboardFeatureDataFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardFeatureDataFilter />);
    expect(baseElement).toBeTruthy();
  });
});
