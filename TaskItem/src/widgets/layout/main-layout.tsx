import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import { Header } from '../header/header';

export const MainLayout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Header />

        <Container
          component="main"
          maxWidth="lg"
          sx={{
            py: 8,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
};
