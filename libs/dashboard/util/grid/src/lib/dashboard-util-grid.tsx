import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardUtilGridProps {}

const StyledDashboardUtilGrid = styled.div`
  color: pink;
`;

export function DashboardUtilGrid(props: DashboardUtilGridProps) {
  return (
    <StyledDashboardUtilGrid>
      <h1>Welcome to DashboardUtilGrid!</h1>
    </StyledDashboardUtilGrid>
  );
}

export default DashboardUtilGrid;
