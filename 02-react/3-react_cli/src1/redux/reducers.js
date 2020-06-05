import { combineReducers } from "redux";
import { GET_USERS_DATA_FAILED, GET_USERS_DATA_SUCCESS, LOADING, } from "./constants";
const initUserList = {
  isFirstView: true,
  isLoading: false,
  users: null,
  error: '',
}
function userList(prevState = initUserList, action){
  switch(action.type){
    case LOADING:
      return{
        ...prevState,
        isFirstView: false,
        isLoading: true,
      }
    case GET_USERS_DATA_SUCCESS:
      return {
        ...prevState,
        isLoading: true,
        users: action.data,
      }
    case GET_USERS_DATA_FAILED:
      return{
        ...prevState,
        isLoading: true,
        users: null,
        error: action.data,
      }
    default:
      return prevState
  }
}
export default combineReducers({
  userList,
})
