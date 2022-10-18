import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Email: NextPage = () => {
  const [profileLink, setProfileLink] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmitInvite = React.useCallback(async () => {
    if (
      !profileLink.startsWith("https://www.instagram.com/") &&
      !profileLink.startsWith("https://instagram.com/")
    ) {
      alert("Parece que você não digitou seu link do seu Instagram");
      return;
    }

    const body: any = {
      profileLink,
    };

    setIsLoading(true);
    const res = await fetch("/api/invite", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    const url = `${window.location.origin}/email?inviteId=${data.id}`;

    await navigator.share({
      title: "Copie o link e envie para seus amigos",
      text: "Copie o link e envie para seus amigos",
      url,
    });
  }, [profileLink]);

  return (
    <div>
      <Head>
        <title>Indicar | My Data For Followers</title>
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
              padding: "20px",
            }}
          >
            <>
              <Typography variant="h1">Indicar</Typography>
              <Typography style={{ marginTop: "20px", textAlign: "center" }}>
                Adicione o link do seu perfil do Instagram e nós iremos gerar um
                link personalizado para você, a cada pessoa que trocar o seu
                e-mail por seguidor a partir do seu link você ganhará 10
                seguidores no link do Instagram que você informar abaixo:
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
                  onClick={handleSubmitInvite}
                >
                  {isLoading && <CircularProgress size={14} />}
                  {!isLoading && "Gerar link"}
                </Button>
              </Box>
            </>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Email;
