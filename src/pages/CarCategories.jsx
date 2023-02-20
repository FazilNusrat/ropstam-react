import * as React from 'react';
import Box from '@mui/material/Box';
import CarCategoriesTable from '../component/tables/CarCategoriesTable';


export default function Cars() {
  return (
    <Box sx={{ px:5 }}>
      <CarCategoriesTable />
    </Box>
  );
}