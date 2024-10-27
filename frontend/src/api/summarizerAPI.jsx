import axios from 'axios';

export const summarizeText = async (text) => {
  try {
    const response = await axios.post('http://localhost:5000/summarize', { text });
    return response.data;
  } catch (error) {
    console.error("Error summarizing text", error);
    throw error;
  }
};
