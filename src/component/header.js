import React, { Component } from 'react';

// Import Library
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

// Import Assets
import Logo from '../assets/images/logo.jpg';

// Import CSS
import style from '../css/header.module.css';

export class header extends Component {

    ToggleAccont = (event) => {
        event.currentTarget.querySelector(`ul.${style.dropdown_menu}`).classList.toggle(style.active);
    }

    render() {
        return (
            <nav className={style.container}>
                <div className={style.logo}>
                    <img src={Logo} alt="" />
                    <p className={style.title}>LEKSANA BATIK JAYA</p>
                </div>
                <div className={style.menu}>
                    <div className={style.account} onClick={this.ToggleAccont}>
                        <p className={style.title}>ADMIN & KEUANGAN</p>
                        <MdAccountCircle className={style.icon} />
                        <ul className={style.dropdown_menu}>
                            <li><div>SETTING</div></li>
                            <li><Link to={'/login'}>LOGOUT</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default header