import React from 'react';
import './styles/ResumeAnalysis.css';

// PUBLIC_INTERFACE
/**
 * Component to display resume analysis results
 * @param {Object} analysisResults - Analysis data with scores and insights
 * @param {function} onStartOptimization - Callback to start the optimization process
 * @returns {JSX.Element} ResumeAnalysis component
 */
const ResumeAnalysis = ({ analysisResults, onStartOptimization }) => {
  const { score, sections, suggestions } = analysisResults || { 
    score: 0, 
    sections: {},
    suggestions: [] 
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return "#28a745"; // Green
    if (score >= 60) return "#ffc107"; // Yellow
    return "#dc3545"; // Red
  };
  
  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  };
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  return (
    <div className="resume-analysis-container">
      <h2>Resume Analysis Results</h2>
      
      <div className="score-overview">
        <div className="score-circle" style={{ 
          backgroundImage: `conic-gradient(${getScoreColor(score)} ${score}%, #e0e0e0 0)`
        }}>
          <div className="score-inner-circle">
            <span className="score-value">{score}</span>
          </div>
        </div>
        
        <div className="score-details">
          <h3>Overall Score: <span style={{ color: getScoreColor(score) }}>{getScoreLabel(score)}</span></h3>
          <p>Your resume has been analyzed by our AI. Here's how it scored against industry standards and best practices.</p>
          
          <button 
            className="btn optimize-btn"
            onClick={onStartOptimization}
          >
            Optimize My Resume
          </button>
        </div>
      </div>
      
      {Object.keys(sections).length > 0 && (
        <div className="sections-analysis">
          <h3>Section Analysis</h3>
          <div className="sections-grid">
            {Object.entries(sections).map(([section, data]) => (
              <div key={section} className="section-card">
                <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                <div className="section-score">
                  <div className="mini-score-bar">
                    <div 
                      className="mini-score-fill" 
                      style={{ width: `${data.score}%`, backgroundColor: getScoreColor(data.score) }}
                    ></div>
                  </div>
                  <span>{data.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="improvement-suggestions">
        <h3>Suggested Improvements</h3>
        {suggestions.length === 0 ? (
          <p>No suggestions available for this resume.</p>
        ) : (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className={`suggestion-item ${getPriorityClass(suggestion.priority)}`}>
                <div className="suggestion-priority-marker"></div>
                <div className="suggestion-content">
                  <span className="suggestion-type">{suggestion.type.toUpperCase()}</span>
                  <p>{suggestion.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
