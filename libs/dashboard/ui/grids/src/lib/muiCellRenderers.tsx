import { ReactNode } from 'react';

import { GridRenderCellParams } from '@mui/x-data-grid';
import { CellRenderType } from '@trade-alerts/dashboard/domain';
import { EditButtonSmall } from '@trade-alerts/shared/ui-common';

export function muiCellRenderer(
  type: CellRenderType
): (params: GridRenderCellParams) => ReactNode {
  switch (type) {
    case CellRenderType.EditButton:
      return (params: GridRenderCellParams) => (
        <EditButtonSmall>{params.value}</EditButtonSmall>
      );
  }
}
