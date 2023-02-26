import { createStore } from "redux";

const initialState = {
  botaoCliclado: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOTAO_CLICADO":
      const newState = { ...state };
      newState.botaoCliclado = !newState.botaoCliclado;
      return newState;

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
