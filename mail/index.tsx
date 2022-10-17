import React from "react";
import { VerifyEmail } from "./templates/VerifyEmail";

export default function App() {
  return {
    VerifyEmail: {
      componentFunction: VerifyEmail,
      props: {
        code: "F3F2B5",
      },
    },
  };
}
