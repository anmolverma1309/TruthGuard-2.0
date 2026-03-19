const axios = require('axios');

const key = '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';

const models = [
  "google/gemini-flash-1.5-8b",
  "meta-llama/llama-3.1-8b-instruct",
  "mistralai/mistral-7b-instruct",
  "openai/gpt-3.5-turbo-0125",
  "google/gemini-2.0-flash-lite-001"
];

async function check() {
  for (const model of models) {
    console.log(`Testing ${model}...`);
    try {
       const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [{ role: 'user', content: 'Hi' }],
        },
        {
          headers: { 'Authorization': `Bearer ${key}` },
          timeout: 5000
        }
      );
      console.log(`SUCCESS: ${model}`);
      return;
    } catch (e) {
      console.log(`FAIL: ${model} -> ${e.response?.data?.error?.message || e.message}`);
    }
  }
}

check();
