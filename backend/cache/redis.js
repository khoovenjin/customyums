import dotenv from "dotenv";
import { Redis } from 'ioredis';

dotenv.config();

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: process.env.REDIS_DB
});

export default redis;