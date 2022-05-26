import React, { Component } from 'react';

// Import Library
import $ from 'jquery';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/laporan/profitabilitas.module.css';

export class profitabilitas extends Component {
    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Laporan Profitabilitas</p>
                    <p className={style.pathname}>Laporan / Laporan Profitabilitas </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                        <p className={global.title}>Laporan Profitabilitas</p>
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
                        <div className={`${global.header}`}>
                            <p className={global.title}>Laporan Profitabilitas</p>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Akun</th>
                                            <th>Nama AKun</th>
                                            <th>Debit</th>
                                            <th>Kredit</th>
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

export default profitabilitas