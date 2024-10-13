import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import AddJobForm from './components/AddJobForm';
import './styles/style.css';
 
function App() {
 return (
   <Router>
     <div className="App">
       <nav className="nav-links">
         <Link to="/">Home</Link>
         <Link to="/jobs">Jobs</Link>
         <Link to="/JobDetail">JobDetail</Link>
         <Link to="/add-job">Add Job</Link>
       </nav>
 
       <Routes>
         <Route exact path="/" element={<HomePage />} />
         <Route path="/add-job" element={<AddJobForm />} />
         <Route path="/jobs" element={<JobList />} />
         <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
     </div>
   </Router>
 );
}
 
export default App;
