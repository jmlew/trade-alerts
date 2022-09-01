import { render } from '@testing-library/react';

import DashboardShell from './dashboard-shell';

describe('DashboardShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardShell />);
    expect(baseElement).toBeTruthy();
  });
});
