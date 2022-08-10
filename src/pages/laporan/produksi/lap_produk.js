import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';
import { TiExport } from 'react-icons/ti';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/kas/penerimaan_kas.module.css';

export class lap_produk extends Component {
    render() {
        return (
            <>
            <div className={`${global.card} col-12`}>
                    <div className='d-flex'>
                        <div className='col-10'>
                            <p className={global.title}></p>
                        </div>
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <TiExport className='fs-4' />
                        </div>
                    </div>
            <div className={`${global.card} col-12`}>
                <div className={([global.card, global.boxless])}>
                <p className={`${style.title} text-center w-100 fw-bold`}>LEKSANA BATIK JAYA</p>
                <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN PERSEDIAAN BARANG JADI</p>
                <br></br>
            <div className={`${bootstrap[`d-flex`]}`}>
                <div className={`${global.input_group_row} col-6 ps-2`}>
                    <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Per Tanggal</p>
                    <input type="date" id='input-tanggal-hari-ini' name='input-tanggal-hari-ini' readOnly={true} />
                </div>
            </div>
            <br></br>
                <div className={`table-responsive`}>
                    <table id='table-data-produk-jadi' className={`table w-100`}>
                        <thead className="align-middle text-center text-nowrap">
                            <tr>
                                <th>No.</th>
                                <th>Kode Produk</th>
                                <th>Nama Produk</th>
                                <th>Jumlah</th>
                                <th>Harga Pokok Produk</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
        </>
        )
    }
}

export default lap_produk