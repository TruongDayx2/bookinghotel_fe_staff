import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHotel } from '../redux/actions/hotel';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const HotelAdmin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const data = useSelector(state => state.hotel.data)

  useEffect(() => {
    dispatch(getAllHotel());
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const [search, setSearch] = useState('')
  const [hotels, setHotels] = useState(data)

  console.log(hotels)

  const searchHotel = () => {
    if (search.trim().length === 0) {
      setHotels(data);
      return;
    }
    const tmpHotels = data.filter(emp => emp.hotelName.toUpperCase().includes(search.toUpperCase().trim()));
    setHotels(tmpHotels);
  }
  const hanldeClickHotel =(hotel)=>{
    console.log(hotel)
    history.push('/orderAdmin',{data:hotel})

  }

  return (<div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
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
  </div>)
}

export default HotelAdmin;