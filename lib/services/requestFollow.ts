import axios from "axios";

export async function requestFollows({ profileLink }: { profileLink: string }) {
  await axios.get(`https://smmengineer.com/api/v2`, {
    params: {
      key: process.env.GATEWAY_API_KEY,
      action: "add",
      service: "5122",
      link: profileLink,
      quantity: "100",
    },
  });
}
