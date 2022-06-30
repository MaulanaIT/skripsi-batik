import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

export class permintaan_prod_pesanan extends Component {

    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
            <div className={style.header}>
                <p className={style.title}>Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Daftar Permintaan Produksi Pesanan</p>
            </div>
            <div className={`${style.content}`}>
            <div className={`${global.card} col-12`}>
                <div className={`${global.header}`}>
                    <p className={global.title}>Daftar Permintaan Produksi Pesanan</p>
                </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className="align-middle text-center text-nowrap">
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Permintaan</th>
                                    <th>Kode Pesanan</th>
                                    <th>Nama Pesanan</th>
                                    <th>Nama Customer</th>
                                    <th>Jumlah Pesanan</th>
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

export default permintaan_prod_pesanan