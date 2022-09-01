// Import Library
import $ from 'jquery';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { FaCheck, FaPen } from 'react-icons/fa';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import Component
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';

export default function Detail_standar(props) {

    const [getHTMLTableDaftar, setHTMLTableDaftar] = useStateWithCallbackLazy([]);

    useEffect(() => {
        if (props.kode) {
            GetDetail();
        }
    }, [props.kode]);

    const CloseDetail = () => {
        document.getElementById('detail-standar').classList.add('d-none');
    }

    const GetDetail = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penjualan/standar-pesanan/select-detail.php`, config).then(response => {
            let data = response.data.data.filter(item => item.kode === props.kode);

            let htmlTableDaftar = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftar.push(
                        <tr>
                            <td>{index + 1}.</td>
                            <td>{item.jenis_item}</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    );
                });
            }
            $(`#table-detail-data`).DataTable().destroy();

            setHTMLTableDaftar(htmlTableDaftar, () => {
                $(`#table-detail-data`).DataTable();

                HideLoading();
            })
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    return (
        <div id='detail-standar' className={`${global.popup_detail} d-none`}>
            <FiXCircle className={global.toggle} onClick={CloseDetail} />
            <div>
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Standar Pesanan</p>
                    <div className={`table-responsive w-100`}>
                        <table id='table-detail-data' className={`table w-100`}>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Jenis Item</th>
                                    <th>Kode Item</th>
                                    <th>Nama Item</th>
                                    <th>Jumlah</th>
                                    <th>Harga</th>
                                    <th>Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftar}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}