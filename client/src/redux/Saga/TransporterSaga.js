import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import TransporterService from "../../services/TransporterServices";
import Notification from "../../util/Notification";

import {
  getTransporterListAct,
  setTransporterListAct,
} from "../Actions/TransporterAction";

import {
  ADD_TRANSPORTER_API,
  DELETE_TRANSPORTER_API,
  GET_TRANSPORTER_LIST_API,
  UPDATE_TRANSPORTER_API,
} from "../Constants/TransporterConst";

function* getTransporterListApi() {
  try {
    let { data, status } = yield call(TransporterService.getTransporterList);

    if (data.success) {
      yield put(setTransporterListAct(data.transporters));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* addTransporteApi(action) {
  try {
    const { transporter } = action;
    let { data, status } = yield call(
      TransporterService.addTransporter,
      transporter
    );
    if (data.success) {
      let history = yield select((state) => state.RouteReducer.history);
      Notification("success", "Thêm mới thành công", data.message);
      yield delay(300);
      history.push("/buses");
      
    }
  } catch (error) {
    console.log(error.message);
    
  }
}
function* deleteTransporterApi(action) {
  try {
    const { id } = action;
    let { data, status } = yield call(TransporterService.deleteTransporter, id);
    if (data.success) {
      
      Notification("success", "Xoá thành công", data.message);
      
      
      yield put(getTransporterListAct());
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* uppdateTransporterApi(action) {
  try {
    const { transporter } = action;
    let { data, status } =yield call(
      TransporterService.uppdateTransporter,
      transporter
    );
    if (data.success) {
      let history = yield select((state) => state.RouteReducer.history);
      Notification("success", "Cập nhật thành công", data.message);
      yield delay(300);
      history.push("/buses");
      
    }else{
      Notification("error", "Cập nhật thất bại", data.message);
    }
  } catch (error) {
    console.log(error.message);
    
  }
}

function* TransporterSaga() {
  yield takeLatest(GET_TRANSPORTER_LIST_API, getTransporterListApi);
  yield takeLatest(DELETE_TRANSPORTER_API, deleteTransporterApi);
  yield takeLatest(ADD_TRANSPORTER_API, addTransporteApi);
  yield takeLatest(UPDATE_TRANSPORTER_API, uppdateTransporterApi);
}
export default TransporterSaga;
