import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import bootstrap from '../../css/bootstrap.module.css';
import global from '../../css/master.module.css';
import style from '../../css/master.module.css';

export class supplier extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Supplier</p>
                    <p className={style.pathname}>Master / Supplier </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Supplier</p>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Kode Supplier</p>
                            <input type="text" id='input-kode-supplier' name='input-kode-supplier' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Nama Supplier</p>
                            <input type="text" id='input-nama-supplier' name='input-nama-supplier' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>Alamat</p>
                            <input type="text" id='input-alamat' name='input-alamat' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>No. Telp</p>
                            <input type="text" id='input-telp' name='input-telp' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={global.title}>No. Rek. Bank</p>
                            <input type="text" id='input-rek-bank' name='input-rek-bank' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default supplier