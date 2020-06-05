import axios from 'axios'
import {GET_USERS_DATA_FAILED, GET_USERS_DATA_SUCCESS, LOADING,} from './constants'
export const getUsersDataSuccessSync = (users) => ({
  type: GET_USERS_DATA_SUCCESS,
  data: users,
})
export const getUsersDataFailedSync = (error) => ({
  type: GET_USERS_DATA_FAILED,
  data: error,
})
export const getUsersData = (searchName) => {
  return (dispatch) => {
    dispatch(loadingSync())
    axios.get('./search/users', {
      params:{
        q: searchName,
      }
    })
    .then((response) => {
      const users = response.data.items.map((user) => {
        return {
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          id: user.id,
        }
      })
      const action = getUsersDataSuccessSync(users)
      dispatch(action)
    })
    .catch((err) => {
      dispatch(getUsersDataFailedSync('网络出现故障，请稍后再试'))
    })
  }
}

