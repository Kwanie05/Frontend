import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]); // State to hold job listings

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/jobs'); // Fetch jobs from the API
        if (!response.ok) throw new Error('Unable to fetch jobs. Please try again later!');
        
        const data = await response.json();
        setJobs(data); // Set the jobs state
      } catch (error) {
        console.error(error); // Log the error inside the catch block
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      <h2>Job Listing</h2>
      <table className="spacious-table">
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Date Posted</th>
            <th>Position Type</th>
            <th>Salary</th>
            <th>Job Details</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.jobName}</td>
              <td>{job.datePosted}</td>
              <td>{job.positionType}</td>
              <td>{job.salary}</td>
              <td>
                <Link to={`/job/${job.id}`}>View Job Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;