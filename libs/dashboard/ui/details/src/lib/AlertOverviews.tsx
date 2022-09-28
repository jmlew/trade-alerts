import { Box, Button, Typography } from '@mui/material';
import { AlertInfoField, AlertOverviewInfo } from '@trade-alerts/dashboard/domain';
import { EditButtonSmall } from '@trade-alerts/shared/ui-common';
import { DividerVert } from '@trade-alerts/shared/ui-common';
import { themeColors } from '@trade-alerts/shared/ui-styles';

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
  onSelectAlert: (alertId: number) => void;
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
            item.values.map((value: number, index: number) => (
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
    <EditButtonSmall onClick={handleClick} iconSize={14} sx={{ mr: 1 }}>
      {value}
    </EditButtonSmall>
  );
}
