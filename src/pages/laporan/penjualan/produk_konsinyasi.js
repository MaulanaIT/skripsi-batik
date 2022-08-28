import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import { baseURL, config, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { MdAdd } from 'react-icons/md';
import { TiExport } from 'react-icons/ti';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';

export default function produk_konsinyasi() {

    return (
        <React.Fragment>

        <div className={style.header}>
                <p className={style.title}>Daftar Hasil Konsinyasi</p>
                <p className={style.pathname}>Laporan / Transaksi Penjualan / Daftar Hasil Konsinyasi</p>
        </div>
        <div className={style.content}>
        <div className={global.card}>
                    <p className={global.title}>Laporan Piutang Konsinyasi</p>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir' />
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-2 pt-2'>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`}>Cek Laporan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <p className={`${style.title} text-center w-100 fw-bold`}>DAFTAR HASIL KONSINYASI</p>
                    <br></br>
                    <br></br>
                    <div className={`table-responsive`}>
                        <table id='table-data-produk-jadi' className={`table w-100`}>
                            <thead className="align-middle text-center text-nowrap">
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Kas Masuk</th>
                                    <th>Tanggal</th>
                                    <th>Nama Consignee</th>
                                    <th>Nama Produk</th>
                                    <th>Harga Produk</th>
                                    <th>Jumlah Konsinyasi</th>
                                    <th>Jumlah Terjual</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
    )
}