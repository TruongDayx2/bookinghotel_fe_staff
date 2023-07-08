import axios from "axios";
import { GET_ALL, GET_HOTEL } from "../constants/hotel";
import { ERROR } from "../constants/base";


export const getAllHotel = () => async dispatch => {
  try {
      const res = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_URL_USER,
          url: 'hotel/getAll',
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json" 
          }
      })
      if(res.status === 200){
          dispatch({
              type: GET_ALL,
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

export const getHotelById = (id)=>async dispatch =>{
    try{
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `hotel/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status === 200){
            dispatch({
                type: GET_HOTEL,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    }catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}