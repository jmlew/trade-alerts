import { MouseEvent } from 'react';

import { Download } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';

const styles = {
  root: { mx: 1, px: 1, color: 'primary.dark' },
};

interface BtnDownloadDataProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function BtnDownloadData({ onClick }: BtnDownloadDataProps) {
  return (
    <Tooltip title="Download all data (CSV)" arrow>
      <Button size="small" startIcon={<Download />} sx={styles.root} onClick={onClick}>
        Download
      </Button>
    </Tooltip>
  );
}
