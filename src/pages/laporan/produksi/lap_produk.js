import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { MdAdd } from 'react-icons/md';
import { TiExport } from 'react-icons/ti';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/kas/penerimaan_kas.module.css';

export default function Lap_produk() {

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    useEffect(() => {
        GetLaporan();
    }, []);

    const GetLaporan = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/laporan/produksi/bahan-jadi/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.hpp_per_produk}</td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftarLaporan(htmlTableDaftarLaporan, () => {
                $(`#table-data-produk-jadi`).DataTable();
            });

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    return (
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
                            <input type="date" id='input-tanggal-hari-ini' name='input-tanggal-hari-ini' value={moment().format('YYYY-MM-DD')} readOnly={true} />
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
                                {getHTMLTableDaftarLaporan}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}