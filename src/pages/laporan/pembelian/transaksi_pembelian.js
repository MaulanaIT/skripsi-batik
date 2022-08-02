import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/pembelian/transaksi_pembelian.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 3)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export default function Transaksi_pembelian() {

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    const [getValueJenis, setValueJenis] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        $('#table-data').DataTable();
    }, []);

    const GetLaporan = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_pembelian', getValueJenis.value.toLowerCase());
        formData.append('tanggal_awal', getValueTanggalAwal);
        formData.append('tanggal_akhir', getValueTanggalAkhir);
        
        axios.post(`${baseURL}/api/laporan/pembelian/transaksi/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];
            
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index} className={'align-middle'}>
                            <td className='text-center'>{index+1}.</td>
                            <td>{item.kode_kas_keluar}</td>
                            <td>{item.kode_order}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.jenis_pembelian}</td>
                            <td>{item.kode_supplier}</td>
                            <td>{item.nama_supplier}</td>
                            <td>{item.total_harga}</td>
                            <td></td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

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
                <p className={style.title}>Laporan Transaksi Pembelian</p>
                <p className={style.pathname}>Laporan / Laporan Pembelian / Transaksi Pembelian </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <p className={global.title}>Laporan Transaksi Pembelian</p>
                    <div className={`${global.input_group_row} col-6 `}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Jenis Pembelian</p>
                        <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                            { value: '', label: 'Semua' },
                            { value: 'Bahan', label: 'Bahan' },
                            { value: 'Alat', label: 'Alat' }
                        ]} placeholder={'Select Pembelian...'} styles={CustomSelect} value={getValueJenis} onChange={e => setValueJenis(e)} />
                    </div>
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
                            <p className={global.title}>Daftar Pembelian</p>
                        </div>
                        <div className='col-1 ps-5'>
                            <TiExport className='fs-4' />
                        </div>
                        <div className='col-1 pe-5'>
                            <AiFillPrinter className='fs-4' />
                        </div>
                    </div>
                    <div className={global.card}>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Kas Keluar</th>
                                        <th>Kode Order</th>
                                        <th>Tanggal</th>
                                        <th>Jenis Pembelian</th>
                                        <th>Kode Supplier</th>
                                        <th>Nama Supplier</th>
                                        <th>Total Pembelian</th>
                                        <th>Nota</th>
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