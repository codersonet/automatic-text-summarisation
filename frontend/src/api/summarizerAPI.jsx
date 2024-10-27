import React, { useState } from 'react';
import axios from 'axios';

const Summarizer = () => {
    const [inputText, setInputText] = useState('');
    const [filter, setFilter] = useState('bullets');
    const [summary, setSummary] = useState('');
    
    const handleSummarize = async () => {
        try {
            const response = await axios.post('http://localhost:5000/summarize', {
                text: inputText,
                filter: filter,
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error summarizing text:", error);
        }
    };

    return (
        <div>
            <h1>Text Summarizer</h1>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text here..."
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="bullets">Bullets</option>
                <option value="crisp">Crisp</option>
                <option value="important">Important</option>
                <option value="highlight">Highlight</option>
                <option value="professional">Professional</option>
                <option value="letter">Letter</option>
            </select>
            <button onClick={handleSummarize}>Summarize</button>
            <div>
                <h2>Summary</h2>
                <p>{summary}</p>
            </div>
        </div>
    );
};

export default Summarizer;
