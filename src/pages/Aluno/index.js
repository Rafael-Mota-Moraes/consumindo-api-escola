import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { isEmail, isInt, isFloat } from "validator";
import PropTypes from "prop-types";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import axios from "../../services/axios";
import history from "../../services/history";
import { useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
export default function Aluno({ match }) {
  const id = get(match, "params.id", 0);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState();
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, "fotos[0].url", "");

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const status = get(error, "response.status", 0);
        const errors = get(error, "response.data.errors", []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push("/");
        }
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error("Nome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error("Sobrenome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error("Email inválido");
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error("Insira uma idade válida!");
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error("Insira um peso válida!");
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error("Insira uma altura válida!");
      formErrors = true;
    }

    if (formErrors) {
      return;
    }

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura
        });

        toast.success("Aluno(a) editado com sucesso!");
        history.push("/");
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura
        });
        toast.success("Aluno(a) criado com sucesso!");

        history.push("/");
      }
      setIsLoading(false);
    } catch (error) {
      const status = get(error, "response.status", 0);
      const data = get(error, "response.data", {});
      const errors = get(error, "response.errors", []);

      if (errors.length > 0) {
        return errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <h1>{id ? "Editar Aluno" : "Novo Aluno"}</h1>

      <Loading isLoading={isLoading} />

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="text"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button>Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired
};
