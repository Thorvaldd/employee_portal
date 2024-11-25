import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
  Stack
} from '@mui/material';
import { Employee } from '../models/employee';

interface EmployeeDetailsModalProps {
    employee: Employee;
    onClose: () => void;
    onSave: () => void;
};

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({employee, onClose, onSave}) =>{
    const [formData, setFormData] = useState(employee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        await fetch(`/api/employees/${formData.employeeId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        onSave();
        onClose();
    };

    return(
        <Dialog open onClose={onClose}>
            <DialogTitle>Edit employee</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                <TextField
                label="First Name"
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}/>

                <TextField
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant='contained' color='primary'>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDetailsModal;