import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/master.module.css';
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
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Kode Alat</p>
                            <input type="text" className={global.input1} id='input-kode-alat' name='input-kode-alat' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Nama Alat</p>
                            <input type="text" className={global.input2} id='input-nama-alat' name='input-nama-alat' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Jumlah Unit</p>
                            <input type="text" className={global.input1} id='input-jumlah-unit' name='input-jumlah-unit' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Harga Perolehan</p>
                            <input type="text" className={global.input3} id='input-harga-perolehan' name='input-harga-perolehan' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Kapasitas per Unit</p>
                            <input type="text" className={global.input1} id='input-kapasitas' name='input-kapasitas' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default alat