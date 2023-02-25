import styled from "styled-components";

export const Title = styled.h1`
  color: blue;
  background-color: ${(props) => (props.isRed ? "red" : "#ddd")};

  small {
    font-size: 12pt;
    margin-left: 15px;
  }
`;

export const Paragrafo = styled.p``;
