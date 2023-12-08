import * as types from "../constant";
import { combineReducers } from "redux";

export const userLoginReducer = (userInfo = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_LOGOUT:
      return { loading: false, user: {}, userInfo: null };
    default:
      return userInfo;
  }
};

const reducers = {
  userLogin: userLoginReducer,
};

export default combineReducers(reducers);
