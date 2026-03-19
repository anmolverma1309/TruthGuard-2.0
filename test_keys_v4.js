const axios = require('axios');

const keys = [
  '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',
  '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'
];

const model = 'nvidia/nemotron-3-super-120b-a12b:free';

async function test() {
  for (const key of keys) {
    console.log(`Testing key: ${key.substring(0, 15)}...`);
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [{ role: 'user', content: 'Say "Success" if you read this.' }],
        },
        {
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );
      console.log(`Success with key ${key.substring(0, 8)}: -> ${response.data.choices[0].message.content}`);
    } catch (error) {
       const msg = error.response?.data?.error?.message || error.message;
      console.error(`Failure with key ${key.substring(0, 8)}: -> ${msg}`);
    }
  }
}

test();
