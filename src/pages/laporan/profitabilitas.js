import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { CSVLink } from 'react-csv';
// import Select from 'react-select';
import moment from 'moment';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, cx, HideLoading, SetPriceFormat, ShowLoading } from '../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/laporan/profitabilitas.module.css';

export default function Profitabilitas() {

    const [getDataExport, setDataExport] = useState([]);

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    const [getValueTotalDebit, setValueTotalDebit] = useState(0);
    const [getValueTotalKredit, setValueTotalKredit] = useState(0);
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

        axios.post(`${baseURL}/api/laporan/profitabilitas/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];
            let dataExport = [];

            let totalDebit = 0;
            let totalKredit = 0;

            dataExport.push([
                'Laporan Profitabilitas',
                '',
                '',
                '',
                ''
            ]);

            dataExport.push([
                'Kode',
                'Nama',
                'Debit',
                'Kredit',
                ''
            ]);

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index} className={'align-middle'}>
                            <td className='text-center'>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{SetPriceFormat(item.debit ?? 0)}</td>
                            <td>{SetPriceFormat(item.kredit ?? 0)}</td>
                            <td></td>
                        </tr>
                    );

                    dataExport.push([
                        item.kode,
                        item.nama,
                        SetPriceFormat(item.debit ?? 0),
                        SetPriceFormat(item.kredit ?? 0),
                        ''
                    ]);

                    totalDebit += +item.debit;
                    totalKredit += +item.kredit;
                });
            }

            dataExport.push([
                '',
                '',
                SetPriceFormat(totalDebit),
                SetPriceFormat(totalKredit),
                `Profit: ${SetPriceFormat(+totalKredit - +totalDebit)}`
            ]);

            $('#table-data').DataTable().destroy();

            setDataExport(dataExport);
            setValueTotalDebit(totalDebit);
            setValueTotalKredit(totalKredit);
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
                <p className={style.title}>Laporan Profitabilitas</p>
                <p className={style.pathname}>Laporan / Laporan Profitabilitas </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <p className={global.title}>Laporan Profitabilitas</p>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' value={getValueTanggalAwal} onChange={e => setValueTanggalAwal(e.target.value)} />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                            <input type="date" id='input-tanggal-khir' name='input-tanggal-akhir' value={getValueTanggalAkhir} onChange={e => setValueTanggalAkhir(e.target.value)} />
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
                            <p className={global.title}>Laporan Profitabilitas</p>
                        </div>
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <CSVLink data={getDataExport} filename={`Laporan Profitabilitas ${getValueTanggalAwal} - ${getValueTanggalAkhir}`}>
                                <TiExport className='fs-4' />
                            </CSVLink>
                        </div>
                    </div>
                    <div id='content' className={cx([global.card, global.boxless])}>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Akun</th>
                                        <th>Nama Akun</th>
                                        <th>Debit</th>
                                        <th>Kredit</th>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarLaporan}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td>{SetPriceFormat(getValueTotalDebit)}</td>
                                        <td>{SetPriceFormat(getValueTotalKredit)}</td>
                                        <td>Profit : {SetPriceFormat(+getValueTotalKredit - +getValueTotalDebit)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}