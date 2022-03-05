import { SET_EDIT_LINE, SET_LINE_LIST } from "../Constants/LineConst";

const initialState = {
  lineList: [],
  editingLine:{
    id:"",
    lineNumber:1,
    description:"",
    status:true
  }
};

const LineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LINE_LIST:
   
      return { ...state,lineList:action.lineList};
    case SET_EDIT_LINE:
      return { ...state,editingLine:action.line};
    default:
      return { ...state };
  }
};
export default LineReducer;
