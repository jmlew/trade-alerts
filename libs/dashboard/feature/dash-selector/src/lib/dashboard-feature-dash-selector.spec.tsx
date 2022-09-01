import { render } from '@testing-library/react';

import DashboardFeatureDashSelector from './dashboard-feature-dash-selector';

describe('DashboardFeatureDashSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardFeatureDashSelector />);
    expect(baseElement).toBeTruthy();
  });
});
