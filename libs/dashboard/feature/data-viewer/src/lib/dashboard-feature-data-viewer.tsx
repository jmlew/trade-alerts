import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardFeatureDataViewerProps {}

const StyledDashboardFeatureDataViewer = styled.div`
  color: pink;
`;

export function DashboardFeatureDataViewer(props: DashboardFeatureDataViewerProps) {
  return (
    <StyledDashboardFeatureDataViewer>
      <h1>Welcome to DashboardFeatureDataViewer!</h1>
    </StyledDashboardFeatureDataViewer>
  );
}

export default DashboardFeatureDataViewer;
