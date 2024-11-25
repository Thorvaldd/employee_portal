import { Box, Paper, Typography } from "@mui/material"
import React from "react"
import SalaryReportComponent from "../components/SalaryReportComponent";


const SalaryReportPage: React.FC = () => {
    return(
        <Box sx={{p: 3}}>
            <Paper sx={{p: 3, mb: 3}}>
                <Typography variant="h4" gutterBottom>
                    Salary Report
                </Typography>
                <Typography variant="body1">
                    Filter and view salary reports by department or position. You can also export the results to a TXT file for further analysis.
                </Typography>
            </Paper>
            <SalaryReportComponent />
        </Box>
    );
};

export default SalaryReportPage;