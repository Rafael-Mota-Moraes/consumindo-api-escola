import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default function persistedReducers(reducers) {
  const persistedReducers = persistReducer(
    {
      key: "REACT-APP",
      storage,
      whitelist: ["example"]
    },
    reducers
  );

  return persistedReducers;
}
