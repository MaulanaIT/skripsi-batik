import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
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
                            <p className={`${global.title} col-3`}>Kode Supplier</p>
                            <input type="text" className={global.input1} id='input-kode-supplier' name='input-kode-supplier' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Supplier</p>
                            <input type="text" className={global.input2} id='input-nama-supplier' name='input-nama-supplier' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Alamat</p>
                            <input type="text" className={global.input2} id='input-alamat' name='input-alamat' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>No. Telp</p>
                            <input type="text" className={global.input3} id='input-telp' name='input-telp' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>No. Rek. Bank</p>
                            <input type="text" className={global.input3} id='input-rek-bank' name='input-rek-bank' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default supplier