// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { app } from './src/app'

// Load our database connection info from the app configuration
const config = app.get('sqlite')

const seedsConfig = {
    seeds: {
      directory: './seeds',
    },
  };
  
// Merge seeds configuration with existing config
const knexConfig = {
    ...config,
    ...seedsConfig,
};
  
module.exports = knexConfig
