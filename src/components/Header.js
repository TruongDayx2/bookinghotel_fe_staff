import React, { useState, useEffect } from 'react'
import '../css/header.css'
import {
    Link
} from 'react-router-dom'

import { Redirect, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import Logo from './Logo'

const Header = () => {
    const history = useHistory();
    const [isLogout, setIsLogout] = useState(false);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    // const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [[token]])

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const logout = () => {
        // dispatch({type: LOGOUT, data: null})
        localStorage.removeItem("token")
        setIsLogout(true);
    }

    const showMenu = () => {
        const toggle = document.getElementById('header-toggle');
        const nav = document.getElementById('nav-menu');

        if (nav && toggle) {
            toggle.classList.toggle('bx-x')
            nav.classList.toggle('show')
        }
    }


    const linkAction = (id, status) => {
        const navLink = document.querySelectorAll('.nav__link');
        navLink.forEach(n => n.classList.remove('active'));
        if (id) {
            const _this = document.getElementById(id);
            _this.classList.add('active');
        }

        if (status === true) {
            const toggle = document.getElementById('header-toggle');
            const nav = document.getElementById('nav-menu');
            if (nav && toggle) {
                toggle.classList.remove('bx-x')
                nav.classList.remove('show')
            }
        }
    }
    useEffect(() => {
      if(isLogout){
        window.location.reload()
      }
    

    }, [isLogout])
    const handleClickOrder =()=>{
        history.push('/order')
    }

    return  (
        <header className="header">
            {/* <Link className="header__logo" to='/'  >
                77Booking
            </Link>
            <i className="bx bx-menu header__toggle" id="header-toggle" onClick={showMenu} /> */}

            <nav className="nav" id="nav-menu" >
                <div className="nav__content bd-grid">
                    <Link className="nav__perfil" to='/' onClick={() => linkAction(null, true)}>
                        <div className="nav__name">
                            77Booking
                        </div>
                    </Link>
                    <div className="nav__menu">
                        <ul className="nav__list">
                            {
                                !token ?
                                    (
                                        <li className="nav__item">
                                            <Link id='contact'
                                                className="login-btn"
                                                to={`/login`}
                                                onClick={() => linkAction('contact', true)}>
                                                <div style={{ textAlign: 'center', color: '#fff' }} >ĐĂNG NHẬP</div>
                                            </Link>
                                        </li>
                                    ) :
                                    (
                                        <li className="nav__item dropdown" style={{paddingBottom:"5px"}}>
                                            <div id='userSection'
                                                className="nav__link" >
                                                <div>
                                                    <i style={{ fontSize: "26px", marginRight: "5px" }} className='bx bxs-user-circle'></i>
                                                    {username}
                                                </div>
                          
                                            </div>
                                            <ul className="dropdown__menu">
                                                <li style={{ cursor: "pointer" }} className="dropdown__item" onClick={() => handleClickOrder()}>
                                                    <div className="nav__link1" >
                                                        Đơn hàng
                                                    </div>
                                                </li>
                                                <li style={{ cursor: "pointer" }} className="dropdown__item" onClick={() => logout()}>
                                                    <div className="nav__link1">
                                                        Đăng xuất
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header