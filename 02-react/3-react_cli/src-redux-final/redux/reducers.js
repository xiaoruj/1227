import { combineReducers } from "redux";
import { INCREMENT, DECREMENT } from "./constants";
const initCount = 0;
function count(prevState = initCount, action) {
  console.log(prevState, action);
  switch (action.type) {
    case INCREMENT:
      return prevState + action.data;
    case DECREMENT:
      return prevState + action.data;
    default:
      return prevState;
  }
}
const initPerson = {
  name: "李易峰",
  age: 33,
};
function person(prevState = initPerson, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}
export default combineReducers({
  count,
  person,
});
