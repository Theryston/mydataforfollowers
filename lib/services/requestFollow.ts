import axios from "axios";

export async function requestFollows({ profileLink }: { profileLink: string }) {
  await axios.get(`https://mundialmidia.com.br/api/v2`, {
    params: {
      key: process.env.GATEWAY_API_KEY,
      action: "add",
      service: "243",
      link: profileLink,
      quantity: "10",
    },
  });
}
