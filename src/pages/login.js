// Import Library
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import React, { Component } from 'react';
import { baseURL, CheckInputValidity, config, GetValue, HideLoading, ShowLoading } from '../component/helper';

// Import CSS
import global from '../css/global.module.css';
import style from '../css/login.module.css';

export class login extends Component {

    state = {
        isLogin: localStorage.getItem('leksana_login')
    }

    componentDidMount() {
        if (this.state.isLogin) window.location.href = '/dashboard';
    }

    Login = () => {
        if (!CheckInputValidity('form-data')) return;

        ShowLoading();

        const formData = new FormData();

        formData.append('username', GetValue('input-username'));
        formData.append('password', sha256(GetValue('input-password')));

        axios.post(`${baseURL}/api/login.php`, formData, config).then(response => {
            let login = response.data.data;

            localStorage.setItem('leksana_login', login.status);
            localStorage.setItem('leksana_username', GetValue('input-username'));
            localStorage.setItem('leksana_token', sha256(GetValue('input-password')));
            localStorage.setItem('leksana_jabatan', login.data.jabatan);

            this.setState({ isLogin: login.status }, () => {
                if (this.state.isLogin) window.location.href = '/dashboard';
                else HideLoading();
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.content}>
                    <form id='form-data' className={`${global.card}`}>
                        <p className={`${global.title} fs-4 fw-bold text-center`}>LEKSANA BATIK JAYA</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title}`}>Username</p>
                            <input type="text" id='input-username' name='input-username' required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Password</p>
                            <input type="password" id='input-password' name='input-password' required={true} />
                        </div>
                        <button type='button' className={global.button} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={this.Login}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default login