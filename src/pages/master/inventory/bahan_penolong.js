import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/master.module.css';
import style from '../../../css/master.module.css';

export class bahan_penolong extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Bahan Penolong</p>
                    <p className={style.pathname}>Master / Inventory / Bahan Penolong </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Bahan Penolong</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Kode Bahan Penolong</p>
                            <input type="text" className={global.input1} id='input-kode-bahan-penolong' name='input-kode-bahan-penolong' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Nama Bahan Penolong</p>
                            <input type="text" className={global.input2} id='input-nama-bahan-penolong' name='input-nama-bahan-penolong' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Satuan</p>
                            <input type="text" className={global.input1} id='input-satuan' name='input-satuan' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Jumlah</p>
                            <input type="text" className={global.input1} id='input-jumlah' name='input-jumlah' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Harga</p>
                            <input type="text" className={global.input3} id='input-harga' name='input-harga' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default bahan_penolong