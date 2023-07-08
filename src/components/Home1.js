import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/home1.css';
import img1 from '../assets/img/1.png'

import { useDispatch, useSelector } from 'react-redux';
import { getAllHotel } from '../redux/actions/hotel';
import { Link, Redirect, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

const Home1 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const userId = useSelector(state=> state.login)
  console.log('userId',userId)
  useEffect(() => {
    dispatch(getAllHotel());
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  const data = useSelector(state => state.hotel.data)
  console.log(data)
  const [address, setAddress] = useState('')

  const searchBarChange = (e) => {
    setAddress(e.target.value)
  }
  console.log(address) 


  function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      if (sliderRef.current) {
        if (currentSlide === data.length - 1) {
          // Nếu đang ở slide cuối cùng, chuyển về slide đầu tiên
          sliderRef.current.slickGoTo(0);
          setCurrentSlide(0);
        } else {
          // Chuyển đến slide tiếp theo
          sliderRef.current.slickNext();
          setCurrentSlide(currentSlide + 1);
        }
      }
    }, 3000); // Thời gian chuyển đổi slide (3 giây)

    return () => {
      // Xóa bộ đếm khi component unmount
      clearInterval(slideTimer);
    };
  }, [currentSlide]);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const handleSlideClick = (item) => {
      console.log('Slide clicked:', item);
    };
    return (
      <Slider {...settings} ref={sliderRef} style={{width:'450px'}}>
        {data.map((item,index)=>(
        <div style={{width:'450px'}} key={index}>
          <Link to="/" key={index} onClick={() => handleSlideClick(item)}>
            <img src={item.hotelImg} alt={`Slide ${index}`} style={{height:'350px',width:'450px',borderRadius:'10px'}}/>
          </Link>
        </div>
        ))}
          
      </Slider>
    );
  }
  const handleButtonClick = () => {
    history.push('/hotelSearch', { data: address });
  };
  return (
    


    <div className="container">
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='view'>
          <div className='home1_left'>
            <div className='left_info'>
              <div className='name'>77Hotel</div>
              <div className='desc'>Hệ thống khách sạn uy tín, hiện đại, chất lượng</div>
              <div className='desc'>Hiện đang có mặt khắp cả nước</div>
            </div>
            <div className='left_search'>
              <div>Chọn thành phố bạn muốn đến</div>
              <form action="javascript:" class="search-bar" style={{}}>
                <input value={address} onChange={(e) => { searchBarChange(e) }} type="search" name="search" pattern=".*\S.*" required />
                  <button onClick={handleButtonClick} class="search-btn" type="submit">
                    <span>Search</span>
                  </button>
              </form>
            </div>
          </div>
          <div className='home1_right'>
            <SlideShow />
          </div>
        </div>

      </div>

      {/* service-management */}

    </div>

)
    
  
}

export default Home1;
