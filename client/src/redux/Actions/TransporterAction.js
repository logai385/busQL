import {
  ADD_TRANSPORTER_API,
  DELETE_TRANSPORTER_API,
  GET_TRANSPORTER_LIST_API,
  SET_TRANSPORTER_LIST,
  UPDATE_TRANSPORTER_API,
} from "../Constants/TransporterConst";

export const setTransporterListAct = (transporterList) => ({
  type: SET_TRANSPORTER_LIST,
  transporterList: transporterList,
});

export const getTransporterListAct = () => ({
  type: GET_TRANSPORTER_LIST_API,
});

export const deleteTransporterAct = (id) => ({
  type: DELETE_TRANSPORTER_API,
  id: id,
});
export const addTransporterAct = (transporter) => ({
  type: ADD_TRANSPORTER_API,
  transporter: transporter,
})
export const postTransporterAct = (transporter) => ({
  type: UPDATE_TRANSPORTER_API,
  transporter: transporter,
})
