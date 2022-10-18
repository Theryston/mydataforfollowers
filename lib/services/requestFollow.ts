import axios from "axios";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "");

export async function requestFollows({ profileLink }: { profileLink: string }) {
  try {
    const { data } = await axios.get(`https://mundialmidia.com.br/api/v2`, {
      params: {
        key: process.env.GATEWAY_API_KEY,
        action: "add",
        service: "243",
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
