import React, { useState } from 'react';
import './styles/OptimizationPanel.css';
import { jobTitles, sampleResumes } from '../data/mockData';
import { getKeywordRecommendations } from '../utils/resumeAnalyzer';

// PUBLIC_INTERFACE
/**
 * Component for resume optimization controls and job targeting
 * @param {string} originalResume - The original resume text
 * @param {string} optimizedResume - The optimized resume text (if available)
 * @param {function} onJobTargetChange - Callback when job target changes
 * @param {function} onDownload - Callback to download the optimized resume
 * @returns {JSX.Element} OptimizationPanel component
 */
const OptimizationPanel = ({ originalResume, optimizedResume, onJobTargetChange, onDownload }) => {
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [activeTab, setActiveTab] = useState(optimizedResume ? 'optimized' : 'original');
  
  const handleJobTitleChange = (e) => {
    const jobTitle = e.target.value;
    setSelectedJobTitle(jobTitle);
    
    if (jobTitle) {
      // Get keyword recommendations for this job
      const recommendedKeywords = getKeywordRecommendations(jobTitle);
      setKeywords(recommendedKeywords);
      
      // Call parent callback
      onJobTargetChange(jobTitle);
    } else {
      setKeywords([]);
    }
  };
  
  const toggleJobDescription = () => {
    setShowJobDescription(!showJobDescription);
  };
  
  const handleDownload = () => {
    onDownload(activeTab === 'optimized' ? optimizedResume : originalResume);
  };
  
  return (
    <div className="optimization-panel-container">
      <h2>Resume Optimization</h2>
      
      <div className="job-targeting-section">
        <h3>Target Job Position</h3>
        
        <div className="job-selector">
          <select 
            value={selectedJobTitle} 
            onChange={handleJobTitleChange}
            className="job-select"
          >
            <option value="">Select a job title</option>
            {jobTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
          
          {selectedJobTitle && (
            <button 
              className="btn view-job-btn"
              onClick={toggleJobDescription}
            >
              {showJobDescription ? 'Hide Job Details' : 'View Sample Job Description'}
            </button>
          )}
        </div>
        
        {showJobDescription && selectedJobTitle && (
          <div className="job-description">
            <h4>{selectedJobTitle} - Sample Job Description</h4>
            <pre>{sampleResumes.jobDescriptionSample}</pre>
          </div>
        )}
        
        {keywords.length > 0 && (
          <div className="keywords-section">
            <h4>Recommended Keywords</h4>
            <p className="keyword-tip">
              Including these keywords can help your resume match ATS requirements 
              for {selectedJobTitle} positions.
            </p>
            <div className="keywords-container">
              {keywords.map((keyword, index) => (
                <span key={index} className="keyword-badge">{keyword}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="resume-view-section">
        <div className="view-tabs">
          <button 
            className={`view-tab ${activeTab === 'original' ? 'active' : ''}`}
            onClick={() => setActiveTab('original')}
          >
            Original Resume
          </button>
          <button 
            className={`view-tab ${activeTab === 'optimized' ? 'active' : ''}`}
            onClick={() => setActiveTab('optimized')}
            disabled={!optimizedResume}
          >
            Optimized Resume
          </button>
        </div>
        
        <div className="resume-content">
          {activeTab === 'original' ? (
            <pre className="resume-preview">{originalResume || "No resume uploaded"}</pre>
          ) : (
            <pre className="resume-preview">{optimizedResume || "Resume not yet optimized"}</pre>
          )}
        </div>
        
        <div className="download-section">
          <button 
            className="btn download-btn"
            onClick={handleDownload}
            disabled={activeTab === 'original' ? !originalResume : !optimizedResume}
          >
            Download {activeTab === 'optimized' ? 'Optimized' : 'Original'} Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizationPanel;
