import { call, put, takeLatest, delay, select } from "redux-saga/effects";
import LineService from "../../services/LineServices";
import { STATUS_CODE } from "../../util/Constants/SystemSettings";
import { setLineListAct } from "../Actions/LineAction";
import Notification from "../../util/Notification";

import {
  ADD_LINE_API,
  DELETE_LINE_API,
  GET_LINE_LIST_API,
  POST_LINE_API,
} from "../Constants/LineConst";
function* getLineListApi() {
  try {
    const { data, status } = yield call(LineService.getLineList);
    if (data.success) {
      yield put(setLineListAct(data.lines));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* addLineApi(action) {
  try {
    const { data, status } = yield call(LineService.addNewLine, action.line);
    if (data.success) {
      let history = yield select((state) => state.RouteReducer.history);
      Notification("success", "Thêm mới thành công", data.message);
      yield delay(300);
      history.push("/lines");
    }
  } catch (error) {}
}
function* updateLineApi(action) {
  try {
    const { data, status } = yield call(LineService.updateLine, action.line);
    if (data.success) {
      let history = yield select((state) => state.RouteReducer.history);
      Notification("success", "Cập nhật thành công", data.message);
      yield delay(300);
      history.push("/lines");
    }
  } catch (error) {}
}
function* deleteLineApi(action) {
  try {
    const { data, status } = yield call(LineService.deleteLine, action.id);
    if (data.success ) {
      let history = yield select((state) => state.RouteReducer.history);
      Notification("success", "Xoá thành công", data.message);
      yield delay(300);
      history.push("/lines");
      yield put({
        type: GET_LINE_LIST_API,
      });
    }
  } catch (error) {}
}
function* LineSaga() {
  yield takeLatest(GET_LINE_LIST_API, getLineListApi);
  yield takeLatest(ADD_LINE_API, addLineApi);
  yield takeLatest(POST_LINE_API, updateLineApi);
  yield takeLatest(DELETE_LINE_API, deleteLineApi);
}
export default LineSaga;
