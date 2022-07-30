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

export default function Detail_order(props) {

    const [getHTMLTableAlat, setHTMLTableAlat] = useState([]);
    const [getHTMLTableBahan, setHTMLTableBahan] = useState([]);

    useEffect(() => {
        if (props.kode) {
            GetDetail();
        }
    }, [props.kode]);

    useEffect(() => {
        if (props.jenis === 'alat') {
            $(`#table-detail-data-alat`).DataTable();
        }
    }, [getHTMLTableAlat]);

    useEffect(() => {
        if (props.jenis === 'bahan') {
            $(`#table-detail-data-bahan`).DataTable();
        }
    }, [getHTMLTableBahan]);

    const ApplyItem = (id) => {
        if (!CheckInputValidity('form-detail-table')) return;

        ShowLoading();

        let jumlah = GetValue(`edit-jumlah-${id}`);
        let harga = GetValue(`edit-harga-${id}`);
        let total_kapasitas = GetValue(`edit-total-kapasitas-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('jumlah', jumlah);
        formData.append('harga', harga);
        formData.append('total_kapasitas', total_kapasitas);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-order/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            GetDetail();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const CloseDetail = () => {
        document.getElementById('detail-order').classList.add('d-none');
    }

    const EditItem = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    const GetDetail = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', props.kode);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-order/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableAlat = [];
            let htmlTableBahan = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    if (props.jenis === 'alat') {
                        htmlTableAlat.push(
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_item}</td>
                                <td>{item.nama_item}</td>
                                <td>
                                    <div id={`data-jumlah-${item.id}`} className={`data-${item.id}`}>{item.jumlah}</div>
                                    <div className={global.input_group_row}>
                                        <input type="text" id={`edit-jumlah-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.jumlah} required={true} />
                                    </div>
                                </td>
                                <td>
                                    <div id={`data-harga-${item.id}`} className={`data-${item.id}`}>{item.harga}</div>
                                    <div className={global.input_group_row}>
                                        <input type="text" id={`edit-harga-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.harga} required={true} />
                                    </div>
                                </td>
                                <td>{item.total_harga}</td>
                                <td>
                                    <div id={`data-total-kapasitas-${item.id}`} className={`data-${item.id}`}>{item.total_kapasitas}</div>
                                    <div className={global.input_group_row}>
                                        <input type="text" id={`edit-total-kapasitas-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.total_kapasitas} required={true} />
                                    </div>
                                </td>
                                <td className={global.table_action}>
                                    <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => ApplyItem(item.id)}><FaCheck /> Apply</button>
                                    <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => EditItem(item.id)} disabled={props.status < 3 ? false : true}><FaPen /> Edit</button>
                                </td>
                            </tr>
                        );
                    }

                    if (props.jenis === 'bahan') {
                        htmlTableBahan.push(
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_item}</td>
                                <td>{item.nama_item}</td>
                                <td>
                                    <div id={`data-jumlah-${item.id}`} className={`data-${item.id}`}>{item.jumlah}</div>
                                    <div className={global.input_group_row}>
                                        <input type="text" id={`edit-jumlah-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.jumlah} required={true} />
                                    </div>
                                </td>
                                <td>
                                    <div id={`data-harga-${item.id}`} className={`data-${item.id}`}>{item.harga}</div>
                                    <div className={global.input_group_row}>
                                        <input type="text" id={`edit-harga-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.harga} required={true} />
                                    </div>
                                </td>
                                <td>{item.total_harga}</td>
                                <td className={global.table_action}>
                                    <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => ApplyItem(item.id)}><FaCheck /> Apply</button>
                                    <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => EditItem(item.id)} disabled={props.status < 3 ? false : true}><FaPen /> Edit</button>
                                </td>
                            </tr>
                        );
                    }
                });
            }

            $(`#table-detail-data-alat`).DataTable().destroy();
            $(`#table-detail-data-bahan`).DataTable().destroy();

            setHTMLTableAlat(htmlTableAlat);
            setHTMLTableBahan(htmlTableBahan);
            HideLoading();
        }).catch(error => {
            console.log(error);
            HideLoading();
        });
    }

    const UpdateStatus = (status) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', props.kode);
        formData.append('status', status);

        axios.post(`${baseURL}/api/transaksi/pembelian/order/update-status.php`, formData, config).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error)

            HideLoading();
        });
    }

    return (
        <div id='detail-order' className={`${global.popup_detail} d-none`}>
            <div className={`table-responsive m-4`}>
                <FiXCircle className='fs-3 col-12' onClick={CloseDetail} />
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Order Pembelian</p>
                    <form id='form-detail-table'>
                        <div className={`${props.jenis === 'bahan' && 'd-none'} table-responsive`}>
                            <table id='table-detail-data-alat' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Alat</td>
                                        <td>Nama Alat</td>
                                        <td>Jumlah Beli</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                        <td>Total Kapasitas</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableAlat}
                                </tbody>
                            </table>
                        </div>
                        <div className={`${props.jenis === 'alat' && 'd-none'} table-responsive`}>
                            <table id='table-detail-data-bahan' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Bahan</td>
                                        <td>Nama Bahan</td>
                                        <td>Jumlah Beli</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableBahan}
                                </tbody>
                            </table>
                        </div>
                    </form>

                    <div className='d-flex'>
                        {localStorage.getItem('leksana_jabatan').toLowerCase() === 'admin, keuangan' &&
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={() => UpdateStatus(1)} disabled={props.status === 0 ? false : true}>Setuju</button>
                            </div>
                        }
                        {localStorage.getItem('leksana_jabatan').toLowerCase() === 'gudang, pembelian' &&
                            <React.Fragment>
                                <div className='col-6 pe-2'>
                                    <button type='button' className={`${global.button} w-100`} onClick={() => UpdateStatus(2)} disabled={props.status === 1 ? false : true}>Order</button>
                                </div>
                                <div className='col-6 ps-2'>
                                    {props.status === 2 ?
                                        <Link to={'/transaksi/pembelian/penerimaan-barang'} className={`${global.button}`} state={{ kode: props.kode }} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Terima Barang</Link>
                                        :
                                        <button type='button' className={`${global.button} w-100`} onClick={() => UpdateStatus(3)} disabled={true} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Terima Barang</button>
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