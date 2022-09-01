import { render } from '@testing-library/react';

import DashboardFeatureDataViewer from './dashboard-feature-data-viewer';

describe('DashboardFeatureDataViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardFeatureDataViewer />);
    expect(baseElement).toBeTruthy();
  });
});
