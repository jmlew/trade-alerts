import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardUiChartsProps {}

const StyledDashboardUiCharts = styled.div`
  color: pink;
`;

export function DashboardUiCharts(props: DashboardUiChartsProps) {
  return (
    <StyledDashboardUiCharts>
      <h1>Welcome to DashboardUiCharts!</h1>
    </StyledDashboardUiCharts>
  );
}

export default DashboardUiCharts;
