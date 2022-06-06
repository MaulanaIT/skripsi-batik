import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';


export class daftar_produk extends Component {
    render() {
        return (
            <>
            <div className={style.header}>
                <p className={style.title}>Produk</p>
                <p className={style.pathname}>Master / Produk</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Produk</p>
                        <Link to={'/master/inventory/produk'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    </div>
            <div className={global.card}>
                <form id='form-table' className={`table-responsive`}>
                    <table id='table-data' className={`table w-100`}>
                        <thead className="align-middle text-center text-nowrap">
                            <tr>
                                <th>No.</th>
                                <th>Kode Produk</th>
                                <th>Nama Produk</th>
                                <th>Jenis Produk</th>
                                <th>Jenis Warna</th>
                                <th>Jumlah</th>
                                <th>Stok Minimal</th>
                                <th>Harga Pokok Produk</th>
                                <th>Harga Jual</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </form>
            </div>
            </div>
            </div>
            </>
        )
    }
}
export default daftar_produk