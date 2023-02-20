import React, { useEffect, useState } from 'react';
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
import { Typography, Button, ButtonGroup, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
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
import TextField from '@mui/material/TextField';

import axios from "axios";



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








function createData(id, name, action) {
  return {
    id, name, action
  };
}

const rows = [
  createData(1, 'Cupcake'),
  createData(2, 'Donut'),
  createData(3, 'Eclair'),
  createData(4, 'Frozen yoghurt'),
  createData(5, 'Gingerbread'),
  createData(6, 'Honeycomb'),
  createData(7, 'Ice cream sandwich'),
  createData(8, 'Jelly Bean'),
  createData(9, 'KitKat'),
  createData(10, 'Lollipop'),
  createData(11, 'Marshmallow'),
  createData(12, 'Nougat'),
  createData(13, 'Oreo'),
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
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Category Name',
  },
  {
    id: 'action',
    numeric: false,
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


export default function CarCategoriesTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/new_cars.json")
      .then((res) => setUsers(res.data))
      .then((res) => console.log("API Worked fine"))
      .catch((err) => console.log(err))
  }, []);

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
      const newSelected = rows.map((n) => n.name);
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




  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', py: 1 }}>
        <Button onClick={handleCreateClickOpen} startIcon={<AddIcon />} variant="contained" sx={{ textTransform: 'none', alignSelf: 'center' }}>Add New Category</Button>
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
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      
                      </TableCell>
                      <TableCell padding="checkbox">
                      {row.id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
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
          rowsPerPageOptions={[5, 10, 25]}
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
              New Category
            </Typography>
          </Box>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <div>
                <FormControl fullWidth variant="standard" size="sm">
                  <TextField placeholder='Category Name' sx={{ mt: 2 }} id="outlined-basic" label="Category Name" variant="outlined" />
                </FormControl>
              </div>
              
            </div>


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