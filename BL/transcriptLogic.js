const { BatchClient } = require("@speechmatics/batch-client");
const { log } = require("node:console");
const { json } = require("node:stream/consumers");
const fs = require("fs");
const docx = require("docx");

async function transcribeFile(file, fileName) {
  if (!file) throw { code: 400, message: "missing file" };
  const client = new BatchClient({
    apiKey: process.env.API_KEY,
    apiUrl: "https://eu1.asr.api.speechmatics.com/v2",
    appId: "my_app",
  });
  console.log(client);

  try {
    const fileToTranscribe = new File([file], fileName);
    const response = await client.transcribe(
      fileToTranscribe,
      {
        transcription_config: {
          language: "he",
          operating_point: "enhanced",
          diarization: "speaker",
          speaker_diarization_config: {
            get_speakers: true,
          },
        },
      },
      "json-v2"
    );
    const res =
      // Transcripts can be strings when the 'txt' format is chosen
      typeof response === "string"
        ? response
        : response.results.map((r) => r.alternatives?.[0].content).join(" ");
    console.log(res);
    const filePath = "/Users/itayweinberg/Desktop";
    try {
      fs.writeFileSync(`${filePath}/transcription.txt`, res);
    } catch (err) {
      console.log(err);
    }
    return { code: 200, message: res };
  } catch (err) {
    console.error(err);
    return { code: 500, message: err };
  }
}
module.exports = { transcribeFile };
