import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout';
import Home from './views/Home';
import AboutPage from './views/AboutPage';
import Careers from './views/Careers';
import SignIn from './views/SignIn';
import RegisterPage from './views/RegisterPage';
import Survey from './views/Survey';
import Contact from './views/ContactPage';
import CoursesList from './views/CoursesList';
import Dashboard from './views/Dashboard';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <AuthProvider>
      <Layout> {/* Use Layout here */}
      
      <div className="bodyContent">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courseslist" element={<CoursesList />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/statscard" element={<StatsCard />} />
        <Route path="/topbar" element={<Topbar />} />
      </Routes>
      </div>
     
     </Layout>
     </AuthProvider>
    </Router>
    
    
  );
}

export default App;
