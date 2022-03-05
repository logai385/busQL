import { all } from "redux-saga/effects";
import LineSaga from "./LineSaga";
import DocumentSaga from "./DocumnentSaga";

import TransporterSaga from "./TransporterSaga";
export function* rootSaga() {
  yield all([LineSaga(), DocumentSaga(), TransporterSaga()]);
}
