import { render } from '@testing-library/react';

import DashboardUiControls from './dashboard-ui-controls';

describe('DashboardUiControls', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardUiControls />);
    expect(baseElement).toBeTruthy();
  });
});
