import React, { useEffect, useRef, useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/hotel.css';
import { getRoomTypeByHotelId } from '../redux/actions/room_type';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Hotel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const dataHotel = location.state && location.state.data;
  const data = useSelector(state => state.roomType.data)

  console.log(dataHotel)

  useEffect(() => {
    dispatch(getRoomTypeByHotelId(dataHotel.id));
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  console.log(data)

  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleDetailClick = (hotelId) => {
    setSelectedHotel(hotelId);
  };
  const handleCloseClick = () => {
    setSelectedHotel(null);
  };

  const handleClickBooking = (room_type)=>{
    history.push('/booking',{data:room_type,hotelId:dataHotel.id})
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
            {data.map(item => (
              <div key={item.id} className='roomType_item'>
                <img src={item.rtImg} alt={`roomType ${item.id}`} className='roomType_img' />
                <div className='roomType_info'>
                  <div className='roomType_title'> Loại phòng:
                    <span className='roomType_desc'>{item.rtName}</span>
                  </div>
                  <div className='roomType_title'> Giường:
                    <span className='roomType_desc'>{item.rtBedNum}</span>
                  </div>
                  <div className='roomType_title'> Diện tích:
                    <span className='roomType_desc'>{item.rtSize} (m)</span>
                  </div>
                  <div className='roomType_title'> Giá:
                    <span className='roomType_desc'>{item.rtPrice * 1000000} VND</span>
                  </div>
                  <div className='roomType_title'> Mô tả:
                    <span className='roomType_desc'>{item.rtDesc}</span>
                  </div>
                </div>
                <div className='roomType_book'>
                  <button className='btn btn_Detail' onClick={() => handleDetailClick(item.id)}>Chi tiết</button>
                  <button className='btn btn_Booking' onClick={()=>handleClickBooking(item)}>Đặt phòng</button>
                </div>
                {selectedHotel === item.id && (
                  <div className="hotel-image-large-overlay">
                    <div className="hotel-image-large-container">
                      <img src={item.rtImg} alt={`Hotel ${item.id}`} className="hotel-image-large" />
                      <button onClick={handleCloseClick} className="close-button">Đóng</button>
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

export default Hotel;
