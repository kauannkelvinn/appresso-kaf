import dotenv from 'dotenv';
dotenv.config();

const config = {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

export default config;