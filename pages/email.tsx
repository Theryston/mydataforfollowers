import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { validateEmail } from "../util/validateEmail";

const Email: NextPage = () => {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [profileLink, setProfileLink] = React.useState("");
  const [code, setCode] = React.useState("");
  const [inviteId, setInviteId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.inviteId) {
      setInviteId(Number(router.query.inviteId));
    }
  }, [router.query]);

  const handleSubmitEmail = React.useCallback(async () => {
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

    const body: any = {
      email,
      profileLink,
    };

    if (inviteId) {
      body.inviteId = inviteId;
    }

    setIsLoading(true);
    const res = await fetch("/api/email", {
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

    setStep(2);
  }, [email, profileLink, inviteId]);

  const handleVerifyEmail = React.useCallback(async () => {
    if (!code) {
      alert("Insira o código enviado para o seu email");
      return;
    }

    if (code.length !== 6) {
      alert("O código deve ter 6 caracteres");
      return;
    }

    const body: any = {
      code,
    };

    setIsLoading(true);
    const res = await fetch("/api/verify-email", {
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

    setStep(3);
  }, [code]);

  return (
    <div>
      <Head>
        <title>Email | My Data For Followers</title>
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
            {step === 1 && (
              <>
                <Typography variant="h1">EMAIL</Typography>
                <Typography style={{ marginTop: "20px", textAlign: "center" }}>
                  Troque seu e-mail por 100 seguidores no Instagram. Ao inserir
                  seu e-mail e confirmá-lo, você receberá os seguidores em até
                  30 minutos
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
                    helperText="Adicione aqui o link do seu perfil do Instagram. o seu perfil no Instagram deve ser publico e você não pode mudar o nome de usuário dele antes dos 100 novos seguidores aparecerem para você. Exemplo: https://www.instagram.com/example"
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSubmitEmail}
                    disabled={isLoading}
                  >
                    {isLoading && <CircularProgress size={14} />}
                    {!isLoading && "Enviar E-mail"}
                  </Button>
                </Box>
              </>
            )}

            {step === 2 && (
              <>
                <Typography variant="h1">Verificar Email</Typography>
                <Typography style={{ marginTop: "20px", textAlign: "center" }}>
                  Informe o código enviado para o seu email:
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
                    name="code"
                    fullWidth
                    label="Código"
                    variant="standard"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    helperText="Enviamos um código para o seu email. Insira ele aqui para confirmar o seu email"
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleVerifyEmail}
                  >
                    {isLoading && <CircularProgress size={14} />}
                    {!isLoading && "Verificar E-mail"}
                  </Button>
                </Box>
              </>
            )}

            {step === 3 && (
              <>
                <Typography variant="h1">Parabéns!</Typography>
                <Typography style={{ marginTop: "20px", textAlign: "center" }}>
                  Parabéns! O seu email foi verificado e você receberá os
                  seguidores em até 30 minutos!
                </Typography>
                <Typography style={{ marginTop: "20px", textAlign: "center" }}>
                  Quer ganhar mais seguidores? Convide seus amigos para trocar o
                  email por seguidores no Instagram também!
                </Typography>

                <Link href="/invite">
                  <a
                    style={{
                      textDecoration: "none",
                      marginTop: "20px",
                    }}
                  >
                    <Button fullWidth variant="outlined">
                      Convidar amigos!
                    </Button>
                  </a>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Email;
