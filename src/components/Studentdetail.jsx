import React, { useState } from 'react';
import { Button, Box, Typography, List, ListItem, Paper } from '@mui/material';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);

  const addStudent = () => {
    const name = prompt("Enter student's name:");
    const email = prompt("Enter student's email:");
    const password = prompt("Enter student's password:");
    setStudents([...students, { name, email, password }]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '20px',
        minHeight: '100vh', 
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          width: { xs: '90%', sm: '400px' }, 
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Students
        </Typography>

        <Button
          variant="contained"
          onClick={addStudent}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            marginBottom: '20px',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Add Student
        </Button>

        <List sx={{ textAlign: 'left' }}>
          {students.map((student, index) => (
            <ListItem key={index}>
              {student.name} - {student.email}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default StudentDetails;
