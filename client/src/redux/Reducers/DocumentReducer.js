import { SET_DOCUMENT_LIST } from "../Constants/DocumentConst";

const initialState = {
  documentList: [],
};

const DocumentReducer = (state = initialState, action) => {
  const {type, payload}=action;
  switch (type) {
    case SET_DOCUMENT_LIST:
      state.documentList = payload;
      return { ...state };
    default:
      return state;
  }
};

export default DocumentReducer;
