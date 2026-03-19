const axios = require('axios');

async function getFreeModels() {
  try {
    const response = await axios.get('https://openrouter.ai/api/v1/models');
    const freeModels = response.data.data
      .filter(m => m.id.endsWith(':free'))
      .map(m => m.id);
    
    console.log('Available Free Models:');
    console.log(JSON.stringify(freeModels, null, 2));
  } catch (error) {
    console.error('Error fetching models:', error.message);
  }
}

getFreeModels();
