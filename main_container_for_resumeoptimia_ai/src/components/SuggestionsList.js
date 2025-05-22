import React, { useState } from 'react';
import './styles/SuggestionsList.css';
import { improvementCategories } from '../data/mockData';

// PUBLIC_INTERFACE
/**
 * Component that displays and manages improvement suggestions
 * @param {Array} suggestions - List of improvement suggestions
 * @param {function} onApplySuggestions - Callback when suggestions are applied
 * @returns {JSX.Element} SuggestionsList component
 */
const SuggestionsList = ({ suggestions, onApplySuggestions }) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleSuggestionToggle = (index) => {
    setSelectedSuggestions(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedSuggestions.length === suggestions.length) {
      // Deselect all
      setSelectedSuggestions([]);
    } else {
      // Select all
      setSelectedSuggestions(suggestions.map((_, index) => index));
    }
  };
  
  const handleApplySelected = () => {
    const suggestionsToApply = selectedSuggestions.map(index => suggestions[index]);
    onApplySuggestions(suggestionsToApply);
  };

  const filteredSuggestions = activeFilter === 'all' 
    ? suggestions 
    : suggestions.filter(suggestion => suggestion.type === activeFilter);
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="suggestions-list-container">
      <div className="suggestions-header">
        <h2>Improvement Suggestions</h2>
        <div className="suggestions-actions">
          <button 
            className="btn select-all-btn"
            onClick={handleSelectAll}
          >
            {selectedSuggestions.length === suggestions.length ? 'Deselect All' : 'Select All'}
          </button>
          <button 
            className="btn apply-btn"
            disabled={selectedSuggestions.length === 0}
            onClick={handleApplySelected}
          >
            Apply Selected ({selectedSuggestions.length})
          </button>
        </div>
      </div>
      
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        
        {improvementCategories.map(category => (
          <button 
            key={category.id}
            className={`filter-tab ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.id)}
            title={category.description}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {filteredSuggestions.length === 0 ? (
        <p className="no-suggestions">No suggestions in this category</p>
      ) : (
        <ul className="suggestions-items">
          {filteredSuggestions.map((suggestion, index) => {
            // Find the real index in the full suggestions array
            const realIndex = suggestions.findIndex(s => 
              s.type === suggestion.type && 
              s.text === suggestion.text && 
              s.priority === suggestion.priority
            );
            
            return (
              <li key={index} className={`suggestion-item ${getPriorityClass(suggestion.priority)}`}>
                <label className="suggestion-checkbox">
                  <input 
                    type="checkbox"
                    checked={selectedSuggestions.includes(realIndex)}
                    onChange={() => handleSuggestionToggle(realIndex)}
                  />
                  <span className="checkmark"></span>
                </label>
                
                <div className="suggestion-priority-marker"></div>
                
                <div className="suggestion-content">
                  <span className="suggestion-type">{suggestion.type.toUpperCase()}</span>
                  <p>{suggestion.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SuggestionsList;
