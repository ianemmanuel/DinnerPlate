import Redis from "ioredis"
import dotenv from "dotenv"


dotenv.config()


export const redis = new Redis(process.env.REDIS_DATABASE_URI!,
  {
    tls: {},
    retryStrategy: (times:any) => Math.min(times * 50, 2000),
  }
)