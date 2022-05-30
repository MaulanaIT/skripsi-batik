// Import Library
import React, { Component } from 'react';
import { FiXCircle } from 'react-icons/fi';

// Import CSS
import global from '../../../css/global.module.css';

export class detail_order_admkeu extends Component {

    CloseDetail = () => {
        document.getElementById('detail_order_admkeu').classList.add('d-none');
        }

    render() {
        return (
            <div id='detail_order_admkeu' className={`${global.loading_background} d-none`}>
                <div className={`table-responsive`}><FiXCircle className='fs-3 col-12' onClick={this.CloseDetail} />
                    <div className={`${global.card_detail}`}>
                        <p className='fs-5 fw-bold text-center'>Detail Order Pembelian</p>
                        <table id='table-data' className={`table w-100`}>
                            <thead>
                                <tr>
                                    <td>No.</td>
                                    <td>Kode Bahan/Alat</td>
                                    <td>Nama Bahan/Alat</td>
                                    <td>Satuan</td>
                                    <td>Jumlah Beli</td>
                                    <td>Harga</td>
                                    <td>Total Harga</td>
                                    <td>Aksi</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`}>Setuju</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default detail_order_admkeu