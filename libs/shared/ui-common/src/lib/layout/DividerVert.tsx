import Divider from '@mui/material/Divider';

const styles = {
  root: {
    mx: 2,
    borderColor: 'primary.dark',
    opacity: 0.3,
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DividerVertProps {
  spacing?: number;
}

// eslint-disable-next-line no-empty-pattern
export function DividerVert({ spacing }: DividerVertProps) {
  const custom = spacing == null ? {} : { mx: spacing };
  return (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
      sx={{ ...styles.root, ...custom }}
    />
  );
}
