import { ReactNode } from 'react';

import { EditRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { CellRenderType } from '@trade-alerts/dashboard/domain';

export function muiCellRenderer(
  type: CellRenderType
): (params: GridRenderCellParams) => ReactNode {
  switch (type) {
    case CellRenderType.EditButton:
      return (params: GridRenderCellParams) => (
        <Button
          variant="text"
          size="small"
          endIcon={<EditRounded sx={{ fontSize: 10 }} />}
        >
          {params.value}
        </Button>
      );
  }
}
