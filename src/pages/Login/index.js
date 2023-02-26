import React from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { Title, Paragrafo } from "./styled";
import * as exempleActions from "../../store/modules/example/actions";

import axios from "../../services/axios";

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exempleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title isRed={false}>
        Login<small>Olá</small>
      </Title>
      <Paragrafo>lorem ipsum dolor sit amet.</Paragrafo>
      <button onClick={handleClick}>Enviar</button>
    </Container>
  );
}
