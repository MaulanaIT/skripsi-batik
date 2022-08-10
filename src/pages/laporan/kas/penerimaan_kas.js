import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { CSVLink } from 'react-csv';
// import Select from 'react-select';
import moment from 'moment';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, cx, HideLoading, SetPriceFormat, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/kas/penerimaan_kas.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'black',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'black'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)',
        color: state.isSelected ? 'rgba(0, 0, 0, 0.6)' : 'black',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(0, 0, 0, 0.8)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'black',
        fontSize: 12
    })
}

export default function Penerimaan_kas() {

    const [getDataExport, setDataExport] = useState([]);

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    // const [getValueJenis, setValueJenis] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        $('#table-data').DataTable();
    }, []);

    const GetLaporan = () => {
        ShowLoading();

        const formData = new FormData();

        // formData.append('jenis_pembelian', getValueJenis.value.toLowerCase());
        formData.append('tanggal_awal', getValueTanggalAwal);
        formData.append('tanggal_akhir', getValueTanggalAkhir);
        
        axios.post(`${baseURL}/api/laporan/kas/penerimaan/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];
            let dataExport = [];

            dataExport.push([
                'Laporan Pnerimaan Kas',
                '',
                '',
                ''
            ]);

            dataExport.push([
                'Tanggal',
                'Kode',
                'Keterangan',
                'Nominal'
            ]);
            
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index} className={'align-middle'}>
                            <td className='text-center'>{index+1}.</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode}</td>
                            <td>{item.keterangan}</td>
                            <td>{SetPriceFormat(item.nominal)}</td>
                        </tr>
                    );

                    dataExport.push([
                        item.tanggal,
                        item.kode,
                        item.keterangan,
                        SetPriceFormat(item.nominal)
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
                <p className={style.title}>Laporan Penerimaan Kas</p>
                <p className={style.pathname}>Laporan / Laporan Kas / Penerimaan Kas </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <p className={global.title}>Laporan Penerimaan Kas</p>
                    {/* <div className={`${global.input_group_row} col-6 `}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Akun Kas</p>
                        <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                            { value: '1101', label: 'Kas di Tangan' },
                            { value: '1102', label: 'Kas Bank' }
                        ]} placeholder={'Select Akun...'} styles={CustomSelect} value={getValueJenis} onChange={e => setValueJenis(e)} />
                    </div> */}
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
                            <p className={global.title}>Daftar Penerimaan Kas</p>
                        </div>
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <CSVLink data={getDataExport} filename={`Laporan Penerimaan Kas ${getValueTanggalAwal} - ${getValueTanggalAkhir}`}>
                                <TiExport className='fs-4' />
                            </CSVLink>
                        </div>
                    </div>
                    <div className={cx([global.card, global.boxless])}>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Tanggal</th>
                                        <th>Kode Kas Masuk</th>
                                        <th>Keterangan</th>
                                        <th>Nominal</th>
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