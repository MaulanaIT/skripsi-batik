import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

export default function Daftar_hpp() {

    const [getHTMLTableDaftarHPP, setHTMLTableDaftarHPP] = useStateWithCallbackLazy([]);

    useEffect(() => {
        GetHPP();
    }, []);

    const GetHPP = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/hpp/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarHPP = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarHPP.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_produksi}</td>
                            <td>{item.tanggal_mulai}</td>
                            <td>{item.tanggal_selesai}</td>
                            <td>{item.biaya_bahan_baku}</td>
                            <td>{item.biaya_tenaga_kerja}</td>
                            <td>{item.biaya_overhead_pabrik}</td>
                            <td>{item.hpp}</td>
                            <td>{item.harga_jual}</td>
                            <td></td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftarHPP(htmlTableDaftarHPP, () => {
                $(`#table-data`).DataTable();

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        })
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Proses Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Proses Produksi</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Proses Produksi</p>
                        <Link to={'/transaksi/produksi/hpp'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>No.</td>
                                    <td>Kode HPP</td>
                                    <td>Kode Produksi</td>
                                    <td>Tanggal Mulai</td>
                                    <td>Tanggal Selesai</td>
                                    <td>Biaya Bahan Baku</td>
                                    <td>Biaya Tenaga Kerja</td>
                                    <td>Biaya Overhead Pabrik</td>
                                    <td>HPP</td>
                                    <td>Harga Jual</td>
                                    <td>Aksi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarHPP}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}