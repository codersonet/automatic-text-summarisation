from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # To enable cross-origin requests from React frontend

# Load the summarization pipeline from Hugging Face
summarizer = pipeline("summarization")

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data.get('text', '')
    
    # Check if text is provided
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        # Generate a summary of the text
        summary = summarizer(text, max_length=150, min_length=30, do_sample=False)[0]['summary_text']
        return jsonify({'summary': summary}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
  
