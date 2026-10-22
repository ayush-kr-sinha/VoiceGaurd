# VoiceGuard Website Prototype

A dark, minimal AI voice-authenticity dashboard inspired by the uploaded reference.

## Run
Open `index.html` in a browser.

## Current functionality
- New Analysis page
- Drag/drop and file picker
- Demo risk analysis UI
- Analysis history with search/filter
- About page
- Responsive styling

## Connecting your real AI model
Replace the demo `setTimeout` block in `script.js` with a POST request to your FastAPI backend, for example:

```js
const form = new FormData();
form.append("file", selected);
const response = await fetch("http://127.0.0.1:8000/analyze", {
  method: "POST",
  body: form
});
const data = await response.json();
```

Expected backend response can contain:
`risk`, `confidence`, `ai_probability`, `processing_time`, and `recommendation`.
