import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/master.module.css';
import style from '../../../css/master.module.css';

export class bahan_baku extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Bahan Baku</p>
                    <p className={style.pathname}>Master / Inventory / Bahan Baku </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Bahan Baku</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Kode Bahan Baku</p>
                            <input type="text" className={global.input1} id='input-kode-bahan-baku' name='input-kode-bahan-baku' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Nama Bahan Baku</p>
                            <input type="text" className={global.input2} id='input-nama-bahan-baku' name='input-nama-bahan-baku' />
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

export default bahan_baku