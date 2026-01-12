// src/config/database.config.ts
export const databaseConfig = {
  uri: process.env.MONGO_URI,
  options: {
    autoIndex: false,
  },
};

