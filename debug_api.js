const axios = require('axios');

const key = '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';

async function check() {
  console.log('Testing google/gemini-2.0-flash-exp (should be free)...');
  try {
     const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [{ role: 'user', content: 'Hi' }],
      },
      {
        headers: { 'Authorization': `Bearer ${key}` },
        timeout: 10000
      }
    );
    console.log('Gemini 2.0 Success!');
  } catch (e) {
    console.log('Gemini 2.0 Fail: ' + (e.response?.data?.error?.message || e.message));
  }

  console.log('\nTesting a paid model (openai/gpt-3.5-turbo)...');
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hi' }],
      },
      {
        headers: { 'Authorization': `Bearer ${key}` },
        timeout: 10000
      }
    );
    console.log('Paid Model Success!');
  } catch (e) {
    console.log('Paid Model Fail: ' + (e.response?.data?.error?.message || e.message));
  }
}

check();
