Setup instructions — step-by-step commands to get the app running (install dependencies, start Ollama, start backend, start frontend). Assume the reader has Node/Python installed but nothing else.

The Project Structure
dt-project/
├── backend/            <-- Node.js folder
│   ├── server.js       <-- Your API code
│   └── package.json    
├── frontend/           <-- React folder
│   ├── src/            <-- Your UI code (App.js, etc.)
│   └── package.json    
├── rubric.json         <-- Move the assignment file here
├── context.md          <-- Move the assignment file here
└── sample-transcripts.json

Step A: Create the BackendOpen 
cd backend
npm init -y
npm install express cors node-fetch
note:node-fetch helps to communicate with backend Ollama API

Step B: Create the FrontendOpen 
npx create-react-app frontend
cd frontend

Which Ollama model you used and why you chose it.?
Download ollama.com and Install Ollama

Choose Llama model: need a base model that your Node.js backend can control directly.
Why Llama 3.2?It’s the standard: It's exactly what the assignment suggests.It follows orders: It is excellent at following the "Score 6 vs 7" logic and outputting the JSON your frontend needs.It’s fast: It won't lag your computer while you're trying to code.did  Hardware CheckIf you have 8GB RAM: Use llama3.2


Architecture overview — one paragraph or a simple diagram: what's the frontend, what's the backend, how do they talk to each other, where does Ollama fit?



Which design challenges you tackled (pick at least 2 from the list below) and what approach you took.
What you'd improve with more time — be specific. "Better UI" is vague. "Add a side-by-side view so the intern can see the transcript and analysis together" is specific.
