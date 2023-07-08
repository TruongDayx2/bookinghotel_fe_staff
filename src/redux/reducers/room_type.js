import { ERROR } from "../constants/base";
import { GET_ROOM_TYPE_HOTELID, GET_ROOM_TYPE_ID } from "../constants/room_type";

const initState = {
  data: [],
  roomType: {},
  error: false,
  success: true
}
const roomTypeReducers = (state=initState,payload)=>{
  switch(payload.type){
    case GET_ROOM_TYPE_HOTELID:
      return{
        ...state,
        data:payload.data,
        success:true,
        error:false
      }
    case GET_ROOM_TYPE_ID:
      return{
        ...state,
        roomType:payload.data,
        success:true,
        error:false
      }
    default:
      return state;
  }
}
export default roomTypeReducers;