import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import StudentProfile from "./pages/StudentProfile"
import Profile from "./pages/Profile"
import StudentsData from "./pages/StudentsData";
import JobsData from "./pages/JobsData";
import JobForm from "./pages/JobForm";
import NotFoundPage from "./pages/NotFoundPage";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  return (
    <>
   
    <Router>
      <Routes>
          <Route exact path="/"  element={<Login/>} />
          <Route path="/register"  element={<Register/>} />
          <Route path="/dashboard"  element={<Dashboard/>} />
          <Route path="/profile"  element={<StudentProfile/>} />
          <Route path="/student_profile"  element={<Profile/>} />
          <Route path="/students_data"  element={<StudentsData/>} />
          <Route path="/jobs"  element={<JobsData/>} />
          <Route path="/modify_job/*"  element={<JobForm/>} />
          <Route path="*" element={<NotFoundPage/>} />
      </Routes> 
    </Router>
    <ToastContainer />
   
    </>
  );
}


export default App;