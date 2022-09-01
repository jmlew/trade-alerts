import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardUiControlsProps {}

const StyledDashboardUiControls = styled.div`
  color: pink;
`;

export function DashboardUiControls(props: DashboardUiControlsProps) {
  return (
    <StyledDashboardUiControls>
      <h1>Welcome to DashboardUiControls!</h1>
    </StyledDashboardUiControls>
  );
}

export default DashboardUiControls;
