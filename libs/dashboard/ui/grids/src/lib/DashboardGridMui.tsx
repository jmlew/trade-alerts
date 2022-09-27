import Box from '@mui/material/Box';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';
import { DashboardDataGridField } from '@trade-alerts/dashboard/domain';
import { themeColors } from '@trade-alerts/shared/ui-styles';

const styles = {
  root: { width: 1 },
  grid: {
    width: 1,
    backgroundColor: themeColors.backgroundDarkest,
    borderColor: themeColors.borderDark,
    color: themeColors.primary.light,
    fontWeight: 300,
    fontSize: 13,
    '& .MuiDataGrid-columnHeaders': {
      color: themeColors.primary.main,
      borderBottomColor: themeColors.borderDark,
    },
    '& .MuiDataGrid-columnSeparator': {
      color: themeColors.borderDark,
    },
    '& .MuiDataGrid-cell': {
      borderBottomColor: themeColors.borderDark,
    },
    '& .MuiDataGrid-row': {
      '&:hover': {
        backgroundColor: themeColors.backgroundDark,
        color: themeColors.primary.main,
      },
    },
    '& .MuiDataGrid-footerContainer': {
      color: themeColors.primary.dark,
      borderTopColor: themeColors.borderDark,
    },
    '& .MuiTablePagination-root': {
      color: themeColors.primary.dark,
    },
    '& .MuiIconButton-root': {
      color: themeColors.primary.main,
    },
  },
};

interface DashboardGridMuiProps {
  data: DashboardDataGridField[];
  configs: GridColDef<DashboardDataGridField>[];
  onCellClick?: (field: string, value?: any) => void;
}

export function DashboardGridMui({ data, configs, onCellClick }: DashboardGridMuiProps) {
  const handleRowClick: GridEventListener<'cellClick'> = (params: GridCellParams) => {
    onCellClick && onCellClick(params.field, params.value);
  };

  return (
    <Box sx={styles.root}>
      <DataGrid
        sx={styles.grid}
        rows={data}
        columns={configs}
        onCellClick={handleRowClick}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // density="compact"
        rowHeight={36}
        headerHeight={46}
        autoHeight={true}
        disableSelectionOnClick={true}
      />
    </Box>
  );
}
