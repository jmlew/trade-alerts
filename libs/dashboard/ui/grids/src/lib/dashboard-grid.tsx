import { DashboardDataGridField } from '@kdb-dash/dashboard/domain';
import { normaliseGridData } from '@kdb-dash/dashboard/util/grid';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface DashboardGridProps {
  sx: SxProps;
  data: DashboardDataGridField[];
  configs: GridColDef[];
}

const styles = {
  root: { height: 420 },
  grid: {
    backgroundColor: themeColors.backgroundDarkest,
  },
};

export function DashboardGrid({ data, configs, sx }: DashboardGridProps) {
  return (
    <Box sx={{ ...styles.root, ...sx }}>
      <DataGrid
        sx={styles.grid}
        rows={normaliseGridData<DashboardDataGridField>(data)}
        columns={configs}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
}
