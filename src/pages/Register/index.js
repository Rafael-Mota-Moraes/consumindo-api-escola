import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";

import axios from "../../services/axios";
import history from "../../services/history";

export default function Register() {
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error("Campo nome precisa ter entre 3 e 255 caracteres");
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email inválido");
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error("Senha  precisa ter entre 6 e 50 caracteres");
    }

    if (formErrors) {
      return;
    }

    try {
      await axios.post("/users", {
        nome,
        password,
        email
      });

      toast.success("Você fez seu cadastro");
      history.push("/login");
    } catch (error) {
      const status = get(error, "response.status", 0);
      const errors = get(error, "response.data.errors", []);
      errors.map((err) => toast.error(err));
    }
  }

  return (
    <Container>
      <h1>Crie Sua Conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
