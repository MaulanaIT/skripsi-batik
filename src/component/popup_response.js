// Import Library
import React from 'react';

// Import CSS
import global from '../css/global.module.css';
import style from '../css/popup_response.module.css';
import { ClosePopupResonse, cx } from './helper';

export default function Popup_response({ response }) {
    return (
        <div className={cx([style.popup, 'd-none'])}>
            <div className={style.container}>
                <p className={style.response}>Response</p>
                <button type='button' className={global.button} style={{ "--button-first-color": '#b50000', "--button-second-color": '#d36767' }} onClick={ClosePopupResonse}>Close</button>
            </div>
        </div>
    )
}
