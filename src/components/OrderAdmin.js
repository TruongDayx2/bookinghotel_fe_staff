import React, { useEffect, useRef, useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/hotel.css';
import { getRoomTypeByHotelId } from '../redux/actions/room_type';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getOrderByHotelId, getRoomByHotelIdAndRoomType1, updateOrder, updateRoom } from '../redux/actions/booking';

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const dataHotel = location.state && location.state.data;
  const data = useSelector(state => state.room.allOrder)

  console.log(data)

  useEffect(() => {
    dispatch(getOrderByHotelId(dataHotel.id));
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  const [selectedHotel, setSelectedHotel] = useState(null);
  const handleDetailClick =()=>{
    console.log('Chi tiets')
  }

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

  const updateorder2 = (item)=>{
    const orderData = {
      orderStatus:1,
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

  const updateRoom2 = async(item)=>{
    const data =await (getRoomByHotelIdAndRoomType1(item.hotelId,item.roomTypeId));

    const filteredData = data.filter(item => item.rmStatus === 1);
    console.log('filteredData',filteredData)
    if(filteredData.length>0){
      console.log(filteredData[0])
      const updateRoomData = {
        rmNumber:filteredData[0].rmNumber,
        rmStatus:2,
        roomTypeId:filteredData[0].roomTypeId,
        hotelId:filteredData[0].hotelId
      }
      dispatch(updateRoom(filteredData[0].id,updateRoomData))

    }
  }

  const handleConfirmOrder= (item,index)=>{
    updateorder2(item)
    updateRoom2(item)
    window.location.reload()
    console.log(item)
  }
  return (
    <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
      <div className="admin-post__wrapper">
        <div className='info_hotel'>
          <div className='hotel_item' >
            <img src={dataHotel.hotelImg} alt={`hotel ${dataHotel.id}`} className='hotel_img' />
            <div className='hotel_info'>
              <div className='hotel_title'>Khách sạn:
                <span className='hotel_desc'>{dataHotel.hotelName}</span>
              </div>
              <div className='hotel_title'>Địa chỉ:
                <span className='hotel_desc'>{dataHotel.hotelAddress}</span>
              </div>
              <div className='hotel_title'>Liên hệ:
                <span className='hotel_desc'>{dataHotel.hotelPhone}</span>
              </div>
              <div className='hotel_title'>Giới thiệu:
                <span className='hotel_desc'>{dataHotel.hotelDesc}</span>
              </div>

            </div>
          </div>
          <div className='roomType_list'>
            Đơn hàng
            {data.map((item, index) => (
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
                  <button className='btn btn_Booking' onClick={() => handleConfirmOrder(item, index)} style={item.orderStatus ===0 ? {display:'block',width:'fit-content'}:{display:'none'}}>Xác nhận</button>
                </div>
                {/* {selectedHotel === item.id && (
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
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderAdmin;
