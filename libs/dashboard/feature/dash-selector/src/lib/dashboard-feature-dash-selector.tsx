import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardFeatureDashSelectorProps {}

const StyledDashboardFeatureDashSelector = styled.div`
  color: pink;
`;

export function DashboardFeatureDashSelector(props: DashboardFeatureDashSelectorProps) {
  return (
    <StyledDashboardFeatureDashSelector>
      <h1>Welcome to DashboardFeatureDashSelector!</h1>
    </StyledDashboardFeatureDashSelector>
  );
}

export default DashboardFeatureDashSelector;
