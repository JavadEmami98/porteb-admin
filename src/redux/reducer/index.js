import * as types from "../constant";
import { combineReducers } from "redux";

export const userLoginReducer = (userInfo = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_LOGOUT:
      return { loading: false, user: {}, userInfo: null };
    case types.FETCH_USER_DATA_SUCCESS:
      return { ...userInfo, userData: action.payload };
    default:
      return userInfo;
  }
};

export const ThemeTogglerReducer = (themeDisplay = {}, action) => {
  switch (action.type) {
    case types.THEME:
      return { themeDisplay: action.payload };
    default:
      return themeDisplay;
  }
};

const reducers = {
  userLogin: userLoginReducer,
  ThemeToggler: ThemeTogglerReducer,
};

export default combineReducers(reducers);
