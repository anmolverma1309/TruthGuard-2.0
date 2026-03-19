const axios = require('axios');
const fs = require('fs');

async function getFreeModels() {
  try {
    const response = await axios.get('https://openrouter.ai/api/v1/models');
    const freeModels = response.data.data
      .filter(m => m.id.endsWith(':free'))
      .map(m => m.id);
    
    fs.writeFileSync('free_models.txt', freeModels.join('\n'));
    console.log(`Saved ${freeModels.length} free models to free_models.txt`);
  } catch (error) {
    console.error('Error fetching models:', error.message);
  }
}

getFreeModels();
