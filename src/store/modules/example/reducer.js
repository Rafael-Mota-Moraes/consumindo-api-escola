import * as types from "../types";

const initialState = {
  botaoCliclado: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log("BOTAO_CLICADO_SUCCESS");
      return state;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log("BOTAO_CLICADO_FAILURE");
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log("BOTAO_CLICADO_REQUEST");
      return state;
    }

    default: {
      return state;
    }
  }
}
