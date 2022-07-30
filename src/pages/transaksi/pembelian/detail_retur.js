// Import Library
import $ from 'jquery';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { FaCheck, FaPen } from 'react-icons/fa';

// Import Component
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';

export default function Detail_retur(props) {

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
        document.getElementById('detail-retur').classList.add('d-none');
    }

    // const EditItem = (id) => {
    //     document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
    //     document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    // }

    const GetDetail = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', props.kode);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-retur/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTable = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTable.push(
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                            <td>{item.total_kapasitas}</td>
                        </tr>
                    );
                });
            }

            $(`#table-detail-data`).DataTable().destroy();

            setHTMLTable(htmlTable);
            HideLoading();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const UpdateStatus = (status) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', props.kode);
        formData.append('status', status);

        axios.post(`${baseURL}/api/transaksi/pembelian/retur/update-status.php`, formData, config).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error)

            HideLoading();
        });
    }

    return (
        <div id='detail-retur' className={`${global.popup_detail} d-none`}>
            <div className={`table-responsive`}><FiXCircle className='fs-3 col-12' onClick={CloseDetail} />
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Retur Pembelian</p>
                    <table id='table-detail-data' className={`table w-100`}>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Kode Bahan/Alat</td>
                                <td>Nama Bahan/Alat</td>
                                <td>Jumlah Retur</td>
                                <td>Harga</td>
                                <td>Total Harga</td>
                                <td>Pengurangan Kapasitas</td>
                            </tr>
                        </thead>
                        <tbody>
                            {getHTMLTable}
                        </tbody>
                    </table>
                    <div className='d-flex'>
                        {localStorage.getItem('leksana_jabatan').toLowerCase() === 'gudang, pembelian' &&
                            <div className='col-6'>
                                <button type='button' className={`${global.button} w-100`} onClick={() => UpdateStatus(2)} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }} disabled={props.status === 1 ? false : true}>Retur</button>
                            </div>
                        }
                        {localStorage.getItem('leksana_jabatan').toLowerCase() === 'admin, keuangan' &&
                            <React.Fragment>
                                <div className='col-6 pe-2'>
                                    <button type='button' className={`${global.button} w-100`} onClick={() => UpdateStatus(1)} disabled={props.status === 0 ? false : true}>Setuju</button>
                                </div>
                                <div className='col-6 ps-2'>
                                    {props.status === 2 ?
                                        <Link to={'/transaksi/penerimaan-kas/pengembalian-dana'} state={{ kode: props.kode }} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Terima Kas</Link>
                                        :
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }} disabled={true}>Terima Kas</button>
                                    }
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}