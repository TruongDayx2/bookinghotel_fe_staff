import React, { useEffect, useRef, useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/hotelSearch.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHotel } from '../redux/actions/hotel';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const HotelSearch = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const dataSearch = location.state && location.state.data;

  useEffect(() => {
    dispatch(getAllHotel());
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  const data = useSelector(state => state.hotel.data)

  const [hotels, setHotels] = useState(data)
  const [search, setSearch] = useState(dataSearch)

  const searchHotel = () => {
    if (search.trim().length === 0) {
      setHotels(data);
      return;
    }
    const tmpHotels = data.filter(emp => emp.hotelAddress.toUpperCase().includes(search.toUpperCase().trim()));
    setHotels(tmpHotels);
  }

  useEffect(() => {
    searchHotel()

  }, [])

  const hanldeClickHotel = (hotel)=>{
    history.push('/hotel',{data:hotel})
  }


  return (
    <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
      <div className="admin-post__wrapper">
        <div className="admin-post__head">
          <div style={{ fontSize: "20px", marginLeft: "-20px" }} className="admin-post__title">
            Danh sách khách sạn
          </div>
          <form action="javascript:" class="search-bar">
            <input placeholder='Tìm kiếm công ty theo tên' type="search" name="search" pattern=".*\S.*" required onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => searchHotel()} class="search-btn" type="submit">
              <span>Search</span>
            </button>
          </form>
        </div>
        <div className='list_hotel'>
          {hotels.map(hotel => (
            <div key={hotel.id} className='hotel_item' onClick={()=>hanldeClickHotel(hotel)}>
              <img src={hotel.hotelImg} alt={`hotel ${hotel.id}`} className='hotel_img' />
              <div className='hotel_info'>
                <div className='hotel_title'>Khách sạn:
                  <span className='hotel_desc'>{hotel.hotelName}</span>
                </div>
                <div className='hotel_title'>Địa chỉ: 
                  <span className='hotel_desc'>{hotel.hotelAddress}</span>
                </div>
                <div className='hotel_title'>Liên hệ: 
                  <span className='hotel_desc'>{hotel.hotelPhone}</span>
                </div>
                <div className='hotel_title'>Giới thiệu: 
                  <span className='hotel_desc'>{hotel.hotelDesc}</span>
                </div>

              </div>
            </div>
          )

          )}
        </div>
      </div>
    </div>
  )
}

export default HotelSearch;
