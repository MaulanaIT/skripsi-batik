import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class akun extends Component {
    componentDidMount() {
        $('#table-data').DataTable();
    }

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
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Akun</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-akun' name='input-kode-akun' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Akun</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-akun' name='input-nama-akun' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Saldo</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-saldo' name='input-saldo' />
                        </div>
                        <button type='button' className={global.button}>Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default akun