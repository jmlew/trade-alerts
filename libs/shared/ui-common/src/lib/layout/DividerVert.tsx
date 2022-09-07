import { Box, Theme } from '@mui/material';
import Divider from '@mui/material/Divider';

const styles = {
  root: (theme: Theme) => ({
    mx: 2,
    borderColor: theme.palette.primary.dark,
    opacity: 0.3,
  }),
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DividerVertProps {}

// eslint-disable-next-line no-empty-pattern
export function DividerVert({}: DividerVertProps) {
  return <Divider orientation="vertical" variant="middle" flexItem sx={styles.root} />;
}
