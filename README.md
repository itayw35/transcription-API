# Speech-to-Text (Speechmatics) Service

Simple Node.js service that uses the Speechmatics Batch API to transcribe audio files and export a .docx transcript.

## Features
- Transcribes audio using `@speechmatics/batch-client`.
- Writes transcript to a `.docx` file using the `docx` library.
- Saves output to a configurable local path (adjust in code).

## Prerequisites
- Node.js 14+ (recommend using an active LTS version)
- An API key for Speechmatics

## Installation
1. Clone the repo and cd into the project root.
2. Install dependencies:

```bash
npm install
```

## Environment
Create a `.env` or set the environment variable for the Speechmatics API key:

```bash
export API_KEY="your_speechmatics_api_key"
```

## Files of interest
- `index.js` — entry point for the app (if present)
- `BL/transcriptLogic.js` — main transcription logic and `.docx` export
- `Routes/mainRouter.js` — routing (if used by the app)

## Usage
The module exports `transcribeFile(file, fileName)` from `BL/transcriptLogic.js`.

Example (pseudo-usage inside an Express route):

```javascript
const { transcribeFile } = require('./BL/transcriptLogic');

// `file` should be a Buffer or File object depending on how you collect uploads
async function handleUpload(req, res) {
  const fileBuffer = req.file.buffer; // example using multer
  const fileName = req.file.originalname;
  const result = await transcribeFile(fileBuffer, fileName);
  res.status(result.code).send(result.message);
}
```

Notes:
- `transcribeFile` uses `docx` to build a `.docx` buffer and writes it to the Desktop by default. Adjust the path in `BL/transcriptLogic.js` (variable `filePath`).
- Text files (plain `.txt` or `.json`) should be written with UTF-8 encoding: e.g. `fs.writeFileSync(path, content, 'utf8')`.
- `.docx` output is binary; do not pass an encoding string to `fs.writeFileSync` when writing the buffer.

## Dependencies
- `@speechmatics/batch-client`
- `docx`

Install them with `npm install` as shown in Installation.

## Troubleshooting
- If `.docx` appears corrupted, ensure you write the buffer directly (no `'utf8'` encoding).
- For authentication errors, verify `API_KEY` and `apiUrl` in the client configuration.

## Next steps
- Make the output path configurable via an environment variable.
- Add tests and an example CLI or HTTP endpoint for easier manual testing.

---
Created for the local speech-to-text small service. Adjust usage to your upload middleware and runtime environment.
