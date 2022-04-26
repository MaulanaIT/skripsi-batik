import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../css/master.module.css';
import style from '../../css/master.module.css';

export class permintaanproduksi extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Permintaan Produksi</p>
                    <p className={style.pathname}>Master / Permintaan Produksi </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Permintaan Produksi</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Permintaan</p>
                            <input type="text" className={global.input1} id='input-kode-permintaan' name='input-kode-permintaan' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Produk</p>
                            <input type="text" className={global.input2} id='input-kode-produk' name='input-kode-produk' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Produk</p>
                            <input type="text" className={global.input3} id='input-nama-produk' name='input-nama-produk' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Jumlah</p>
                            <input type="text" className={global.input3} id='input-jumlah' name='input-jumlah' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                    <div className={global.card}>
                        <table className={`${global.title}`} id="table-data">
                            <thead className="align-middle text-center text-nowrap">
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Akun</th>
                                    <th>Nama Akun</th>
                                    <th>Saldo</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default permintaanproduksi