import { ERROR } from "../constants/base";
import { CREATE_ORDER, GET_ORDER, GET_ROOM_HOTELID_ROOMTYPE, UPDATE_ORDER, UPDATE_ROOM } from "../constants/booking"; 

const initState = {
  data: [],
  order:[],
  room: {},
  error: false,
  success: true
}
const roomReducers = (state=initState,payload)=>{
  switch(payload.type){
    case GET_ROOM_HOTELID_ROOMTYPE:
      return{
        ...state,
        data:payload.data,
        success:true,
        error:false
      }
    
    case CREATE_ORDER:
      return{
        ...state,
        success:true,
        error:false
      }
    case UPDATE_ROOM:
      return{
        ...state,
        success:true,
        error:false
      }
    case GET_ORDER:
      return{
        ...state,
        order:payload.data,
        success:true,
        error:false
      }
    case UPDATE_ORDER:
      return{
        ...state,
        success:true,
        error:false
      }
    default:
      return state;
  }
}
export default roomReducers;