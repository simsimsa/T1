import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TaskProvider } from './Context/TaskContext';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import theme from './theme/index';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/task/:id" element={<TaskPage />} />
          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;