import React, { useEffect, useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Typography, Button, ButtonGroup, FormControl, InputLabel, Snackbar, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import cars from '../../cars.json'


const theme = createTheme({
  palette: {
    secondary: {
      light: '#6e809e',
      main: '#6e809e',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    info: {
      light: '#76b4d9',
      main: '#76b4d9',
      dark: '#76b4d9',
      contrastText: '#fff',
    }
  },
});








function createData(model, year, make, color, price, category) {
  return {
    model,
    year,
    make,
    color,
    price,
    category
  };
}

const rows = [
    createData('Camry', 2022, 'Toyota', 'Black', '$24,970', 'Category'),
    createData('Camry', 2022, 'Toyota', 'White', '$24,970', 'Category'),
    createData('Camry', 2022, 'Toyota', 'Red', '$24,970', 'Category'),
    createData('Camry', 2022, 'Toyota', 'Blue', '$24,970', 'Category'),
    createData('Mustang', 2023, 'Ford', 'Black', '$29,175', 'Category'),
    createData('Mustang', 2023, 'Ford', 'White', '$29,175', 'Category'),
    createData('Mustang', 2023, 'Ford', 'Red', '$29,175', 'Category'),
    createData('Mustang', 2023, 'Ford', 'Blue', '$29,175', 'Category'),
    createData('Civic', 2024, 'Honda', 'Black', '$22,250', 'Category'),
    createData('Civic', 2024, 'Honda', 'White', '$22,250', 'Category'),
    createData('Civic', 2024, 'Honda', 'Red', '$22,250', 'Category'),
    createData('Civic', 2024, 'Honda', 'Blue', '$22,250', 'Category'),
    createData('Transit', 2022, 'Ford', 'White', '$39,250', 'Category'),
    createData('Express', 2023, 'Chevrolet', 'White', '$33,395', 'Category'),
    createData('Sprinter', 2024, 'Mercedes-Benz', 'White', '$44,995', 'Category'),
    createData('Wrangler', 2022, 'Jeep', 'Black', '$32,345', 'Category'),
    createData('Wrangler', 2022, 'Jeep', 'White', '$32,345', 'Category'),
    createData('Wrangler', 2022, 'Jeep', 'Red', '$32,345', 'Category'),
    createData('Explorer', 2023, 'Ford', 'Black', '$34,660', 'Category'),
    createData('Explorer', 2023, 'Ford', 'White', '$34,660', 'Category'),
    createData('Explorer', 2023, 'Ford', 'Silver', '$34,660', 'Category'),
    createData('Tahoe', 2024, 'Chevrolet', 'Black', '$52,100', 'Category'),
    createData('Tahoe', 2024, 'Chevrolet', 'White', '$52,100', 'Category')
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'model',
    numeric: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
  },
  {
    id: 'make',
    numeric: false,
    disablePadding: false,
    label: 'Origin',
  },
  {
    id: 'color',
    numeric: true,
    disablePadding: false,
    label: 'Color',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  

  return (
    <TableHead>
    {/* <ul>
        {users.map((user, index) => (
          <li key={index}>
            #{user.Origin}: {user.Name} {user.Year}---{user.Category}
          </li>
        ))}
      </ul> */}
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography sx={{ fontWeight: 'bold' }}>{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function CarsTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const[car,setCars]=useState(cars);

  // SNACK

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleSnackClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleSnackClose = () => {
    setState({ ...state, open: false });
  };


  // CREATE DIALOG
  const [openCreate, setCreateOpen] = React.useState(false);

  const handleCreateClickOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  // DELETE DIALOG
  const [openDelete, setDeleteOpen] = React.useState(false);
  const handleClickOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };


  // CHECKBOX
  const [checked, setChecked] = React.useState(true);
  const handleAPICheckboxChange = (event) => {
    setChecked(event.target.checked);
  };



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    const [category, setCategory] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setCategory(event.target.value);
    };

    const [users, setUsers] = useState([]);

	useEffect(() => {
	    axios
	      	.get("/new_cars.json")
	      	.then((res) => res.data)
	      	.then((res) => setUsers(eval(res)))
	      	.then((res) => console.log(res))
  			  .catch((err) => console.log(err));
	  }, []);

    const [age, setAge] = React.useState('');

  const handleChangeCarColor = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', py: 1 }}>
        <Button onClick={handleCreateClickOpen} startIcon={<AddIcon />} variant="contained" sx={{ textTransform: 'none', alignSelf: 'center' }}>Add New Car</Button>
      </Box>
      <Box sx={{ width: '100%' }} style={{ background: "white", border: 'solid 1px #dedede', borderRadius: '5px', width: '100%' }}>

        <TableContainer>
          <Table
            size="small"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />


{/* {users.map((user, index) => (
          <li key={index}>
            #{user.Origin}: {user.Name} {user.Year}---{user.Category}
          </li>
        ))} */}


            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.Name}
                      </TableCell>
                      <TableCell align="left">{row.Year}</TableCell>
                      <TableCell align="left">{row.Origin}</TableCell>
                      
                      <TableCell align="left">
                        { row.Color}
                      </TableCell>

                      <TableCell align="left">
                        { row.Price}
                      </TableCell>

                      <TableCell align="left">
                        { row.Category}
                      </TableCell>

                      <TableCell>
                        <ThemeProvider theme={theme}>
                          <ButtonGroup color='secondary' size="small" aria-label="small button group">
                            <Button onClick={handleCreateClickOpen} startIcon={<EditOutlinedIcon />} key="edit">Edit</Button>
                            <Button onClick={handleClickOpen} key="delete"><DeleteOutlineOutlinedIcon color='error' /></Button>
                          </ButtonGroup>
                        </ThemeProvider>
                      </TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 300, 500]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>


      {/* CREATE DIALOG */}
      <Dialog
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" >
          <Box sx={{ display: 'flex' }}>
            <IconButton color="primary" sx={{ p: '10px', alignSelf: 'center' }} aria-label="directions">
              <AddIcon />
            </IconButton>
            <Typography gutterBottom sx={{ alignSelf: 'end', fontWeight: 'bold', fontSize: '1em' }}>
              Add New Car
            </Typography>
          </Box>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <FormControl fullWidth sx={{ width: '100%' }} size="small">


            <InputLabel id="demo-select-small">Select Category</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={category}
              label="Select Category"
              onChange={handleChange}
            >
            
                {/* {users.map((user, index) => (
                  <li key={index}>
                    #{user.Origin}: {user.Name} {user.Year}---{user.Category}
                  </li>
                ))} */}
              
                {users.map((user, index) => (
                  <MenuItem value={index}>{ user.Category }</MenuItem>
                ))}

            </Select>
          </FormControl>

          

          <FormControl fullWidth size="small">
            <TextField size="small" placeholder='Name' sx={{ mt: 2 }} id="outlined-basic" label="Name" variant="outlined" />
          </FormControl>

          <FormControl fullWidth size="small">
            <TextField size="small" type="number" placeholder='Price' sx={{ mt: 2 }} id="outlined-basic" label="Price" variant="outlined" />
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Car Color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChangeCarColor}
            >
              <MenuItem value={10}>Black</MenuItem>
              <MenuItem value={20}>White</MenuItem>
              <MenuItem value={30}>Maroon</MenuItem>
            </Select>
          </FormControl>



          <FormControl sx={{ mt: 2 }} fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChangeCarColor}
            >
              <MenuItem value={10}>1998</MenuItem>
              <MenuItem value={20}>...</MenuItem>
              <MenuItem value={30}>2023</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Origin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChangeCarColor}
            >
              <MenuItem value={10}>USA</MenuItem>
              <MenuItem value={20}>JAPAN</MenuItem>
              <MenuItem value={30}>Korea</MenuItem>
            </Select>
          </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleCreateClose}>Cancel</Button>
          <Button startIcon={<SaveIcon />} variant='contained' onClick={handleCreateClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle >
          <Box sx={{ display: 'flex' }}>
            <IconButton color="primary" sx={{ p: '10px', alignSelf: 'center' }} aria-label="directions">
              <DeleteOutlineOutlinedIcon color='error' />
            </IconButton>
            <Typography gutterBottom sx={{ alignSelf: 'end', fontWeight: 'bold', fontSize: '1em' }}>
              Delete Car?
            </Typography>
          </Box>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Car?
          </DialogContentText>
        </DialogContent>
          <Divider fullWidth />
        <DialogActions>
          <Button variant='outlined' color="inherit" onClick={handleDeleteClose}>Cancel</Button>
          <Button variant='contained' color='error' onClick={handleDeleteClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      {/* SNACK */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleSnackClose}
        message="URL copied to clipboard!"
        key={vertical + horizontal}
      />

    </Box>
  );
}