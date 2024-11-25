import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from "react"
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import SalaryReportPage from './pages/SalaryReport';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/employees' element={<EmployeePage />}/>
      <Route path='/salary' element={<SalaryReportPage />} />
    </Routes>
  </Router>
);

export default App;