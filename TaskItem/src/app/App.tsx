import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import theme from '../shared/theme/index';
import './index.css';
import { router } from './router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
