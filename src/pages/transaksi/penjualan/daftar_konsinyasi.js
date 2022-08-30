import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPrint, FaTrash } from 'react-icons/fa';
import { baseURL, config, cx, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/daftar_pesanan.module.css';

export class daftar_konsinyasi extends Component {
//status Menunggu=stelah inputan di transaksi penjualan-konsinyasi, Selesai=setelah diterima piutang
//tombol Aksi ada Detail= detail produk konsinyasi, Terima Piutang=Form Terima_Konsinyasi, Delete=Menghapus
    render() {
        return (
            <React.Fragment>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Data Konsinyasi</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Konsinyasi</p>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Jual</td>
                                        <td>Tanggal</td>
                                        <td>Kode Consignee</td>
                                        <td>Nama Consignee</td>
                                        <td>Jumlah Konsinyasi</td>
                                        <td>Diskon</td>
                                        <td>Piutang Konsinyasi</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default daftar_konsinyasi