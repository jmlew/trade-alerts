import { Link, useSearchParams } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { Box, Card, CardContent, Fab, Typography } from '@mui/material';

import { UsersListContainer } from '../containers/UsersListContainer';

export function UsersView() {
  const [searchParams] = useSearchParams();
  const page: string | null = searchParams.get('page');
  const pageIndex: number = page == null ? 1 : parseInt(page, 10);

  return (
    <Box sx={{ width: 400 }}>
      <Header />
      <Card>
        <CardContent>
          <UsersListContainer />
        </CardContent>
      </Card>
    </Box>
  );
}

const Header = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2,
    }}
  >
    <Typography variant="h4" color="primary">
      Users
    </Typography>
    <Fab component={Link} to="new" size="medium" color="primary">
      <Add aria-label="new user" />
    </Fab>
  </Box>
);
