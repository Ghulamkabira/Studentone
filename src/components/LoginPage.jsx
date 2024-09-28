import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'password') {
      alert('Login successful!');
    } else {
      alert('Invalid login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e0f7fa', 
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '40px',
          width: '300px',
          textAlign: 'center',
          borderRadius: '15px',
          backgroundColor: '#ffffff', 
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
