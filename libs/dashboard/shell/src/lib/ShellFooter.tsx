import Box from '@mui/material/Box';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
    padding: 2,
    border: '1px solid grey',
    backgroundColor: 'lightgray',
  },
};

export function ShellFooter() {
  return <Box sx={styles.root}>Dash Footer</Box>;
}
