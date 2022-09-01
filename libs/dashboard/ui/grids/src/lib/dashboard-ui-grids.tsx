import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardUiGridsProps {}

const StyledDashboardUiGrids = styled.div`
  color: pink;
`;

export function DashboardUiGrids(props: DashboardUiGridsProps) {
  return (
    <StyledDashboardUiGrids>
      <h1>Welcome to DashboardUiGrids!</h1>
    </StyledDashboardUiGrids>
  );
}

export default DashboardUiGrids;
