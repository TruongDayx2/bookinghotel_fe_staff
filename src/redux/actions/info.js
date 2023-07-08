import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_INFO, POST_INFO } from "../constants/info";

export const createNewInfo = (data) => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_URL_USER,
      url: `info/create`,
      data: data,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
    if (res.status === 200) {
      dispatch({
        type: POST_INFO,
        data: res.data
      })
    } else {
      dispatch({
        type: ERROR,
        data: null,
      })
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      data: null,
    })
  }
}

export const getInfoByUserId = id => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_URL_USER,
      url: `info/userId/${id}`,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
    if (res.status === 200) {
      dispatch({
        type: GET_INFO,
        data: res.data
      })
    }
    else {
      dispatch({
        type: ERROR,
        data: null,
      })
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      data: null,
    })
  }
}
