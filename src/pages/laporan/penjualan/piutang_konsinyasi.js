import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, HideLoading, SetPriceFormat, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/penjualan/piutang_konsinyasi.module.css';

export default function Piutang_konsinyasi() {

    const [getDataExport, setDataExport] = useState([]);

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        $('#table-data').DataTable();
    }, []);

    const GetLaporan = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('tanggal_awal', getValueTanggalAwal);
        formData.append('tanggal_akhir', getValueTanggalAkhir);
        
        axios.post(`${baseURL}/api/laporan/penjualan/piutang/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];
            let dataExport = [];

            dataExport.push([
                'Kode',
                'Tanggal',
                'Kode Consignee',
                'Nama Consignee',
                'Piutang',
                'Sisa'
            ]);
            
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index} className={'align-middle'}>
                            <td className='text-center'>{index+1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode_consignee}</td>
                            <td>{item.nama_consignee}</td>
                            <td>{SetPriceFormat(item.piutang)}</td>
                            <td>{SetPriceFormat(item.sisa)}</td>
                        </tr>
                    );

                    dataExport.push([
                        item.kode,
                        item.tanggal,
                        item.kode_consignee,
                        item.nama_consignee,
                        SetPriceFormat(item.piutang),
                        SetPriceFormat(item.sisa)
                    ]);
                });
            }

            $('#table-data').DataTable().destroy();

            setDataExport(dataExport);
            setHTMLTableDaftarLaporan(htmlTableDaftarLaporan, () => {
                $('#table-data').DataTable();
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
                <p className={style.title}>Laporan Piutang Konsinyasi</p>
                <p className={style.pathname}>Laporan / Laporan Penjualan / Piutang Konsinyasi </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <p className={global.title}>Laporan Piutang Konsinyasi</p>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' value={getValueTanggalAwal} onChange={e => setValueTanggalAwal(e.target.value)} />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir' value={getValueTanggalAkhir} onChange={e => setValueTanggalAkhir(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-2 pt-2'>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={GetLaporan}>Cek Laporan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${global.card} col-12`}>
                    <div className='d-flex'>
                        <div className='col-10'>
                            <p className={global.title}>Daftar Piutang Konsinyasi</p>
                        </div>
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <CSVLink data={getDataExport} filename={`Laporan Piutang Konsinyasi ${getValueTanggalAwal} - ${getValueTanggalAkhir}`}>
                                <TiExport className='fs-4' />
                            </CSVLink>
                        </div>
                    </div>
                    <div className={global.card}>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Jual</th>
                                        <th>Tanggal</th>
                                        <th>Kode Consignee</th>
                                        <th>Nama Consignee</th>
                                        <th>Jumlah Piutang</th>
                                        <th>Sisa Piutang</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarLaporan}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}