import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

export class daftar_produksi extends Component {

    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Produksi</p>
                    <p className={style.pathname}>Transaksi / Produksi / Produksi</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Produksi</p>
                            <Link to={'/transaksi/produksi/produksi'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Tanggal Pesan</td>
                                        <td>Tanggal Produksi</td>
                                        <td>Tanggal</td>
                                        <td>Kode Produksi</td>
                                        <td>Nama Pesanan</td>
                                        <td>Nama Customer</td>
                                        <td>Nama Produk</td>
                                        <td>Jumlah</td>
                                        <td>Lama Produksi</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_produksi