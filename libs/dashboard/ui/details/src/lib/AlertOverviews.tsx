import { AlertOverviewInfo } from '@kdb-dash/dashboard/domain';
import { DividerVert } from '@kdb-dash/shared/ui-common';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

const styles = {
  root: {
    width: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    px: '20px',
    py: '10px',
    borderRadius: '5px',
    backgroundColor: themeColors.background,
  },
  headings: {
    textAlign: 'right',
    py: 0.5,
  },
  values: {
    py: 0.5,
  },
};

interface AlertOverviewsProps {
  overviews: AlertOverviewInfo[];
}

export function AlertOverviews({ overviews }: AlertOverviewsProps) {
  return (
    <Box sx={styles.root}>
      <Box>
        {overviews.map((item: AlertOverviewInfo, index: number) => (
          <Typography variant="body2" key={index} sx={styles.headings}>
            {item.heading}
          </Typography>
        ))}
      </Box>
      <DividerVert spacing={3} />
      <Box>
        {overviews.map((item: AlertOverviewInfo, index: number) => (
          <Typography variant="body2" key={index} sx={styles.values}>
            {item.values.join(' | ')}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
