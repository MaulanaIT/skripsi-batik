// Import Library
import React, { Component } from 'react';

// Import CSS
import global from '../css/global.module.css';
import style from '../css/login.module.css'

export class login extends Component {
    render() {
        return (
            <div id='login' className={style.content}>
                    <div className={`${global.card}`}>
                        <p className={global.title}>LEKSANA BATIK JAYA</p>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Username</p>
                            <input type="text" id='input-detail-bayar' name='input-detail-bayar' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Password</p>
                            <input type="text" id='input-detail-bayar' name='input-detail-bayar' />
                        </div>
                        <button type='button' className={global.button} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }}>Login</button>
                    </div>
            </div>
        )
    }
}

export default login