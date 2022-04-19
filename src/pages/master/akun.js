import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/master/akun.module.css';


export class akun extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Akun</p>
                    <p className={style.pathname}>Master / Akun </p>
                </div>
            </>
        )
    }
}

export default akun