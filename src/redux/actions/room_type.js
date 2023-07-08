import axios from "axios";
import { GET_ROOM_TYPE_HOTELID, GET_ROOM_TYPE_ID } from "../constants/room_type";
import { ERROR } from "../constants/base";

export const getRoomTypeByHotelId = (id) => async dispatch => {
  try {
      const res = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_URL_USER,
          url: `roomType/hotelID=${id}`,
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json" 
          }
      })
      if(res.status === 200){
          dispatch({
              type: GET_ROOM_TYPE_HOTELID,
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

export const getRoomTypeById = (id)=>async dispatch=>{
    try{
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `roomType/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status === 200){
            dispatch({
                type: GET_ROOM_TYPE_ID,
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