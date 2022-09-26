import { AlertInfoField, AlertOverviewInfo } from '@kdb-dash/dashboard/domain';
import { DividerVert } from '@kdb-dash/shared/ui-common';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import { EditRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

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
  onSelectAlert: (value: string | number) => void;
}

export function AlertOverviews({ overviews, onSelectAlert }: AlertOverviewsProps) {
  return (
    <Box sx={styles.root}>
      <Box>
        {overviews.map((item: AlertOverviewInfo) => (
          <Typography variant="body2" key={item.field} sx={styles.headings}>
            {item.heading}
          </Typography>
        ))}
      </Box>
      <DividerVert spacing={3} />
      <Box>
        {overviews.map((item: AlertOverviewInfo) =>
          item.field === AlertInfoField.AlertId ? (
            item.values.map((value: number | string, index: number) => (
              <DetailBtn value={value} onClick={onSelectAlert} key={index} />
            ))
          ) : (
            <DetailsBasic item={item} key={item.field} />
          )
        )}
      </Box>
    </Box>
  );
}

interface DetailBasicProps {
  item: AlertOverviewInfo;
}

function DetailsBasic({ item }: DetailBasicProps) {
  return (
    <Box sx={{ ml: 0.5 }}>
      <Typography variant="body2" key={item.field} sx={styles.values}>
        {item.values.join(' | ')}
      </Typography>
    </Box>
  );
}

interface DetailBtnProps {
  value: string | number;
  onClick: (value: string | number) => void;
}

function DetailBtn({ value, onClick }: DetailBtnProps) {
  function handleClick() {
    onClick(value);
  }

  return (
    <Button
      size="small"
      variant="text"
      onClick={handleClick}
      endIcon={<EditRounded sx={{ fontSize: 10 }} />}
      sx={{ mr: 1 }}
    >
      {value}
    </Button>
  );
}
