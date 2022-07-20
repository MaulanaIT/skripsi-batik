// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { FiXCircle } from 'react-icons/fi';

// Import CSS
import global from '../../../css/global.module.css';

export class detail_aksi_pesan extends Component {

    CloseDetail = () => {
        document.getElementById('detail_pesanan').classList.add('d-none');
    }

    render() {
        return (
            <div id='detail_pesanan' className={`${global.popup_detail} d-none`}>
                <div className={`table-responsive`}><FiXCircle className='fs-3 col-12' onClick={this.CloseDetail} />
                    <div className={`${global.card_detail}`}>
                        <p className='fs-5 fw-bold text-center'>Detail Pesanan</p>
                        <table id='table-detail-data-pesanan' className={`table w-100`}>
                            <thead>
                                <tr className={'align-middle'}>
                                    <th>No.</th>
                                    <th>Kode Pesanan</th>
                                    <th>Nama Pesanan</th>
                                    <th>Jumlah Jual</th>
                                    <th>Harga Jual</th>
                                    <th>Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.htmlTableDaftarDetailPesanan}
                            </tbody>
                        </table>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <Link to={'/transaksi/penerimaan-kas/uang-muka-pesanan'} className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }}>Terima Uang Muka</Link>
                            </div>
                            <div className='col-6 ps-2'>
                                <Link to={'/transaksi/penjualan/jual-pesan'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Penyerahan Pesanan</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default detail_aksi_pesan