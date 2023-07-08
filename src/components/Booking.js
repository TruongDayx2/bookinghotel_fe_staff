import React, { useEffect, useState } from "react";
import '../css/booking.css';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder, getRoomByHotelIdAndRoomType, updateRoom } from '../redux/actions/booking';
import { createNewInfo } from "../redux/actions/info";

const Booking = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const room_typeData = location.state && location.state.data;
  const hotelID = location.state && location.state.hotelId;
  const data = useSelector(state => state.room.data)
  const dataId = parseInt(localStorage.getItem("idUser"))
  console.log('userId',dataId)
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleDetailClick = (hotelId) => {
    setSelectedHotel(hotelId);
  };
  const handleCloseClick = () => {
    setSelectedHotel(null);
  };

  useEffect(() => {
    dispatch(getRoomByHotelIdAndRoomType(hotelID,room_typeData.id));
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  
  const [checkRoom,setCheckRoom] = useState(true)

  useEffect(() => {
    console.log('data',data)
    if(data.length>0){
      const filteredData = data.filter(item => item.rmStatus === 0);
      if(filteredData.length>0){
        console.log(filteredData)
        setCheckRoom(true)
      }else setCheckRoom(false)
    }
    
  }, [data])
  
  console.log(checkRoom)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const error = useSelector(state => state.room.error);
  const error1 =  useSelector(state => state.info.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setErrorMsg('Ngày Check-in phải trước ngày Check-out');
      return;
    }
    // Xử lý dữ liệu đặt phòng - gửi đến server hoặc thực hiện các thao tác khác
    console.log('Booking submitted:', { name, phone, email, checkInDate, checkOutDate });
    // Thêm order
    addInfo()
    // Cập nhật room
    console.log(data)
    if(data.length>0){
      const filteredData = data.filter(item => item.rmStatus === 0);
      if(filteredData.length>0){
        console.log(filteredData[0])
        const updateRoomData = {
          rmNumber:filteredData[0].rmNumber,
          rmStatus:1,
          roomTypeId:filteredData[0].roomTypeId,
          hotelId:filteredData[0].hotelId
        }
        console.log(updateRoomData)
        dispatch(updateRoom(filteredData[0].id,updateRoomData))

      }
    }


    if(error && error1){
      alert('Lỗi')
    }else{
      alert('Bạn đã đặt phòng thành công')
      window.location.reload();
    }

    // Reset form fields
    setName('');
    setPhone('');
    setEmail('');
    setCheckInDate('');
    setCheckOutDate('');
    setErrorMsg('');
    // window.location.reload();
  };

  const addInfo = ()=>{
    const infoData = {
      infoName:name,
      infoPhone:phone,
      infoGmail:email,
      userId:dataId
    }
    const orderData = {
      // 0 là chờ pending - 1 la da thanh toan
      orderStatus:0,
      orderCost:room_typeData.rtPrice,
      orderCheckIn:checkInDate,
      orderCheckOut:checkOutDate,
      roomTypeId:room_typeData.id,
      hotelId:hotelID,
      userId:dataId
    }
    dispatch(createNewOrder(orderData))
    dispatch(createNewInfo(infoData))
  }

  return (
    <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
      <div className="admin-post__wrapper">
        <div className="booking">
          <div className="left_booking">
          <div style={{color:'teal',marginLeft:'200px',fontSize:'25px',marginBottom:'30px'}}>Loại phòng</div>
            <div className='hotel_item' >
              <img src={room_typeData.rtImg} alt={`roomType ${room_typeData.id}`} className='hotel_img' />
              <div className='hotel_info'>
                <div className='hotel_title'>Loại phòng:
                  <span className='hotel_desc'>{room_typeData.rtName}</span>
                </div>
                <div className='hotel_title'> Giường:
                  <span className='hotel_desc'>{room_typeData.rtBedNum}</span>
                </div>
                <div className='hotel_title'>Diện tích:
                  <span className='hotel_desc'>{room_typeData.rtSize}</span>
                </div>
                <div className='hotel_title'>Giá:
                  <span className='hotel_desc'>{room_typeData.rtPrice * 1000000} VND</span>
                </div>
                <div className='hotel_title'>Mô tả:
                  <span className='hotel_desc'>{room_typeData.rtDesc}</span>
                </div>
                <button className='btn btn_Detail' onClick={() => handleDetailClick(room_typeData.id)}>Chi tiết</button>
              </div>
              {selectedHotel === room_typeData.id && (
                <div className="hotel-image-large-overlay">
                  <div className="hotel-image-large-container">
                    <img src={room_typeData.rtImg} alt={`Hotel ${room_typeData.id}`} className="hotel-image-large" />
                    <button onClick={handleCloseClick} className="close-button">Đóng</button>
                  </div>
                </div>
              )}
            </div>
            {!checkRoom && <div className="error-msg">Xin lỗi! Hiện tại đã hết phòng</div>}

          </div>
          <div className="right_booking">
            <div style={{color:'teal',marginLeft:'200px',fontSize:'25px'}}>Thông tin khách hàng</div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Tên:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{color:'black'}}
                />
              </div>
              <div>
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{color:'black'}}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{color:'black'}}
                />
              </div>
              <div>
                <label htmlFor="checkInDate">Ngày đến:</label>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  style={{color:'black'}}
                />
              </div>
              <div>
                <label htmlFor="checkOutDate">Ngày đi:</label>
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  style={{color:'black'}}
                />
              </div>
              {errorMsg && <div className="error-msg">{errorMsg}</div>}

              <button style={{marginTop:'20px'}}  disabled={!checkRoom} type="submit">Đặt phòng</button>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking;