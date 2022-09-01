import { render } from '@testing-library/react';

import DashboardDomain from './dashboard-domain';

describe('DashboardDomain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardDomain />);
    expect(baseElement).toBeTruthy();
  });
});
