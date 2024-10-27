import React, { useState } from 'react';
import './styles/App.css';
import { summarizeText } from './api/summarizerAPI';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('bullets'); // Default filter is "bullets"
  const [wordCount, setWordCount] = useState(0);   // Word count state

  const MAX_WORDS = 3000;

  // Handle word counting
  const handleInputChange = (e) => {
    const text = e.target.value;
    const words = text.split(/\s+/).filter((word) => word.length > 0);  // Split by spaces and filter out empty strings
    setWordCount(words.length);
    setInputText(text);
  };

  // Handle summarization
  const handleSummarize = async () => {
    if (!inputText) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      const response = await summarizeText(inputText, filter);
      setSummary(response.summary);
    } catch (error) {
      alert("Failed to summarize text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>TEXT SUMMARISER</h1>
        <div className="filter-container">
          <label htmlFor="filter-select">Choose Summarization Type:</label>
          <select
            id="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="bullets">Bullets</option>
            <option value="crisp">Crisp</option>
            <option value="important">Important</option>
            <option value="highlight">Highlight</option>
            <option value="professional">Professional</option>
            <option value="letter">Letter</option>
          </select>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content-container">
        <div className="input-section">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text to summarize..."
          />
          
          {/* Display word count and limit */}
          <p className={`word-count ${wordCount > MAX_WORDS ? 'over-limit' : ''}`}>
            Word Count: {wordCount}/{MAX_WORDS}
          </p>

          {/* Summarize button disabled if word count exceeds limit */}
          <button onClick={handleSummarize} disabled={loading || wordCount > MAX_WORDS}>
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          {/* Warning message if word count exceeds limit */}
          {wordCount > MAX_WORDS && (
            <p className="warning">Word limit exceeded. Please reduce the word count to {MAX_WORDS}.</p>
          )}
        </div>

        <div className="output-section">
          <div className="summary-box">
            {summary ? summary : "Your summary will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
