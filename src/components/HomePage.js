import React, { useState, useEffect } from 'react';
import JrLogo from '../asset/JrLogo.png'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';

const jobCategories = [
  'Any Category',
  'Software Engineer',
  'Data Scientist',
  'Android Developer',
];

function SearchForm() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchKeyword) searchParams.append('keyword', searchKeyword);
    if (searchLocation) searchParams.append('location', searchLocation);
    if (searchCategory && searchCategory !== 'Any Category') {
      searchParams.append('category', searchCategory);
    }
    navigate(`/jobs?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Keyword" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
      <input type="text" placeholder="Location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
      <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
        {jobCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [selectedJob] = useState('');

  useEffect(() => {
    // Simulate fetching job data
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/jobs'); 
        const data = await response.json();
        setJobList(data);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobSelect = (e) => {
    const jobId = e.target.value;
    navigate(`/jobs?jobId=${jobId}`);
  };

  return (
    <div className="homepage">
    <header className="header">
      <img src={JrLogo} alt="Job Recruit Logo" className="logo" />
      <br />
      <div className="header-text">
        <h1>Welcome to Job Recruit</h1>
        <h2>Find Your Next Dream Job</h2>
      </div>
    </header>

      <div className="search-bar">
        <SearchForm />
      </div>

      <section className="latest-jobs">
        <div className="job-dropdown">
          <button className="dropdown-button">Latest Jobs</button>
          {loading ? (
            <p>Loading jobs...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <select className="job-select" onChange={handleJobSelect} value={selectedJob}>
              <option value="" disabled>
                Select a Job
              </option>
              {jobList.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.jobName} - {job.company} ({new Date(job.datePosted).toLocaleDateString()})
                </option>
              ))}
            </select>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;