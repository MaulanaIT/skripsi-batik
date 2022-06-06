// Import Library
import React, { Component } from 'react';
import { FiXCircle } from 'react-icons/fi';

// Import CSS
import global from '../../../css/global.module.css';

export class detail_retur_gudang extends Component {

    CloseDetail = () => {
        document.getElementById('detail_retur_gudang').classList.add('d-none');
        }

    render() {
        return (
            <div id='detail_retur_gudang' className={`${global.loading_background} d-none`}>
                <div className={`table-responsive`}><FiXCircle className='fs-3 col-12' onClick={this.CloseDetail} />
                    <div className={`${global.card_detail}`}>
                        <p className='fs-5 fw-bold text-center'>Detail Retur Pembelian</p>
                        <table id='table-detail-data-gudang' className={`table w-100`}>
                            <thead>
                                <tr>
                                    <td>No.</td>
                                    <td>Kode Bahan/Alat</td>
                                    <td>Nama Bahan/Alat</td>
                                    <td>Satuan</td>
                                    <td>Jumlah Retur</td>
                                    <td>Harga</td>
                                    <td>Total Harga</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Retur</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default detail_retur_gudang