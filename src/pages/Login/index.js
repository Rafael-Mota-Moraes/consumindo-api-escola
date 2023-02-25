import React from "react";

import { Container } from "../../styles/GlobalStyles";
import { Title, Paragrafo } from "./styled";

export default function Login() {
  return (
    <Container>
      <Title isRed={false}>
        Login<small>Olá</small>
      </Title>
      <Paragrafo>lorem ipsum dolor sit amet.</Paragrafo>
      <button>Enviar</button>
    </Container>
  );
}
