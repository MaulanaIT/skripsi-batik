import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaMoneyBill, FaTrash } from 'react-icons/fa';
import { baseURL, config, cx, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

import DetailKonsinyasi from './detail_konsinyasi';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/daftar_pesanan.module.css';
import { useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useEffect } from 'react';

export default function Daftar_konsinyasi() {

    const [getDataDetailKonsinyasi, setDataDetailKonsinyasi] = useStateWithCallbackLazy([]);

    const [getHTMLTableDaftarKonsinyasi, setHTMLTableDaftarKonsinyasi] = useStateWithCallbackLazy([]);

    useEffect(() => {
        getKonsinyasi();
    }, []);

    const getDetailKonsinyasi = (kode) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select-detail.php`, formData, config).then(response => {
            let data = response.data.data;

            setDataDetailKonsinyasi(data);
            document.getElementById('detail-konsinyasi').classList.remove('d-none');

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const getKonsinyasi = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_penjualan', 'konsinyasi');

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarKonsinyasi = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarKonsinyasi.push(
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode_consignee}</td>
                            <td>{item.nama_consignee}</td>
                            <td>{SetPriceFormat(item.total_jual)}</td>
                            <td>{SetPriceFormat(item.diskon)}</td>
                            <td>{SetPriceFormat(item.piutang)}</td>
                            <td>{+item.sisa === 0 ? 'Selesai' : 'Menunggu'}</td>
                            <td>
                                <div className={global.table_action}>
                                    <button type='button' id='button-detail' className={global.edit} onClick={() => getDetailKonsinyasi(item.kode)}><FaClipboardList /> Detail</button>
                                </div>
                            </td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftarKonsinyasi(htmlTableDaftarKonsinyasi, () => {
                $(`#table-data`).DataTable();

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <DetailKonsinyasi data={getDataDetailKonsinyasi} />
            <div className={style.header}>
                <p className={style.title}>Transaksi Penjualan</p>
                <p className={style.pathname}>Transaksi / Penjualan / Data Konsinyasi</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Konsinyasi</p>
                        <Link to={'/transaksi/penerimaan-kas/terima-piutang'} className={global.apply}><FaMoneyBill /> Terima Piutang</Link>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Jual</th>
                                    <th>Tanggal</th>
                                    <th>Kode Consignee</th>
                                    <th>Nama Consignee</th>
                                    <th>Jumlah Konsinyasi</th>
                                    <th>Diskon</th>
                                    <th>Piutang Konsinyasi</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarKonsinyasi}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}