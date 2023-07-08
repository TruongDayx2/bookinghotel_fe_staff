import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { getRoomTypeByHotelId, getRoomTypeById } from "../redux/actions/room_type";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getOrderByUserId, getRoomByHotelIdAndRoomType, getRoomByHotelIdAndRoomType1, updateOrder, updateRoom } from "../redux/actions/booking";
import { getInfoByUserId } from "../redux/actions/info";
import { getHotelById } from "../redux/actions/hotel";

const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderData = useSelector(state => state.room.order)
  const InfoData = useSelector(state => state.info.data)
  const userId = parseInt(localStorage.getItem("idUser"))
  useEffect(() => {
    dispatch(getOrderByUserId(userId));
    dispatch(getInfoByUserId(userId));
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  orderData.sort((a, b) => a.orderStatus - b.orderStatus)
  console.log('orderData', orderData)
  console.log('InfoData', InfoData)

  const [selectedHotel, setSelectedHotel] = useState(null);

  const updateorder = (item)=>{
    const orderData = {
      orderStatus:2,
      orderCost:item.orderCost,
      orderCheckIn:item.orderCheckIn,
      orderCheckOut:item.orderCheckOut,
      roomTypeId:item.roomTypeId,
      hotelId:item.hotelId,
      userId:item.userId
    }
    // console.log(orderData)
    dispatch(updateOrder(item.id,orderData))
    
  }
  
  const updateRoom1 = async(item)=>{
    const data =await (getRoomByHotelIdAndRoomType1(item.hotelId,item.roomTypeId));

    const filteredData = data.filter(item => item.rmStatus === 1);
    console.log('filteredData',filteredData)
    if(filteredData.length>0){
      console.log(filteredData[0])
      const updateRoomData = {
        rmNumber:filteredData[0].rmNumber,
        rmStatus:0,
        roomTypeId:filteredData[0].roomTypeId,
        hotelId:filteredData[0].hotelId
      }
      dispatch(updateRoom(filteredData[0].id,updateRoomData))

    }
  }

  const handleCancelOrder = (item,index)=>{
    
    updateorder(item)
    updateRoom1(item)
    window.location.reload()
    console.log(item)
    
  }

  const handleDetailClick = (item, index) => {
    dispatch(getRoomTypeById(item.roomTypeId))
    dispatch(getHotelById(item.hotelId))
    setSelectedHotel(item.id);
  }
  const RoomTypeData = useSelector(state => state.roomType.roomType)
  const hotelData = useSelector(state => state.hotel.hotel)
  // const data = useSelector(state => state.room.data)
  const handleCloseClick = () => {
    setSelectedHotel(null);
  };

  return (
    <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
      <div className="admin-post__wrapper">
        <div className="order_hotel" style={{ margin: '20px' }}>
          Danh sách đơn hàng:
          <div className="order_list" style={{ marginTop: '20px' }}>
            {orderData.map((item, index) => (
              <div key={item.id} className='roomType_item' style={item.orderStatus === 0 ? { border: '2px solid orange' } : item.orderStatus === 1 ?  { border: '2px solid teal' } : { border: '2px solid red' }}>
                {/* <img src={item.rtImg} alt={`roomType ${item.id}`} className='roomType_img' /> */}
                <div className='roomType_info'>
                  <div className='roomType_title'> Mã đơn hàng:
                    <span className='roomType_desc'>{item.id}</span>
                  </div>
                  {/* <div className='roomType_title'> Tên khách hàng:
                    <span className='roomType_desc'>{InfoData[index].infoName}</span>
                  </div> */}
                  <div className='roomType_title'> Ngày Check In:
                    <span className='roomType_desc'>{item.orderCheckIn}</span>
                  </div>
                  <div className='roomType_title'> Ngày Check Out:
                    <span className='roomType_desc'>{item.orderCheckOut}</span>
                  </div>
                  <div className='roomType_title'> Trạng thái:
                    <span className='roomType_desc'>{item.orderStatus === 0 ? 'Đang chờ' : item.orderStatus === 1 ?  'Xác nhận' : 'Đã hủy'}</span>
                  </div>
                </div>
                <div className='roomType_book' style={{ marginLeft: '250px' }}>
                  <button className='btn btn_Detail' onClick={() => handleDetailClick(item, index)}>Chi tiết</button>
                  <button className='btn btn_Booking' onClick={() => handleCancelOrder(item, index)} style={item.orderStatus ===0 ? {display:'block',width:'fit-content'}:{display:'none'}}>Hủy phòng</button>
                </div>
                {selectedHotel === item.id && (
                  <div className="hotel-image-large-overlay">
                    <div className="hotel-image-large-container">
                      <div className="hotel-image-large" style={{ background: 'white', borderRadius: '10px', width: '500px',padding:'20px' }}>
                        <div className='roomType_title'> Mã đơn hàng:
                          <span className='roomType_desc'>{item.id}</span>
                        </div>
                        <div className='roomType_title'> Tên khách hàng:
                          <span className='roomType_desc'>{InfoData[index].infoName}</span>
                        </div>
                        <div className='roomType_title'> Email
                          <span className='roomType_desc'>{InfoData[index].infoGmail}</span>
                        </div>
                        <div className='roomType_title'> Số điện thoại:
                          <span className='roomType_desc'>{InfoData[index].infoPhone}</span>
                        </div>
                        <div className='roomType_title'> Ngày Check In:
                          <span className='roomType_desc'>{item.orderCheckIn}</span>
                        </div>
                        <div className='roomType_title'> Ngày Check Out:
                          <span className='roomType_desc'>{item.orderCheckOut}</span>
                        </div>
                        <div className='roomType_title'> Tên khách sạn:
                          <span className='roomType_desc'>{hotelData.hotelName}</span>
                        </div>
                        <div className='roomType_title'> Tên loại phòng:
                          <span className='roomType_desc'>{RoomTypeData.rtName}</span>
                        </div>
                        <div className='roomType_title'> Trạng thái:
                          <span className='roomType_desc'>{item.orderStatus === 0 ? 'Đang chờ' : item.orderStatus === 1 ?  'Xác nhận' : 'Đã hủy'}</span>
                        </div>
                      </div>
                      <button onClick={handleCloseClick} className="close-button" style={{ right: '-50px' }}>Đóng</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order;