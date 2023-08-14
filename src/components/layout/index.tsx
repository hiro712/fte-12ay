import { ReactNode } from 'react';
import Header from './header';
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Footer from './footer';
import { useAuth } from '@/contexts/useAuth';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { user, isLoading } = useAuth();
  return (
    <>
      <Header />
      <Box>
        <Container
          sx={{ width: { xs: '100vw', sm: 'sm', md: 'md', lg: 'lg' }, my: 5 }}
        >
          {isLoading ? (
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
              <Typography sx={{ textAlign: 'center' }}>
                ログイン中...
              </Typography>
            </Stack>
          ) : (
            <>
              {user ? (
                <>{children}</>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    利用するにはtohoku.ac.jpのメールアドレスでログインしてください
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
