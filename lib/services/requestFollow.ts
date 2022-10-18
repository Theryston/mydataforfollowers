import axios from "axios";
import { Redis } from "@upstash/redis/nodejs";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || "",
  token: process.env.UPSTASH_REDIS_TOKEN || "",
});

export async function requestFollows({ profileLink }: { profileLink: string }) {
  try {
    const { data } = await axios.get(`https://lionsprovedor.com/api/v2`, {
      params: {
        key: process.env.LIONS_API_KEY,
        action: "add",
        service: "140",
        link: profileLink,
        quantity: "10",
      },
    });
    if (data.error) {
      console.log(data.error);
      addQueue(profileLink);
    }
  } catch (error) {
    console.log(error);
    addQueue(profileLink);
  }
}

const addQueue = async (profileLink: string) => {
  await redis.lpush("profileLinks", profileLink);
};
