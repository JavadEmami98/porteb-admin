import * as types from "../constant";

export const handleLogin = (data) => async (dispatch, getState) => {
  localStorage.setItem("userInfo", JSON.stringify(data));

  dispatch({
    type: types.USER_LOGIN_SUCCESS,
    payload: data,
  });
};

export const handleLogOut = () => async (dispatch, getState) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: types.USER_LOGOUT,
  });
};

export const fetchUserDataSuccess = (userData) => ({
  type: types.FETCH_USER_DATA_SUCCESS,
  payload: userData,
});
