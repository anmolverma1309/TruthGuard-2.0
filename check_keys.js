const axios = require('axios');

const keys = [
  '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',
  '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'
];

async function checkKeys() {
  for (const key of keys) {
    console.log(`Checking key: ${key.substring(0, 15)}...`);
    try {
      const response = await axios.get('https://openrouter.ai/api/v1/auth/key', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      console.log(`Success: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error(`Failure: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

checkKeys();
