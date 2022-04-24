import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../css/master.module.css';
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
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Akun</p>
                            <input type="text" className={global.input1} id='input-kode-akun' name='input-kode-akun' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Akun</p>
                            <input type="text" className={global.input2} id='input-nama-akun' name='input-nama-akun' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Saldo</p>
                            <input type="text" className={global.input3} id='input-saldo' name='input-saldo' />
                        </div>
                        <button type='button' className={global.button}>Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default akun