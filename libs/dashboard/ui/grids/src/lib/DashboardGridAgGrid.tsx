/**
 * Styles required for Ag Grid include the main CSS as well as the theme. Material also
 * requires the font Roboto.
 */

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import '@fontsource/roboto';

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import { DashboardDataGridField } from '@kdb-dash/dashboard/domain';
import { themeColors } from '@kdb-dash/shared/ui-styles';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';

const styles = {
  root: { height: 420 },
  grid: {
    backgroundColor: themeColors.backgroundDarkest,
  },
};

interface DashboardGridAgGridProps {
  sx: SxProps;
  data: DashboardDataGridField[];
  configs: ColDef<DashboardDataGridField>[];
}

export function DashboardGridAgGrid({ data, configs, sx }: DashboardGridAgGridProps) {
  return (
    <Box sx={{ ...styles.root, ...sx }} className="ag-theme-material">
      <AgGridReact<DashboardDataGridField>
        rowData={data}
        columnDefs={configs}
        animateRows={true}
      />
    </Box>
  );
}
