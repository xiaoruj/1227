import { combineReducers } from "redux";
import { ADD_COMMENT, DEL_COMMENT } from "./constants";
const initComments = [
  { id: 1, name: "李易峰", content: "我在北京等你" },
  { id: 2, name: "晓儒纪", content: "尚硅谷" },
];
function comments(prevState = initComments, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [action.data, ...prevState];
    case DEL_COMMENT:
      return prevState.filter((comment) => comment.id !== action.data);
    default:
      return prevState;
  }
}
export default combineReducers({
  comment,
});
