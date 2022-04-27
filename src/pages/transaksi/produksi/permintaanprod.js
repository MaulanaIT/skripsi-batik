import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export class permintaanproduksi extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Permintaan Produksi</p>
                    <p className={style.pathname}>Transaksi / Produksi / Permintaan Produksi </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Permintaan Produksi</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Kode Permintaan</p>
                            <input type="text" className={global.input1} id='input-kode-permintaan' name='input-kode-permintaan' readOnly />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Kode Produk</p>
                            <input type="text" className={global.input2} id='input-kode-produk' name='input-kode-produk' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Nama Produk</p>
                            <input type="text" className={`${global.input3} col-6`} id='input-nama-produk' name='input-nama-produk' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Jumlah Produksi</p>
                            <input type="text" className={global.input3} id='input-jumlah-produksi' name='input-jumlah-produksi' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default permintaanproduksi