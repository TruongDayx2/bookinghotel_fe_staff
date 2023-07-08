import axios from "axios";
import { ERROR } from "../constants/base";
import { CREATE_ORDER, GET_ORDER, GET_ROOM_HOTELID_ROOMTYPE, UPDATE_ORDER, UPDATE_ROOM } from "../constants/booking";

export const getRoomByHotelIdAndRoomType = (hotelId, rtId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `room/hotel/${hotelId}/roomtype/${rtId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: GET_ROOM_HOTELID_ROOMTYPE,
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
export const getRoomByHotelIdAndRoomType1 = async(hotelId, rtId)  => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `room/hotel/${hotelId}/roomtype/${rtId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            return res.data
        }
        else {
           console.log('loox')
        }
    } catch (error) {
        console.log('loiiiiiiii')
    }
}


export const createNewOrder = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_USER,
            url: 'order/create',
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: CREATE_ORDER,
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

export const updateRoom = (id, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `room/update/${id}`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ROOM,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    }
    catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const getOrderByUserId = (id)=> async dispatch=>{
    try{
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_USER,
            url:`order/userId/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status === 200){
            dispatch({
                type: GET_ORDER,
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

export const updateOrder = (id,data) => async dispatch =>{
    try{
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_USER,
            url: `order/update/${id}`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ORDER,
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


