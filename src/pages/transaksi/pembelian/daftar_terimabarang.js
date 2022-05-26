import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/penerimaan_barang.module.css';

export class daftar_terimabarang extends Component {

    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Penerimaan Barang</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Penerimaan Barang</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Penerimaan Barang</p>
                            <Link to={'/transaksi/pembelian/penerimaan-barang'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Penerimaan</td>
                                        <td>Tanggal Terima</td>
                                        <td>Kode Order</td>
                                        <td>Kode Supplier</td>
                                        <td>Nama Supplier</td>
                                        <td>Total Barang</td>
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

export default daftar_terimabarang