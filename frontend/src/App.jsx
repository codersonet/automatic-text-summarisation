import React, { useState } from 'react';
import './styles/App.css';
import { summarizeText } from './api/summarizerAPI';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      const response = await summarizeText(inputText);
      setSummary(response.summary);
    } catch (error) {
      alert("Failed to summarize text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="input-section">
        <h1>Text Summarization</h1>
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
        <h1>Summary</h1>
        <div className="summary-box">
          {summary ? summary : "Your summary will appear here..."}
        </div>
      </div>
    </div>
  );
}

export default App;

