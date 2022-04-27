import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export class alat extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Alat</p>
                    <p className={style.pathname}>Master / Inventory / Alat </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Alat</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Alat</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-alat' name='input-kode-alat' readOnly />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Alat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-alat' name='input-nama-alat' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah Unit</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-jumlah-unit' name='input-jumlah-unit' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga Perolehan</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-harga-perolehan' name='input-harga-perolehan' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kapasitas per Unit</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kapasitas' name='input-kapasitas' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default alat