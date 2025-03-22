import { getUser, logoutUser } from "../../src/axios/userAxios";

export const getUserAction = async (dispatch) => {
  const result = await getUser();

  if (result?.status === "error") {
    if (result.message === "Invalid Auth Token") {
      sessionStorage.setItem("accessJWT", "");
      dispatch(autoLoginAction());
    }
  }
};

export const autoLoginAction = () => async (dispatch) => {
  // GET THE TOKENS"
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  //if both token does no exist
  if (!accessJWT && !refreshJWT) {
    return;
  }

  if (!accessJWT && refreshJWT) {
    //try to get valid access token
    const result = await getAccesToken();

    if (result.status === "error") {
      return;
    }

    //if success, you will have anew access token
    sessionStorage.setItem("accessJWT", result.data);
    dispatch(getUserAction);
    return;
  }

  //if accessJWT presetn
  dispatch(getUserAction);
};

// Logout user
export const logoutUserAction = () => async (dispatch) => {
  // call api to logout from api as well
  const result = await logoutUser();

  if (result.status === "error") {
    return toast.error(result.message);
  }

  // remove tokens from browser storage
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
  // clear user state
  dispatch(setUser({}));
};
