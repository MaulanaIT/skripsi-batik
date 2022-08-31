import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

import DetailStandar from './detail_standar';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/uang_muka_pesanan.module.css';

export default function Daftar_standar() {

    const [getHTMLTableDaftar, setHTMLTableDaftar] = useStateWithCallbackLazy([]);

    const [getSelectedKode, setSelectedKode] = useState(null);

    useEffect(() => {
        GetStandarPesanan();
    }, []);

    const GetStandarPesanan = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penjualan/standar-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftar = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftar.push(
                        <tr>
                            <td className='text-center'>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>
                                <div className={global.table_action}>
                                    <button type='button' id='button-detail' className={global.edit} onClick={() => OpenDetail(item.kode)}>Detail</button>
                                    <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteBahanPenolong(item.id)}><FaTrash />Delete</button>
                                </div>
                            </td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftar(htmlTableDaftar, () => {
                $(`#table-data`).DataTable();

                HideLoading()
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const OpenDetail = (kode) => {
        setSelectedKode(kode);
        document.getElementById('detail-standar').classList.remove('d-none');
    }

    return (
        <React.Fragment>
            <DetailStandar kode={getSelectedKode} />
            <div className={style.header}>
                <p className={style.title}>Daftar Standar Pesanan</p>
                <p className={style.pathname}>Transaksi / Penjualan / Standar Pesanan</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Standar Pesanan</p>
                        <Link to={'/transaksi/penjualan/standar-pesanan'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className='align-middle text-nowrap'>
                                <tr>
                                    <th className='text-center'>No.</th>
                                    <th>Kode Standar</th>
                                    <th>Nama Standar</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                {getHTMLTableDaftar}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}