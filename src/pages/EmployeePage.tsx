import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import EmployeeTable from '../components/EmployeeTable';

const EmployeePage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employee Management
        </Typography>
        <Typography variant="body1">
          Search, view, and edit employee details. Use the filters to find employees by name, position, or department.
        </Typography>
      </Paper>
      <EmployeeTable />
    </Box>
  );
};

export default EmployeePage;