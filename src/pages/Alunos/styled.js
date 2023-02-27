import styled from "styled-components";

import * as colors from "../../config/colors";

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #555;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  a {
    color: ${colors.primaryColor};
  }
`;
