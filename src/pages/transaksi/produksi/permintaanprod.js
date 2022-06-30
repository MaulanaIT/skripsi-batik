import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/produksi.module.css';

export class permintaanprod extends Component {

    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Produksi</p>
                    <p className={style.pathname}>Transaksi / Produksi / Permintaan Produksi</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Permintaan Produksi Stok</p>
                            </div>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Permintaan</p>
                                            <input type="text" className={global.input1} id='input-kode-permintaan' name='input-kode-permintaan' readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Kode Produk</p>
                                            <input type="text" className={global.input2} id='input-kode-produk' name='input-kode-produk' />
                                        </div>
                                    </div>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Nama Produk</p>
                                            <input type="text" className={`${global.input3}`} id='input-nama-produk' name='input-nama-produk' />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Jumlah Produksi</p>
                                            <input type="text" className={global.input3} id='input-jumlah-produksi' name='input-jumlah-produksi' />
                                        </div>
                                    </div>
                                    <button type='button' className={global.button}><MdAdd /> Simpan</button>
                        </div>
                        </div>
                        </div>
                        <div className={style.content}>
                                    <div className={`${global.card} col-12`}>
                                        <div className={`${global.header}`}>
                                            <p className={global.title}>Daftar Permintaan Produksi Stok</p>
                                        </div>
                                            <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead className="align-middle text-center text-nowrap">
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Kode Permintaan</th>
                                                            <th>Kode Produk</th>
                                                            <th>Nama Produk</th>
                                                            <th>Jumlah Produksi</th>
                                                            <th>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div> 
                                    </div>      
            </>
        )
    }
}

export default permintaanprod