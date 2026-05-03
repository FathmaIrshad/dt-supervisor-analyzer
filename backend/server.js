const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_ENDPOINT = 'http://localhost:11434/api/generate';

app.post('/analyze', async (req, res) => {
    const { transcript } = req.body;

    const systemPrompt = `
    You are a Psychology Intern at DeepThought. Analyze this supervisor feedback transcript.
    
    TASK:
    1. Extract evidence quotes with sentiment (positive/negative/neutral).
    2. Map work to KPIs: Lead Gen, Lead Conversion, Upselling, Cross-selling, NPS, PAT, TAT, Quality.
    3. Determine the Score (1-10) based on the Rubric.
    
    STRICT RULES:
    - Score 6 vs 7: A score of 6 is for task execution (doing what's told). A 7 requires "Problem Identification" (finding issues without being asked).
    - Bias Correction: Ignore "Presence Bias" (don't penalize laptop work). Identify "Helpfulness Bias" (absorbing supervisor tasks is a score 5-6, not 8-9).
    - Gap Analysis: Check for Execution, Systems Building, KPI Impact, and Change Management.

    OUTPUT: Return ONLY valid JSON:
    {
      "score": {"value": 0, "label": "", "justification": ""},
      "evidence": [{"quote": "", "sentiment": "", "dimension": ""}],
      "kpis": [],
      "gaps": [],
      "follow_ups": []
    }`;

    try {
        const response = await fetch(OLLAMA_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2',
                prompt: `${systemPrompt}\n\nTranscript: ${transcript}`,
                stream: false,
                format: 'json'
            })
        });

        const data = await response.json();
        const parsedResponse = JSON.parse(data.response);
        res.json(parsedResponse);
    } catch (error) {
        res.status(500).json({ error: "Is Ollama running? Error: " + error.message });
    }
});

app.listen(5000, () => console.log('Backend server running on http://localhost:5000'));