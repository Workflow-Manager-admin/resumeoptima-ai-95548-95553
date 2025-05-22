/**
 * Utility functions for resume analysis and optimization
 */

// PUBLIC_INTERFACE
/**
 * Analyzes a resume text and returns insights and suggestions
 * @param {string} resumeText - The text content of the resume to analyze
 * @return {Object} Analysis results with scores and suggestions
 */
export const analyzeResume = (resumeText) => {
  // This would be replaced with actual API calls to a backend service
  // For now, we'll simulate the analysis with some logic

  if (!resumeText) {
    return {
      score: 0,
      sections: {},
      suggestions: []
    };
  }

  // Mock analysis based on text content
  const wordCount = resumeText.split(/\s+/).length;
  const hasActionVerbs = /achieved|improved|developed|managed|created|implemented/i.test(resumeText);
  const hasNumbers = /\d+%|\d+ percent|increased by \d+/i.test(resumeText);
  const hasDates = /\d{4}-\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i.test(resumeText);
  
  // Calculate a basic score based on these factors
  let score = 50; // Start with average score
  
  if (wordCount > 100) score += 10;
  if (wordCount > 300) score += 10;
  if (hasActionVerbs) score += 15;
  if (hasNumbers) score += 10;
  if (hasDates) score += 5;
  
  // Cap score at 100
  score = Math.min(score, 100);
  
  // Generate suggestions based on detected issues
  const suggestions = [];
  
  if (wordCount < 200) {
    suggestions.push({
      type: "content",
      priority: "high",
      text: "Add more detailed descriptions of your achievements and responsibilities"
    });
  }
  
  if (!hasActionVerbs) {
    suggestions.push({
      type: "language",
      priority: "high",
      text: "Include more action verbs like 'achieved', 'improved', 'developed'"
    });
  }
  
  if (!hasNumbers) {
    suggestions.push({
      type: "impact",
      priority: "medium",
      text: "Quantify your achievements with numbers (e.g., 'increased sales by 20%')"
    });
  }
  
  // Always add some general suggestions
  suggestions.push({
    type: "formatting",
    priority: "low",
    text: "Ensure consistent formatting throughout your resume"
  });
  
  suggestions.push({
    type: "keywords",
    priority: "medium",
    text: "Include industry-specific keywords to pass through ATS systems"
  });
  
  // Identify resume sections (very simplistic)
  const sections = {};
  
  if (/education|university|college|bachelor|master|phd/i.test(resumeText)) {
    sections.education = {
      detected: true,
      score: Math.floor(Math.random() * 30) + 70 // Random score between 70-100
    };
  }
  
  if (/experience|work|job|position|role/i.test(resumeText)) {
    sections.experience = {
      detected: true,
      score: Math.floor(Math.random() * 30) + 70
    };
  }
  
  if (/skills|proficient|knowledge|expertise/i.test(resumeText)) {
    sections.skills = {
      detected: true,
      score: Math.floor(Math.random() * 30) + 70
    };
  }
  
  return {
    score,
    sections,
    suggestions
  };
};

// PUBLIC_INTERFACE
/**
 * Optimizes resume content based on suggestions
 * @param {string} resumeText - Original resume text
 * @param {Array} selectedSuggestions - Suggestions to apply
 * @return {string} Optimized resume text
 */
export const optimizeResume = (resumeText, selectedSuggestions) => {
  // In a real application, this would apply AI-powered improvements
  // For demo purposes, we'll add a simple enhancement message
  
  return resumeText + "\n\n[Resume optimized with ResumeOptima AI - " + 
    selectedSuggestions.length + " improvements applied]";
};

// PUBLIC_INTERFACE
/**
 * Generates keyword recommendations for a specific job role
 * @param {string} jobTitle - Target job title
 * @return {Array} List of recommended keywords
 */
export const getKeywordRecommendations = (jobTitle) => {
  // This would come from a backend service with ML capabilities
  // Mock data for demonstration
  
  const keywords = {
    "Software Engineer": [
      "JavaScript", "React", "Node.js", "API Development", 
      "Full Stack", "Problem Solving", "Agile", "CI/CD"
    ],
    "Data Scientist": [
      "Python", "Machine Learning", "Data Analysis", "Statistical Modeling", 
      "SQL", "Data Visualization", "Big Data", "A/B Testing"
    ],
    "Product Manager": [
      "Product Strategy", "User Experience", "Market Research",
      "Roadmapping", "Stakeholder Management", "Agile/Scrum", "KPIs"
    ],
    "Marketing Specialist": [
      "Digital Marketing", "Campaign Management", "Social Media", 
      "Content Strategy", "SEO/SEM", "Analytics", "CRM"
    ]
  };
  
  return keywords[jobTitle] || [
    "Communication", "Leadership", "Project Management", 
    "Problem Solving", "Teamwork", "Time Management"
  ];
};
