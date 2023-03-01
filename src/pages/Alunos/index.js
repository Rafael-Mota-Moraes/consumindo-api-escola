import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation
} from "react-icons/fa";

import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import {
  AlunoContainer,
  IconsContainer,
  ProfilePicture,
  NovoAluno
} from "./styled";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/alunos");

      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;

    exclamation.setAttribute("display", "block");
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (error) {
      const status = get(error, "response.status", 0);
      const errors = get(error, "response.data.errors", []);

      if (status === 401) {
        toast.error("Você precisa fazer login");
        setIsLoading(false);
        return;
      }

      errors.map((error) => toast.error(error));
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to={"/aluno/"}>Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={aluno.id}>
            <ProfilePicture>
              {get(aluno, "Fotos[0].url", false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <IconsContainer>
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>

              <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
              </Link>

              <FaExclamation
                size={16}
                display="none"
                cursor="pointer"
                onClick={(e) => handleDelete(e, aluno.id, index)}
              />
            </IconsContainer>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
