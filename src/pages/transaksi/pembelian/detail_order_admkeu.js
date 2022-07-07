// Import Library
import $ from 'jquery';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';

// Import Component
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';

export default function Detail_order_admkeu(props) {

    const [getHTMLTable, setHTMLTable] = useState([]);

    useEffect(() => {
        if (props.kode) {

            const formData = new FormData();

            formData.append('kode', props.kode);

            axios.post(`${baseURL}/api/transaksi/pembelian/detail-order/select.php`, formData, config).then(response => {
                let data = response.data.data;

                let htmlTable = [];

                if (data && data.length > 0) {
                    data.forEach((item, index) => {
                        htmlTable.push(
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_item}</td>
                                <td>{item.nama_item}</td>
                                <td></td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{item.total_harga}</td>
                            </tr>
                        );
                    });
                }

                $(`#table-detail-data-keuangan`).DataTable().destroy();

                setHTMLTable(htmlTable);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [props.kode]);

    useEffect(() => {
        $(`#table-detail-data-keuangan`).DataTable();
    }, [getHTMLTable]);

    const CloseDetail = () => {
        document.getElementById('detail_order_admkeu').classList.add('d-none');

        $(`#table-detail-data-keuangan`).DataTable().destroy();

        setHTMLTable([]);
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
        <div id='detail_order_admkeu' className={`${global.popup_detail} d-none`}>
            <div className={`table-responsive m-4`}>
                <FiXCircle className='fs-3 col-12' onClick={CloseDetail} />
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Order Pembelian</p>
                    <div className='table-responsive'>
                        <table id='table-detail-data-keuangan' className={`table w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>No.</td>
                                    <td>Kode Bahan/Alat</td>
                                    <td>Nama Bahan/Alat</td>
                                    <td>Satuan</td>
                                    <td>Jumlah Beli</td>
                                    <td>Harga</td>
                                    <td>Total Harga</td>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTable}
                            </tbody>
                        </table>
                    </div>
                    <div className='d-flex'>
                        <div className='col-6 pe-2'>
                        </div>
                        <div className='col-6 pe-2'>
                            <button type='button' className={`${global.button} w-100`} onClick={() => UpdateStatus(1)} disabled={props.status === 0 ? false : true}>Setuju</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}