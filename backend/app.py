from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

summarizer = pipeline("summarization")

# Different summarization styles
def summarize_based_on_filter(text, filter_type):
    if filter_type == "bullets":
        return summarizer(text, max_length=150, min_length=30, do_sample=False)[0]['summary_text']
    elif filter_type == "crisp":
        return summarizer(text, max_length=100, min_length=50, do_sample=False)[0]['summary_text']
    elif filter_type == "important":
        return summarizer(text, max_length=200, min_length=100, do_sample=False)[0]['summary_text']
    elif filter_type == "highlight":
        return summarizer(text, max_length=120, min_length=60, do_sample=False)[0]['summary_text']
    elif filter_type == "professional":
        return summarizer(text, max_length=180, min_length=90, do_sample=False)[0]['summary_text']
    elif filter_type == "letter":
        return summarizer(text, max_length=250, min_length=120, do_sample=False)[0]['summary_text']
    else:
        # Default to bullets if filter is unknown
        return summarizer(text, max_length=150, min_length=30, do_sample=False)[0]['summary_text']

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data.get('text', '')
    filter_type = data.get('filter', 'bullets')  # Default filter is bullets
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        summary = summarize_based_on_filter(text, filter_type)
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
