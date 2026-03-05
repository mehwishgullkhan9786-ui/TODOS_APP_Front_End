import './App.css';
import ResponsiveAppBar from './components/Navbar';
import Footer from './components/Footer';
import { Box, Toolbar } from '@mui/material';
import LandingPage from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import StyledUsersTable from './components/UersManagement/UsersTable';
import RolesTable from './pages/Roles';
import Permission from './pages/Permission';
import Tasks from './pages/Tasks';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ResponsiveAppBar/>

        <Box sx={{ display: 'flex', bgcolor: '#f4f6f8', minHeight: 'calc(100vh - 64px)' }}>
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 0, 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#f4f6f8'
            }}
          >
            {/* Navbar ke niche spacing hata di gayi hai */}


            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* DASHBOARD NESTED ROUTES START */}
              <Route path="/dashboard" element={<Dashboard />}>
                {/* Ye routes ab Dashboard ke Outlet mein render honge.
                   Note: Dashboard ke andar ke links in paths se match karne chahiyen.
                */}
                {/* <Route path="UserManagment" element={<UserManagment/>} /> */}
                <Route path="roles" element={<RolesTable />} />
                <Route path="permission" element={<Permission />} />
                <Route path="users-table" element={<StyledUsersTable/>} />
                <Route path="tasks" element={<Tasks />} />
              </Route>
              {/* DASHBOARD NESTED ROUTES END */}

            </Routes>

            <Box sx={{ mt: 'auto' }}>
               <Footer />
            </Box>
          </Box>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;