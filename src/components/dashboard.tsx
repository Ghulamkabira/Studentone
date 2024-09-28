import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People'; // For Students
import ClassIcon from '@mui/icons-material/Class'; // For Classes
import AssessmentIcon from '@mui/icons-material/Assessment'; // For Reports
import SettingsIcon from '@mui/icons-material/Settings'; // For Settings
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Navigation } from '@toolpad/core';

// Import your existing Login and Signup components
import Login from './LoginPage'; // Adjust the path as necessary
import Signup from './Signup'; // Adjust the path as necessary
import StudentDetails from './Studentdetail';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Student Management',
  },
  {
    segment: 'students',
    title: 'Students',
    icon: <PeopleIcon />,
  },
  {
    segment: 'add-student',
    title: 'Add Student',
    icon: <PeopleIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Class Management',
  },
  {
    segment: 'classes',
    title: 'Classes',
    icon: <ClassIcon />,
  },
  {
    segment: 'add-class',
    title: 'Add Class',
    icon: <ClassIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Reports',
  },
  {
    segment: 'attendance-reports',
    title: 'Attendance Reports',
    icon: <AssessmentIcon />,
  },
  {
    segment: 'grades-reports',
    title: 'Grades Reports',
    icon: <AssessmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'User Management',
  },
  {
    segment: 'signup', // Ensure this is correctly defined
    title: 'Signup',
    icon: <SettingsIcon />,
  },
  {
    segment: 'login',
    title: 'Login',
    icon: <SettingsIcon />,
  },
  {
    segment: 'studentdetail',
    title: 'Studentdetail',
    icon: <SettingsIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'app-settings',
    title: 'App Settings',
    icon: <SettingsIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


  switch (pathname) {
    case '/signup':
      return <Signup />;
    case '/login':
      return <Login />;
    case '/studentdetail':
      return <StudentDetails />;
    case '/dashboard':
      return (
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography>Dashboard content for {pathname}</Typography>
        </Box>
      );
    default:
      return <Typography>404 Not Found</Typography>;
  }
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(path); 
      },
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
