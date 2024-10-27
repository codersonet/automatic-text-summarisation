import React, { useState } from 'react';
import './styles/App.css';
import { summarizeText } from './api/summarizerAPI';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('bullets'); // Default filter is "bullets"

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
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to summarize..."
          />
          <button onClick={handleSummarize} disabled={loading}>
            {loading ? "Summarizing..." : "Summarize"}
          </button>
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
