import { Typography } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import React from "react";

const Home: NextPage = () => {
  React.useEffect(() => {
    Router.push("/email");
  }, []);

  return (
    <div>
      <Head>
        <title>My Data For Followers</title>
        <meta
          name="description"
          content="Troque seus dados por seguidores no Instagram"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography>Olá! Vamos trocar nossos dados?</Typography>
      </main>
    </div>
  );
};

export default Home;
