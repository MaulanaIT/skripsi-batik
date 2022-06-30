import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';

export class laporan_tenaga_kerja extends Component {

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Laporan Produksi</p>
                    <p className={style.pathname}>Laporan / Produksi / Laporan Tenaga Kerja</p>
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
                                <p className={`${style.title} text-center w-100`} style={{ fontSize: 17 }}>LAPORAN TENAGA KERJA</p>

                                <div>
                                    <p className={global.input_group_row}>Tanggal</p>
                                    <div className={`d-flex`}>
                                        <div className={'col-3'}>
                                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' className={'w-100'} readOnly={true} />
                                        </div>
                                        <div className={'d-flex align-items-center px-3'}>
                                            <p className={global.title}> sampai </p>
                                        </div>
                                        <div className={'col-3'}>
                                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir' className={'w-100'} readOnly={true} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`table-responsive`}>
                                    <table id='table-data' className={`table table-bordered table-striped table-hover w-100`}>
                                        <thead className='text-nowrap'>
                                            <tr>
                                                <td>Nama Tenaga Kerja</td>
                                                <td>Departemen</td>
                                                <td>Kuantitas Produksi</td>
                                                <td>Nama Produk</td>
                                                <td>Upah</td>
                                                <td>Total Biaya</td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className={'d-flex align-items-center px-3'}>
                                        <p className={`${global.input_group_row} col-4`}>TOTAL BIAYA TENAGA KERJA</p>
                                        <div className={'col-3'}>
                                            <input type="text" id='input-total-biaya-tenaga-kerja' name='input-total-biaya-tenaga-kerja' readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default laporan_tenaga_kerja
