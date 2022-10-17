import React from "react";
import { Group } from "@jsx-mail/components";
import styled from "styled-components";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Body>{children}</Body>
    </Container>
  );
}

const Container = styled(Group)`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px 150px;
  background-color: #f7f7f7;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Body = styled(Group)`
  background-color: #fff;
  padding: 20px;
`;
