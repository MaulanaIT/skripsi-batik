// Import Library
import $ from 'jquery';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';

// Import Component
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';

export default function Detail_retur_admkeu(props) {

    const [getHTMLTable, setHTMLTable] = useState([]);

    useEffect(() => {
        if (props.kode) {

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
        document.getElementById('detail_retur_admkeu').classList.add('d-none');
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
        <div id='detail_retur_admkeu' className={`${global.popup_detail} d-none`}>
            <div className={`table-responsive`}><FiXCircle className='fs-3 col-12' onClick={CloseDetail} />
                <div className={`${global.card_detail}`}>
                    <p className='fs-5 fw-bold text-center'>Detail Retur Pembelian</p>
                    <table id='table-detail-data-keuangan' className={`table w-100`}>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Kode Bahan/Alat</td>
                                <td>Nama Bahan/Alat</td>
                                <td>Satuan</td>
                                <td>Jumlah Retur</td>
                                <td>Harga</td>
                                <td>Total Harga</td>
                            </tr>
                        </thead>
                        <tbody>
                            {getHTMLTable}
                        </tbody>
                    </table>
                    <div className='d-flex'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}