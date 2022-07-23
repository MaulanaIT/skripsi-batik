import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

export default function Permintaan_prod_pesanan() {

    const [getHTMLTableDaftarPesananProduksi, setHTMLTableDaftarPesananProduksi] = useStateWithCallbackLazy([]);

    useEffect(() => {
        GetPesananProduk();
    }, []);

    const GetPesananProduk = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarPesanan = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarPesanan.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>Kode</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.kode_customer}</td>
                            <td>{item.nama_customer}</td>
                            <td>{item.jumlah}</td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftarPesananProduksi(htmlTableDaftarPesanan, () => {
                $(`#table-data`).DataTable();
            });

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Daftar Permintaan Produksi Pesanan</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Permintaan Produksi Pesanan</p>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className="align-middle text-center text-nowrap">
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Permintaan</th>
                                    <th>Kode Pesanan</th>
                                    <th>Nama Pesanan</th>
                                    <th>Kode Customer</th>
                                    <th>Nama Customer</th>
                                    <th>Jumlah Pesanan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarPesananProduksi}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}