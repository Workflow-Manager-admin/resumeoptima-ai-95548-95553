import React, { useState } from 'react';
import './styles/FileUpload.css';

// PUBLIC_INTERFACE
/**
 * Component for uploading and processing resume files
 * @param {function} onResumeUploaded - Callback when resume is successfully processed
 * @returns {JSX.Element} FileUpload component
 */
const FileUpload = ({ onResumeUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };
  
  // Handle file selection from input
  const handleFileSelect = (e) => {
    if (e.target.files.length) {
      processFile(e.target.files[0]);
    }
  };
  
  // Process the selected file
  const processFile = (file) => {
    // Check file type (in a real app, we'd look at MIME type too)
    const validTypes = ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                       'text/plain'];
    const fileType = file.type;
    
    // For this demo, we'll accept any file and just read text files
    setFile(file);
    setError('');
    setIsLoading(true);
    
    // For demo purposes, we'll only actually process text files
    // In a real app, we'd use specialized libraries or API calls to extract text from PDFs, DOCs, etc.
    if (fileType === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setResumeText(text);
        setIsLoading(false);
        onResumeUploaded(text); // Send the text to the parent component
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } else {
      // Mock processing for non-text files
      setTimeout(() => {
        // In a real app, this would come from a proper document extraction service
        setResumeText("This is simulated resume content extracted from your " + 
                      file.name + ". In a real application, we would properly extract text from any document format.");
        setIsLoading(false);
        onResumeUploaded("This is simulated resume content extracted from your " + 
                       file.name + ". In a real application, we would properly extract text from any document format.");
      }, 1500); // Simulate processing time
    }
  };
  
  const handlePasteResume = (e) => {
    const text = e.target.value;
    setResumeText(text);
    
    if (text.trim().length > 50) {
      // Only send to parent if we have substantial content
      onResumeUploaded(text);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (resumeText.trim()) {
      onResumeUploaded(resumeText);
    }
  };
  
  return (
    <div className="file-upload-container">
      <h2>Upload Your Resume</h2>
      
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <i className="document-icon">📄</i>
        </div>
        
        <p>Drag & drop your resume here</p>
        <p className="upload-format">PDF, DOCX, or TXT files</p>
        
        <div className="or-divider">
          <span>OR</span>
        </div>
        
        <input 
          type="file" 
          id="resume-upload" 
          accept=".pdf,.doc,.docx,.txt" 
          onChange={handleFileSelect} 
          className="hidden-input"
        />
        <label htmlFor="resume-upload" className="btn upload-btn">
          Browse Files
        </label>
        
        {isLoading && <div className="loading-indicator">Processing your resume...</div>}
        {error && <div className="error-message">{error}</div>}
        {file && !isLoading && !error && (
          <div className="file-info">
            <p>Selected file: {file.name}</p>
          </div>
        )}
      </div>
      
      <div className="paste-container">
        <h3>Or paste your resume text</h3>
        <form onSubmit={handleSubmit}>
          <textarea 
            placeholder="Paste your resume content here..." 
            className="resume-textarea"
            onChange={handlePasteResume}
            value={resumeText}
            rows="8"
          ></textarea>
          
          <button 
            type="submit" 
            className="btn analyze-btn"
            disabled={!resumeText.trim()}
          >
            Analyze Resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
