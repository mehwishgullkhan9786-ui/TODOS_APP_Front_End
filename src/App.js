import './App.css';
import ResponsiveAppBar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import LandingPage from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import StyledUsersTable from './components/UersManagement/UsersTable';
import RolesTable from './pages/Roles';
import Permission from './pages/Permission';
import Tasks from './pages/Tasks';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';


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


            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />

              
              <Route path="/dashboard" element={<Dashboard />}>
                {/* <Route path="UserManagment" element={<UserManagment/>} /> */}
                <Route path="roles" element={<RolesTable />} />
                <Route path="permission" element={<Permission />} />
                <Route path="users-table" element={<StyledUsersTable/>} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="account" element={<AccountPage />} />
              </Route>
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