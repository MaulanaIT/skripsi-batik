import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/uang_muka_pesanan.module.css';

export class daftar_standar extends Component {

    componentDidMount() {
        $('#table-data').DataTable();
    }

//tombol aksi di daftar pesanan isinya detail=detail standar (melihat detail standar), delete=menghapus standar    

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}> Daftar Standar Pesanan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Standar Pesanan</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Standar Pesanan</p>
                            <Link to={'/transaksi/penjualan/standar-pesanan'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Standar</td>
                                        <td>Nama Standar</td>
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

export default daftar_standar