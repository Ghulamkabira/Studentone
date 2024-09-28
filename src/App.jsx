import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/LoginPage';
import Signup from './components/Signup';
import StudentDetails from './components/Studentdetail';
import Content from './components/Content';
import { Box } from '@mui/material';
import DashboardLayoutBasic from './components/dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/studentdetail",
      element: <StudentDetails />
    },
    {
      path: "/dashboard", 
      element: <DashboardLayoutBasic /> // Set the Content for the home route
    },
  ]);

  return (
    <>
    
    <RouterProvider router={router}/>
    </>

  );
}

export default App;
