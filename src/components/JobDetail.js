import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
  const { jobId } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null); // State to store job details
  const [error, setError] = useState(null); // State to store error message
  const [loading, setLoading] = useState(true); // State to store loading status

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/jobs/jobs.json'); // Adjust the path as needed
        const jobs = response.data;

        const foundJob = jobs.find(job => job.id === parseInt(jobId));
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError('Job not found.');
        }
      } catch (error) {
        setError('Error fetching job details. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="job-details">
        <h2>Loading job details...</h2>
        <div className="loading-indicator"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="job-details">
      {job && (
        <>
          <h2>{job.title}</h2>
          <table>
            <tbody>
              <tr>
                <th>Company:</th>
                <td>{job.company}</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>{job.location}</td>
              </tr>
              <tr>
                <th>Date Posted:</th>
                <td>{job.datePosted}</td>
              </tr>
              <tr>
                <th>Position Type:</th>
                <td>{job.positionType}</td>
              </tr>
              <tr>
                <th>Salary:</th>
                <td>{job.salary}</td>
              </tr>
              <tr>
                <th>Responsibilities:</th>
                <td>{job.responsibilities}</td>
              </tr>
              <tr>
                <th>Requirements:</th>
                <td>{job.requirements}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default JobDetails;
