import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Button, Paper, Box, FormControl, InputLabel, Select, MenuItem,
  SelectChangeEvent
} from '@mui/material';
import EmployeeDetailsModal from './EmployeeDetailsModal';
import { Employee } from '../models/employee';
import { normalizeKeys } from '../utils/normalizeResponse';
import { Company } from '../models/company';
import CompanyDetailsModal from './CompanyDetailsModal';


const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<{key: string, value: string}[]>([]);
  const [filters, setFilters] = useState({ name: '', position: '', department: '' });
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<number| null>(null);

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(`/api/employees?name=${filters.name}&position=${filters.position}&department=${filters.department}`);
    const data = await response.json();
    console.log(data);
    setEmployees(data);
  };

  const fetchPositions = async () => {
    const response = await fetch('/api/dictionaries/positions');
    const data = await response.json();
    console.log(data);
    setPositions(data);
  }

  const handleTextFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectFilterChange = (e: SelectChangeEvent<string>) => {
    const {name, value} = e.target;

    setFilters((prev) => ({...prev, [name]: value}));
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={filters.name}
          onChange={handleTextFilterChange}
          sx={{ mr: 2 }}
        />
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel id="position-label">Position</InputLabel>
          <Select
            labelId='position-label'
            label='position'
            name="position"
            value={filters.position}
            onChange={handleSelectFilterChange}
            
          >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {positions.map((position) => (
              <MenuItem key={position.key} value={position.key}>
                {position.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={fetchEmployees} variant="contained" sx={{ ml: 2 }}>
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Start job date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employeeId}>
                <TableCell>{employee.fullName}</TableCell>
                <TableCell>
                  <Button
                  onClick={() =>setSelectedCompany(employee.companyId)}>
                    {employee.company}
                  </Button>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.startJobDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onSave={fetchEmployees}
        />
      )}
      {selectedCompany && (
        <CompanyDetailsModal
          companyId={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
