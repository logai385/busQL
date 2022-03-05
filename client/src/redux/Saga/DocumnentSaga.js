import { put, takeLatest, call, select, delay } from "redux-saga/effects";
import DocumentServices from "../../services/DocumentServices";

import {
  ADD_DOCUMENT_API,
  DELETE_DOCUMENT_API,
  GET_DOCUMENT_LIST_API,
} from "../Constants/DocumentConst";
import Notification from "../../util/Notification";
import { setDocumentList } from "../Actions/DocumentAction";

function* getDocumentListApi() {
  try {
    let { data, status } = yield call(DocumentServices.getDocumentList);

    if (data.success) {
      yield put(setDocumentList(data.documentList));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* addDocumentApi(action) {
  try {
    const { data, status } = yield call(() => {
      return DocumentServices.addDocument(action.data);
    });

    let history = yield select((state) => state.RouteReducer.history);
    if (data.success) {
      Notification("success", "Thêm mới thành công", data.message);
      yield delay(500);
      history.push("/documents");
    }
    if (data.success === false) {
      Notification("error", "Thêm mới thất bại", data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* deleteDocumentApi(action) {
  try {
    const { data, status } = yield call(() => {
      return DocumentServices.deleteDocument(action.id);
    });

    if (data.success) {
      Notification("success", "Xóa thành công", data.message);
      yield put({ type: GET_DOCUMENT_LIST_API });
    }
  } catch (error) {}
}

function* DocumentSaga() {
  yield takeLatest(GET_DOCUMENT_LIST_API, getDocumentListApi);
  yield takeLatest(ADD_DOCUMENT_API, addDocumentApi);
  yield takeLatest(DELETE_DOCUMENT_API, deleteDocumentApi);
}
export default DocumentSaga;
