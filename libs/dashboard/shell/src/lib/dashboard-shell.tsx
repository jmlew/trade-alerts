import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface DashboardShellProps {}

const StyledDashboardShell = styled.div`
  color: pink;
`;

export function DashboardShell(props: DashboardShellProps) {
  return (
    <StyledDashboardShell>
      <h1>Welcome to DashboardShell!</h1>
    </StyledDashboardShell>
  );
}

export default DashboardShell;
