import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ResumeAnalysis from './components/ResumeAnalysis';
import SuggestionsList from './components/SuggestionsList';
import OptimizationPanel from './components/OptimizationPanel';
import { analyzeResume, optimizeResume } from './utils/resumeAnalyzer';
import { sampleResumes } from './data/mockData';

function App() {
  // State for the application
  const [resumeText, setResumeText] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState('');
  const [currentJobTarget, setCurrentJobTarget] = useState('');

  // Handle resume upload
  const handleResumeUploaded = (text) => {
    setResumeText(text);
    
    // Analyze the resume
    const results = analyzeResume(text);
    setAnalysisResults(results);
    
    // Show the analysis section
    setShowAnalysis(true);
    
    // Reset later sections when new resume is uploaded
    setShowSuggestions(false);
    setShowOptimizer(false);
    setOptimizedResume('');
  };
  
  // Handle optimization start
  const handleStartOptimization = () => {
    setShowSuggestions(true);
  };
  
  // Apply selected suggestions
  const handleApplySuggestions = (selectedSuggestions) => {
    // In a real app, this would use AI to apply the suggestions
    const optimized = optimizeResume(resumeText, selectedSuggestions);
    setOptimizedResume(optimized);
    
    // Show the optimizer section
    setShowOptimizer(true);
  };
  
  // Handle job targeting
  const handleJobTargetChange = (jobTitle) => {
    setCurrentJobTarget(jobTitle);
  };
  
  // Handle resume download
  const handleDownload = (content) => {
    // In a real app, this would create a downloadable file
    // For this demo, we'll just show an alert
    alert('In a production app, this would download the resume as a PDF or DOCX file.');
  };
  
  // Function to load sample resume (for demo purposes)
  const loadSampleResume = () => {
    const sampleText = sampleResumes.basic;
    handleResumeUploaded(sampleText);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">✓</span> ResumeOptima AI
            </div>
            <button className="btn" onClick={loadSampleResume}>
              Load Sample Resume
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container main-content">
          <div className="hero">
            <div className="subtitle">AI-Powered Resume Optimization</div>
            
            <h1 className="title">Create Job-Winning Resumes</h1>
            
            <div className="description">
              Upload your resume and let our AI analyze and optimize it to increase
              your chances of landing interviews. Get personalized suggestions,
              improve formatting, and align keywords with job descriptions.
            </div>
          </div>
          
          {/* Resume Upload Section */}
          <FileUpload onResumeUploaded={handleResumeUploaded} />
          
          {/* Analysis Results Section */}
          {showAnalysis && (
            <ResumeAnalysis 
              analysisResults={analysisResults} 
              onStartOptimization={handleStartOptimization} 
            />
          )}
          
          {/* Suggestions Section */}
          {showSuggestions && analysisResults && (
            <SuggestionsList 
              suggestions={analysisResults.suggestions} 
              onApplySuggestions={handleApplySuggestions}
            />
          )}
          
          {/* Optimization Panel */}
          {showOptimizer && (
            <OptimizationPanel 
              originalResume={resumeText}
              optimizedResume={optimizedResume}
              onJobTargetChange={handleJobTargetChange}
              onDownload={handleDownload}
            />
          )}
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>© 2023 ResumeOptima AI. All rights reserved.</p>
          <p className="footer-disclaimer">
            This is a demonstration of AI-assisted resume optimization. 
            In a production environment, this would connect to advanced AI models for more accurate analysis.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
