import React, { useEffect, useState, forwardRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'; // For icon buttons
import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon
import EditIcon from '@mui/icons-material/Edit'; // Edit icon
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField for form inputs

// Transition component for the dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StudentDataGrid = ({ onRowClick }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // To track which ID is selected for deletion
  const [currentData, setCurrentData] = useState({}); // To hold current data for editing

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items/');
        setRows(response.data); // Set the fetched data to rows state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    setSelectedId(id); // Set the selected ID
    setOpenDelete(true); // Open the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${selectedId}/`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedId)); // Remove the deleted row from the state
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setOpenDelete(false); // Close the dialog
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Update handler
  const handleUpdate = (id, data) => {
    setSelectedId(id); // Set the selected ID
    setCurrentData(data); // Set the current data to edit
    setOpenUpdate(true); // Open the update dialog
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/items/${selectedId}/`, currentData);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === selectedId ? { ...row, ...currentData } : row))
      ); // Update the state with the new data
    } catch (error) {
      console.error('Error updating item:', error);
    }
    setOpenUpdate(false); // Close the dialog
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // Mapping the rows for the DataGrid
  const mappedRows = rows.map((item, index) => ({
    id: item.id || index + 1,
    name: item.name || 'N/A',
    age: item.age || 'N/A',
    email: item.email || 'N/A',
    session: item.session || 'N/A',
    grade: item.grade || 'N/A',
  }));

  // Column definitions with delete and update icons
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'session', headerName: 'Session', width: 120 },
    { field: 'grade', headerName: 'Grade', width: 70 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          {/* Delete Icon */}
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            sx={{ marginRight: 1 }} // Set delete icon to white
          >
            <DeleteIcon />
          </IconButton>
          {/* Update Icon */}
          <IconButton
            aria-label="edit"
            onClick={() => handleUpdate(params.row.id, {
              name: params.row.name,
              age: params.row.age,
              email: params.row.email,
              session: params.row.session,
              grade: params.row.grade,
            })}
          >
            <EditIcon />
          </IconButton>

          {/* Dialog for confirmation of deletion */}
          <Dialog
            open={openDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDelete}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancel</Button>
              <Button onClick={confirmDelete}>Confirm</Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for updating data */}
          <Dialog
            open={openUpdate}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseUpdate}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Update Item"}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={currentData.name || ''}
                onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Age"
                type="number"
                fullWidth
                variant="outlined"
                value={currentData.age || ''}
                onChange={(e) => setCurrentData({ ...currentData, age: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={currentData.email || ''}
                onChange={(e) => setCurrentData({ ...currentData, email: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Session"
                type="text"
                fullWidth
                variant="outlined"
                value={currentData.session || ''}
                onChange={(e) => setCurrentData({ ...currentData, session: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Grade"
                type="text"
                fullWidth
                variant="outlined"
                value={currentData.grade || ''}
                onChange={(e) => setCurrentData({ ...currentData, grade: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUpdate}>Cancel</Button>
              <Button onClick={confirmUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: '60vh',
        width: { xs: '50%', md: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', maxWidth: '1000px' }}>
        {/* Display loading message while fetching data */}
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataGrid
            rows={mappedRows} // Use the dynamically fetched rows
            columns={columns} // Use the predefined columns
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onRowClick={onRowClick}
          />
        )}
      </Paper>
    </Box>
  );
};

export default StudentDataGrid;
