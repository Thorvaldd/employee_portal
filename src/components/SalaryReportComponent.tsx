import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import { SalaryReport, SalaryReportFilters } from '../models/salaryReport';

const SalaryReportComponent =() => {
    const[filters, setFilters] = useState<SalaryReportFilters>({department: '', position: ''});
    const [data, setData] = useState<SalaryReport[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFilters({...filters, [name]: value});
    };

    const fetchSalaryReport = async () =>{
        setLoading(true);

        try{
            const response = await fetch('/api/reports/salary', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(filters)
            });
            const result : SalaryReport[] = await response.json();
            setData(result);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    const exportToTxt = () =>{
        const fileContent = data
        .map(row => `${row.department} | ${row.position} | ${row.fullName} | ${row.totalDepartmentSalary}`)
        .join('\n');

        const blob = new Blob([`[Department | Position | Full Name | Salary | Total Department Salary]\n${fileContent}`], {
            type: 'text/plain'
        });

        const url = URL.createObjectURL(blob);

        const now = new Date();
        const timestamp = now.toISOString().replace(/[-T:.]/g, '_').slice(0,-4);
        const fileName = `SalaryReport_${timestamp}.txt`;

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    
    }

    return (
        <div>
            <Stack direction="row" spacing={2} sx={{mb: 2}}>
                <TextField
                    label="Department"
                    name='department'
                    value={filters.department}
                    onChange={handleFilterChange}/>

                <TextField 
                    label="Position"
                    name='position'
                    value={filters.position}
                    onChange={handleFilterChange}
                />

                <Button variant='contained' onClick={fetchSalaryReport} disabled={loading} >
                {loading ? 'Loading...' : 'Generate Report'}
                </Button>
            </Stack>

            {data.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Total Department Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                    <TableCell>{row.totalDepartmentSalary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" onClick={exportToTxt} sx={{ mt: 2 }}>
            Export to TXT
          </Button>
        </>
      )}
        </div>
    )
};

export default SalaryReportComponent;