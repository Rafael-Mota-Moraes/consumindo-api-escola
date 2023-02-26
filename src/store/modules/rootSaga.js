import { all } from "redux-saga/effects";

import exemple from "./example/sagas";

export default function* rootSaga() {
  return yield all([exemple]);
}
