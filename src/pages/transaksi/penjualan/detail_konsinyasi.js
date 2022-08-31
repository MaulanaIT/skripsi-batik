// Import Library
import $ from 'jquery';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { FaCheck, FaPen } from 'react-icons/fa';

// Import Component
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

export default function Detail_order(props) {

    const [getHTMLTableKonsinyasi, setHTMLTableKonsinyasi] = useStateWithCallbackLazy([]);

    useEffect(() => {
        if (props.data) {
            GetDetail();
        }
    }, [props.data]);

    const CloseDetail = () => {
        document.getElementById('detail-konsinyasi').classList.add('d-none');
    }

    const GetDetail = () => {
        ShowLoading();

        $(`#table-detail-konsinyasi`).DataTable().destroy();

        let htmlTableKonsinaysi = [];

        if (props.data && props.data.length > 0) {
            props.data.forEach((item, index) => {
                htmlTableKonsinaysi.push(
                    <tr>
                        <td>{index + 1}.</td>
                        <td>{item.kode_item}</td>
                        <td>{item.nama_item}</td>
                        <td>{SetNumberFormat(item.jumlah)}</td>
                        <td>{SetPriceFormat(item.harga)}</td>
                        <td>{SetPriceFormat(item.total_harga)}</td>
                    </tr>
                );
            });
        }

        setHTMLTableKonsinyasi(htmlTableKonsinaysi, () => {
            $(`#table-detail-konsinyasi`).DataTable();

            HideLoading();
        });
    }

    return (
        <div id='detail-konsinyasi' className={`${global.popup_detail} d-none`}>
            <div className={`table-responsive m-4`}>
                <FiXCircle className='fs-3 col-12' onClick={CloseDetail} />
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Konsinyasi</p>
                    <form id='form-detail-table'>
                        <div className={`${props.jenis === 'bahan' && 'd-none'} table-responsive`}>
                            <table id='table-detail-konsinyasi' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode</td>
                                        <td>Nama</td>
                                        <td>Jumlah</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableKonsinyasi}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}