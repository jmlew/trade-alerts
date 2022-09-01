import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardFeatureDataFilterProps {}

const StyledDashboardFeatureDataFilter = styled.div`
  color: pink;
`;

export function DashboardFeatureDataFilter(props: DashboardFeatureDataFilterProps) {
  return (
    <StyledDashboardFeatureDataFilter>
      <h1>Welcome to DashboardFeatureDataFilter!</h1>
    </StyledDashboardFeatureDataFilter>
  );
}

export default DashboardFeatureDataFilter;
