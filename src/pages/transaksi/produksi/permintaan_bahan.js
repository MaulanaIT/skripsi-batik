import React, { Component } from 'react'

// Import Library
import { MdAdd } from 'react-icons/md';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export class permintaanproduksi extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Permintaan Bahan</p>
                    <p className={style.pathname}>Transaksi / Produksi / Permintaan Bahan </p>
                </div>
                <div className={style.content}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Permintaan Bahan</p>
                    </div>
                <div className={global.card}>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className="align-middle text-center text-nowrap">
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Permintaan</th>
                                    <th>Kode Produksi</th>
                                    <th>Jenis Bahan</th>
                                    <th>Nama Bahan</th>
                                    <th>Jumlah Permintaan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                </div>
                </div>
            </>
        )
    }
}

export default permintaanproduksi