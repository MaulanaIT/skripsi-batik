import React, { Component } from 'react';

// Import Library
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaBars, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Import Assets
import Logo from '../assets/images/logo.jpg';

// Import CSS
import style from '../css/header.module.css';
import style_sidebar from '../css/sidebar.module.css';

export class header extends Component {

    Logout = () => {
        localStorage.removeItem('leksana_login');
        localStorage.removeItem('leksana_username');
        localStorage.removeItem('leksana_token');
        localStorage.removeItem('leksana_jabatan');
    }

    ToggleAccount = (event) => {
        event.currentTarget.querySelector(`ul.${style.dropdown_menu}`).classList.toggle(style.active);
    }

    ToggleSidebar = () => {
        document.getElementById('sidebar').classList.toggle(style_sidebar.active);
    }

    render() {
        return (
            <nav className={style.container}>
                <div className={style.logo}>
                    <FaBars className={style.toggle} onClick={this.ToggleSidebar} />
                    <img src={Logo} alt="" />
                    <p className={style.title}>LEKSANA BATIK JAYA</p>
                </div>
                <div className={style.menu}>
                    <div className={style.account} onClick={this.ToggleAccount}>
                        <p className={style.title}>{this.props.jabatan.toUpperCase()}</p>
                        <MdAccountCircle className={style.icon} />
                        <ul className={style.dropdown_menu}>
                            <li><div><FaCog /> SETTING</div></li>
                            <li><Link to={'/login'} onClick={this.Logout}><FaSignOutAlt /> LOGOUT</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default header