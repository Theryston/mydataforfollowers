import { Typography } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";

const Email: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Indicar | Exchange My Data For Followers</title>
        <meta
          name="description"
          content="Troque seu email por seguidores no Instagram"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography>Nos indique e ganhe seguidores</Typography>
      </main>
    </div>
  );
};

export default Email;
