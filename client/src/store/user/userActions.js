import { GET_USER } from "./userTypes";
import { SET_FETCHING_STATUS } from "./userTypes";
export const gotUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});
