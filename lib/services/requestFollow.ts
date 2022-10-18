import axios from "axios";

export async function requestFollows({ profileLink }: { profileLink: string }) {
  await axios.get(`https://lionsprovedor.com/api/v2`, {
    params: {
      key: process.env.LIONS_API_KEY,
      action: "add",
      service: "140",
      link: profileLink,
      quantity: "10",
    },
  });
}
