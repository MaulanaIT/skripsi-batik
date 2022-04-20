import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import bootstrap from '../../css/bootstrap.module.css';
import global from '../../css/master.module.css';
import style from '../../css/master.module.css';

export class akun extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Akun</p>
                    <p className={style.pathname}>Master / Akun </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Akun</p>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Kode Akun</p>
                            <input type="text" id='input-kode-akun' name='input-kode-akun' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Nama Akun</p>
                            <input type="text" id='input-nama-akun' name='input-nama-akun' />
                        </div>
                            <div className={`${global.input_group}`}>
                                <p className={global.title}>Saldo</p>
                                <input type="text" id='input-saldo' name='input-saldo' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default akun