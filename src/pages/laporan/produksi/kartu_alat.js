import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';


export class kartu_alat extends Component {

render() {
    return (
        <>
        <div className={style.header}>
                    <p className={style.title}>Kartu Produksi</p>
                    <p className={style.pathname}>Laporan / Produksi / Kartu Alat</p>
        </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-2`}>Tanggal</p>
                            <div>
                                <input type="date" className={global.input1} id='input-tanggal-awal' name='input-tanggal-awal' />
                            </div>
                            <div>
                                <p className={`${global.title} col-auto px-3`}>sampai</p>
                            </div>
                            <div>
                                <input type="date" className={global.input1} id='input-tanggal-akhir' name='input-tanggal-akhir' />
                            </div>
                    </div>
                <div className='d-flex'>
                    <div className='col-6 pe-3'>
                        <button type='button' className={`${global.button} w-100`}>Lihat</button>
                    </div>
                    <div className='col-6 ps-3'>
                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Cetak</button>
                    </div>
                </div>

                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                    <p className={`${style.title} text-center w-100 fw-bold`} style={{ fontSize: 18 }}>LEKSANA BATIK JAYA</p>
                    <p className={`${style.title} text-center w-100`} style={{ fontSize: 17 }}>KARTU ALAT</p>
                    
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Kode Alat</p>
                            <input type="text" id='input-kode-alat' name='input-kode-alat' readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-3 ps-2`}>
                            <p className={global.title}>Nama Alat</p>
                            <input type="text" id='input-nama-alat' name='input-nama-alat' />
                        </div>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table table-bordered table-striped table-hover w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>Tanggal</td>
                                    <td>Kode Alat</td>
                                    <td>Nama Alat</td>
                                    <td>Harga Perolehan</td>
                                    <td>Tarif BOP</td>
                                    <td>Pemakaian</td>
                                    <td>Sisa Taksiran</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
}

export default kartu_alat
