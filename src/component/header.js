import React, { useState, useEffect } from 'react';

// Import Library
import axios from 'axios';
import { MdAccountCircle } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { baseURL, config, cx, HideLoading, ShowLoading } from './helper';

// Import Assets
import Logo from '../assets/images/logo.jpg';

// Import CSS
import global from '../css/global.module.css';
import style from '../css/header.module.css';
import style_sidebar from '../css/sidebar.module.css';

export default function Header(props) {

    const [getActiveNotification, setActiveNotification] = useState(false);

    const [getDataNotification, setDataNotification] = useState([]);

    const location = useLocation();

    useEffect(() => {
        GetNotifikasi();
        setActiveNotification(false);
    }, [location.pathname]);

    const GetNotifikasi = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/notifikasi/select.php`, config).then(response => {
            let data = response.data.data;

            setDataNotification(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const Logout = () => {
        localStorage.removeItem('leksana_login');
        localStorage.removeItem('leksana_username');
        localStorage.removeItem('leksana_token');
        localStorage.removeItem('leksana_jabatan');
    }

    const UpdateNotifikasiPesanan = (kode) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/produksi/permintaan-pesanan/update-notifikasi.php`, formData, config).then(() => {
            GetNotifikasi();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        })
    }

    const ToggleAccount = (event) => {
        event.currentTarget.querySelector(`ul.${style.dropdown_menu}`).classList.toggle(style.active);
    }

    const ToggleSidebar = () => {
        document.getElementById('sidebar').classList.toggle(style_sidebar.active);
    }

    return (
        <nav className={style.container}>
            <div className={style.logo}>
                <FaBars className={style.toggle} onClick={ToggleSidebar} />
                <img src={Logo} alt="" />
                <p className={style.title}>LEKSANA BATIK JAYA</p>
            </div>
            <div className={style.menu}>
                <div className={style.notification}>
                    <FaBell className={style.toggle} onClick={() => setActiveNotification((prevState) => !prevState)} />
                    <div className={cx([style.dropdown_menu, getActiveNotification && style.active])}>
                        {getDataNotification && getDataNotification.length > 0 ?
                            getDataNotification.map((item, index) =>
                                item.kode.includes('PESAN') ?
                                    <div key={index} className={cx([style.item, style.pesanan])}>
                                        <p className={style.description}>Transaksi pesanan produk telah masuk dengan nomor kode <span className={style.green}>{item.kode}</span></p>
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => UpdateNotifikasiPesanan(item.kode)}>Terima</button>
                                    </div>
                                    :
                                    <div className={style.item}>
                                        <p className={style.description}>Notifikasi Kadaluwarsa</p>
                                    </div>
                            )
                            :
                            <div className={cx([style.item, style.empty])}>
                                <p className={style.description}>Tidak ada notifikasi</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={style.account} onClick={ToggleAccount}>
                    <p className={style.title}>{props.jabatan.toUpperCase()}</p>
                    <MdAccountCircle className={style.icon} />
                    <ul className={style.dropdown_menu}>
                        <li><div><FaCog /> SETTING</div></li>
                        <li><Link to={'/login'} onClick={Logout}><FaSignOutAlt /> LOGOUT</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}