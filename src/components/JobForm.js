import React, { useState } from 'react';
import './style.css'; // Import the CSS file for styling

const JobForm= () => {
    const [formData, setFormData] = useState({
        companyName: '',
        logo: '',
        jobTitle: '',
        jobDescription: '',
        contractType: '',
        location: '',
        workingLanguage: '',
        responsibilities: '',
        jobLink: '',
        email: '',
        qualification: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="job-form">
            <h2>Add Job</h2>
            <div className="left-section">
                <div className="form-group">
                    <label>Company Name:</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Company Logo URL:</label>
                    <input type="text" name="logo" value={formData.logo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Job Title:</label>
                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Job Description:</label>
                    <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} required rows="5" cols="50" maxLength={2000} />
                </div>
                <div className="form-group">
                    <label>Type of Contract:</label>
                    <input type="text" name="contractType" value={formData.contractType} onChange={handleChange} required />
                </div>
            </div>
            <div className="right-section">
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Working Language:</label>
                    <input type="text" name="workingLanguage" value={formData.workingLanguage} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Responsibilities:</label>
                    <textarea name="Responsibilities" value={formData.Responsibilities} onChange={handleChange} required rows="5" cols="50" maxLength={2000} />
                </div>
                <div className="form-group">
                    <label>Link to the Job:</label>
                    <input type="url" name="jobLink" value={formData.jobLink} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email Address:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Qualification:</label>
                    <textarea name="Qualification" value={formData.Qualification} onChange={handleChange} required rows="5" cols="50" maxLength={2000} />
                </div>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </form>
        //this button submits the form when clicked
    );
};

export default JobForm;