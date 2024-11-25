import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
  Stack,
  CircularProgress,
  Typography
} from '@mui/material';
import { Company } from '../models/company';

interface CompanyDetailsModalProps {
    companyId: number;
    onClose: () => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({companyId, onClose}) => {
   const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyDetails = async () =>{
            try
            {
                const response = await fetch(`/api/dictionaries/company/${companyId}`);
                const data = await response.json();
                setCompanyDetails(data as Company);

            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        };
        fetchCompanyDetails();
    },[companyId]);

    return(
        <Dialog open onClose={onClose}>
            <DialogTitle>Company {companyDetails?.companyName}</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress/>
                ): companyDetails ? (
                <Stack spacing={2}>
                    <TextField
                    label="Company name"
                    name='name'
                    value={companyDetails?.companyName}
                    />
                    <TextField
                    label="logo"
                    name='logo'
                    value={companyDetails?.companyLogo || ''}
                    />

                </Stack>

                ): (
                    <Typography color='error'>Failed to load company details</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CompanyDetailsModal;