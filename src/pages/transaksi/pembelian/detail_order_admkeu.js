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
                <div className={`table-responsive`}><FiXCircle className='fs-3' onClick={this.CloseDetail} />
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
                </div>
            </div>
        )
    }
}

export default detail_order_admkeu