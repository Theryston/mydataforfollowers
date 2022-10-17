import { Box, Button, TextField, Typography } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { validateEmail } from "../util/validateEmail";

const Email: NextPage = () => {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [profileLink, setProfileLink] = React.useState("");

  const handleSubmitEmail = React.useCallback(() => {
    if (!validateEmail(email)) {
      alert("Insira um email válido");
      return;
    }

    if (
      !profileLink.startsWith("https://www.instagram.com/") &&
      !profileLink.startsWith("https://instagram.com/")
    ) {
      alert("Parece que você não digitou seu link do seu Instagram");
      return;
    }

    const body = {
      email,
      profileLink,
    };

    console.log(body);

    setStep(2);
  }, [email, profileLink]);

  return (
    <div>
      <Head>
        <title>Email | Exchange My Data For Followers</title>
        <meta
          name="description"
          content="Troque seu email por seguidores no Instagram"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {step === 1 && (
              <>
                <Typography variant="h1">EMAIL</Typography>
                <Typography style={{ marginTop: "20px", textAlign: "center" }}>
                  Troque seu e-mail por 10 seguidores no Instagram. Ao inserir
                  seu e-mail e confirmá-lo, você receberá os seguidores em até 2
                  horas
                </Typography>
                <Box
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    gap: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    name="Email"
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    name="link"
                    fullWidth
                    label="Link do Instagram"
                    variant="standard"
                    value={profileLink}
                    onChange={(e) => setProfileLink(e.target.value)}
                    helperText="Adicione aqui o link do seu perfil do Instagram. o seu perfil no Instagram deve ser publico e você não pode mudar o nome de usuário dele antes dos 10 novos seguidores aparecerem para você. Exemplo: https://www.instagram.com/example"
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSubmitEmail}
                  >
                    Verificar E-mail
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Email;
