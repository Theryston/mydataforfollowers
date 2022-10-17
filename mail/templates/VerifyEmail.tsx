import { Group } from "@jsx-mail/components";
import React from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";

type Props = {
  code: string;
};

export function VerifyEmail({ code }: Props) {
  return (
    <Layout>
      <Group align="center">
        <h1>Verificação de Email</h1>
        <p>
          Este e-mail tem a finalidade de verificar o e-mail fornecido no site
          Exchange My Data For Followers. Se você não inseriu seu endereço de
          e-mail neste site, ignore esta mensagem e não forneça o código abaixo
          a ninguém. No entanto, se você mesmo digitou o endereço de e-mail,
          basta digitar o código abaixo no campo que apareceu no site após
          digitar seu e-mail.
        </p>
        <b>Código:</b>
        <Group align="center">{code}</Group>
        <p>
          Lembre-se de não compartilhar o código com ninguém e não somos
          responsáveis pelos resultados do compartilhamento deste código.
        </p>
      </Group>
    </Layout>
  );
}
