import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddJobForm() {
  const [jobDetails, setJobDetails] = useState({
    jobName: '',            // Job name input
    datePosted: '',         // Date posted input
    description: '',        // Description input
    responsibilities: '',   // Responsibilities input
    location: '',           // Location input
    positionType: {
      fullTime: false,
      partTime: false,
      hybrid: false,
      remote: false,
    },                      // Position Type (checkbox)
    requirements: '',       // Requirements input
    salary: ''              // Salary input
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload
    // Handle job submission logic here
    console.log(jobDetails);

    // Add error handling
    if (!jobDetails.jobName || !jobDetails.datePosted || !jobDetails.description || !jobDetails.responsibilities || !jobDetails.location || !jobDetails.positionType || !jobDetails.requirements || !jobDetails.salary) {
      alert('Please fill in all fields');
      return;
    }

    // Add job to database
    fetch('http://127.0.0.1:5000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobDetails)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Job added successfully') {
          alert('Job added successfully!');
          navigate(' /jobs');
        } else {
          alert('Error adding job');
        }
      })
      .catch((error) => console.error(error));
  };

  // The return block contains the form structure
  return (
    <div className="add-job-form">
      <h2>Add a Job</h2>
      <form onSubmit={handleSubmit}>
        
        <label>Job Name*</label>
        <input 
          type="text" 
          required 
          value={jobDetails.jobName} 
          onChange={(e) => setJobDetails({ ...jobDetails, jobName: e.target.value })} 
        />
        
        <label>Date Posted*</label>
        <input 
          type="date" 
          required 
          value={jobDetails.datePosted} 
          onChange={(e) => setJobDetails({ ...jobDetails, datePosted: e.target.value })} 
        />
        
        <label>Description*</label>
        <textarea 
          required 
          value={jobDetails.description} 
          onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })} 
        />
        
        <label>Responsibilities*</label>
        <textarea 
          required 
          value={jobDetails.responsibilities} 
          onChange={(e) => setJobDetails({ ...jobDetails, responsibilities: e.target.value })} 
        />
        
        <label>Location*</label>
        <input 
          type="text" 
          required 
          value={jobDetails.location} 
          onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} 
        />
        
        <label>Position Type*</label>
        <select 
          required 
          value={jobDetails.positionType} 
          onChange={(e) => setJobDetails({ ...jobDetails, positionType: e.target.value })} 
        >
          <option value="">Select Position Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        
        <label>Requirements*</label>
        <textarea 
          required 
          value={jobDetails.requirements} 
          onChange={(e) => setJobDetails({ ...jobDetails, requirements: e.target.value })} 
        />
        
        <label>Salary*</label>
        <input 
          type="number" 
          required 
          value={jobDetails.salary} 
          onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} 
        />
        
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJobForm;
