import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import DetailRetur from './detail_retur_admkeu';
import DetailRetur2 from './detail_retur_gudang';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/retur_pembelian.module.css';

export class daftar_retur extends Component {

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectDetail = () => {
    document.getElementById('detail_retur_admkeu').classList.remove('d-none');
    }
    SelectDetail2 = () => {
    document.getElementById('detail_retur_gudang').classList.remove('d-none');
    }

    render() {
        return (
            <>
                <DetailRetur />
                <DetailRetur2 />
                <div className={style.header}>
                    <p className={style.title}>Retur Pembelian</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Retur Pembelian</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Retur Pembelian</p>
                            <Link to={'/transaksi/pembelian/retur-pembelian'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Retur</td>
                                        <td>Jenis Retur</td>
                                        <td>Kode Supplier</td>
                                        <td>Nama Supplier</td>
                                        <td>Total Retur</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                        <td>
                                        <button type='button' className={global.button} onClick={this.SelectDetail}>Detail</button>
                                        </td>
                                        <td>
                                        <button type='button' className={global.button} onClick={this.SelectDetail2}>Detail2</button>
                                        </td>
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

export default daftar_retur