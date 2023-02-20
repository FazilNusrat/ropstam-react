import * as React from 'react';
import Box from '@mui/material/Box';
import CarsTable from '../component/tables/CarsTable.jsx';


export default function Cars() {
  return (
    <Box sx={{ px:5 }}>
      <CarsTable />
    </Box>
  );
}