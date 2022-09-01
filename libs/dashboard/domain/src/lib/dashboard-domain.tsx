import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardDomainProps {}

const StyledDashboardDomain = styled.div`
  color: pink;
`;

export function DashboardDomain(props: DashboardDomainProps) {
  return (
    <StyledDashboardDomain>
      <h1>Welcome to DashboardDomain!</h1>
    </StyledDashboardDomain>
  );
}

export default DashboardDomain;
