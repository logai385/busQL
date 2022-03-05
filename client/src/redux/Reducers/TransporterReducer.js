import {
  SET_EDITING_TRANSPORTER,
  SET_TRANSPORTER_LINE_LIST,
  SET_TRANSPORTER_LIST,
} from "../Constants/TransporterConst";

const initialState = {
  transporterList: [],
  editingTransporter: {},
  lineList: [],
};
const TransporterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSPORTER_LIST:
      state.transporterList = action.transporterList;
      return { ...state };
    case SET_EDITING_TRANSPORTER:
      state.editingTransporter = action.transporter;
      return { ...state };
    case SET_TRANSPORTER_LINE_LIST:
      state.lineList = action.lineList;
      return { ...state };
    default:
      return { ...state };
  }
};
export default TransporterReducer;
