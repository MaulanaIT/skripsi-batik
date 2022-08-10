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

export default function Detail_terimabarang(props) {

    const [getDataDetailTerimaBarang, setDataDetailTerimaBarang] = useState([]);
    
    const [getHTMLTable, setHTMLTable] = useState([]);

    useEffect(() => {
        if (props.kode) {
            GetDetail();
        }
    }, [props.kode]);

    useEffect(() => {
        $(`#table-detail-data`).DataTable();
    }, [getHTMLTable]);

    // const ApplyItem = (id) => {
    //     if (!CheckInputValidity('form-detail-table')) return;

    //     ShowLoading();

    //     let jumlah = GetValue(`edit-jumlah-${id}`);
    //     let harga = GetValue(`edit-harga-${id}`);

    //     const formData = new FormData();

    //     formData.append('id', id);
    //     formData.append('jumlah', jumlah);
    //     formData.append('harga', harga);

    //     axios.post(`${baseURL}/api/transaksi/pembelian/detail-retur/update.php`, formData, config).then(() => {
    //         document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
    //         document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

    //         GetDetail();
    //     }).catch(error => {
    //         console.log(error);

    //         HideLoading();
    //     });
    // }

    const CloseDetail = () => {
        document.getElementById('detail-terima-barang').classList.add('d-none');
    }

    // const EditItem = (id) => {
    //     document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
    //     document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    // }

    const GetDetail = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', props.kode);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-terima-barang/select.php`, formData, config).then(response => {
            let data = response.data.data.filter(item => item.kode === props.kode);

            let htmlTable = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTable.push(
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{SetNumberFormat(item.jumlah)}</td>
                            <td>{SetPriceFormat(item.harga)}</td>
                            <td>{SetPriceFormat(+item.jumlah * +item.harga)}</td>
                        </tr>
                    );
                });
            }

            $(`#table-detail-data`).DataTable().destroy();

            setHTMLTable(htmlTable);
            setDataDetailTerimaBarang(data);
            HideLoading();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    return (
        <div id='detail-terima-barang' className={`${global.popup_detail} d-none`}>
            <FiXCircle className={global.toggle} onClick={CloseDetail} />
            <div className={`table-responsive`}>
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Terima Barang</p>
                    <table id='table-detail-data' className={`table w-100`}>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Kode Bahan/Alat</td>
                                <td>Nama Bahan/Alat</td>
                                <td>Jumlah Retur</td>
                                <td>Harga</td>
                                <td>Total Harga</td>
                            </tr>
                        </thead>
                        <tbody>
                            {getHTMLTable}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}