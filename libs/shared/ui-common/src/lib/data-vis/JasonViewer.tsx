import ReactJson from 'react-json-view';

import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

interface JsonViewerProps {
  data: object;
  isBaseShown?: boolean;
  sx?: SxProps;
}

export function JsonViewer({ data, isBaseShown, sx }: JsonViewerProps) {
  return (
    <Box sx={sx}>
      <ReactJson
        style={isBaseShown ? {} : { background: 'transparent' }}
        src={data}
        theme="brewer"
        onSelect={false}
        // collapsed={true}
        // collapseStringsAfterLength={15}
        // displayObjectSize={true}
        // enableClipboard={true}
        // indentWidth={4}
        // displayDataTypes={true}
        // iconStyle={'triangle'}
        // shouldCollapse={false}
        // sortKeys={false}
        // quotesOnKeys={true}
        // groupArraysAfterLength={100}
      />
    </Box>
  );
}
