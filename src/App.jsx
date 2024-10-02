import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/LoginPage';
import Signup from './components/Signup';
import StudentDetails from './components/Studentdetail';
import StudentDataGrid from './components/StudentDataGrid';
import Content from './components/Content';
import { Box } from '@mui/material';
import DashboardLayoutBasic from './components/dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google client ID

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <StudentDataGrid/>
    },
    {
      path: "/studentdetail",
      element: <StudentDetails />
    },
    {
      path: "/dashboard", 
      element: (
        <ProtectedRoute>
          <DashboardLayoutBasic />
        </ProtectedRoute>
      ) // Protect the Dashboard route
    },
  ]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  );
}

export default App;
