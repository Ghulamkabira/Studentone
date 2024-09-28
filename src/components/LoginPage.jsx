import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'password') {
     
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } else {
      alert('Invalid login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        paddingTop: '80px',
        marginLeft:{xs:10,md:52}, // Adjusted padding for better appearance
        paddingX: { xs: 2, md: 4 }, // Responsive horizontal padding
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, md: 5 }, // Responsive padding
          width: { xs: '90%', sm: '400px' }, // Responsive width
          textAlign: 'center',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Softer shadow
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#00695c' }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', mb: 3 }}>
          Please login to your account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#009688',
                },
                '&:hover fieldset': {
                  borderColor: '#00796b',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#004d40',
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#009688',
                },
                '&:hover fieldset': {
                  borderColor: '#00796b',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#004d40',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#009688',
              color: 'white',
              '&:hover': {
                backgroundColor: '#00796b',
              },
              borderRadius: '8px',
              fontSize: { xs: '14px', md: '16px' }, // Responsive font size
              padding: '10px', // Padding for the button
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
