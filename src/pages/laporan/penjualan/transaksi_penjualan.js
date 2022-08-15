import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, cx, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { FaPrint } from 'react-icons/fa';

// Import Component
import PrintoutPenjualan from '../../transaksi/penjualan/printout_penjualan';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/penjualan/transaksi_penjualan.module.css';

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

export default function Transaksi_penjualan() {

    const [getDataExport, setDataExport] = useState([]);

    const [getDataPenjualan, setDataPenjualan] = useStateWithCallbackLazy([]);
    const [getDataDetailPenjualan, setDataDetailPenjualan] = useStateWithCallbackLazy([]);

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    const [getValueJenis, setValueJenis] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));

    useEffect(() => {
        $('#table-data').DataTable();
    }, []);

    const GetLaporan = () => {
        if (getValueJenis.length <= 0) {
            alert('Pilih jenis penjualan');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_penjualan', getValueJenis.value.toLowerCase());
        formData.append('tanggal_awal', getValueTanggalAwal);
        formData.append('tanggal_akhir', getValueTanggalAkhir);

        axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];
            let dataExport = [];

            dataExport.push([
                'Laporan Transaksi Penjualan',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]);

            dataExport.push([
                'Kode',
                'Jenis Penjualan',
                'Tanggal',
                'Kode Customer/Consignee',
                'Nama Customer/Consignee',
                'Kode Item',
                'Nama Item',
                'Jumlah',
                'Harga',
                'Total Harga'
            ]);

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index} className={'align-middle'}>
                            <td className='text-center'>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.jenis_jual}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode_customer ?? item.kode_consignee}</td>
                            <td>{item.nama_customer ?? item.nama_consignee}</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{SetNumberFormat(item.jumlah)}</td>
                            <td>{SetPriceFormat(item.harga)}</td>
                            <td>{SetPriceFormat(item.total_harga)}</td>
                            <td className={global.table_action} style={{ display: 'table-cell' }}>
                                <button type='button' id='button-print' className={global.apply} onClick={() => PrintNota(item)}><FaPrint /> Print</button>
                            </td>
                        </tr>
                    );

                    dataExport.push([
                        item.kode,
                        item.jenis_jual,
                        item.tanggal,
                        item.kode_customer ?? item.kode_consignee,
                        item.nama_customer ?? item.nama_consignee,
                        item.kode_item,
                        item.nama_item,
                        SetNumberFormat(item.jumlah),
                        SetPriceFormat(item.harga),
                        SetPriceFormat(item.total_harga)
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

    const PrintNota = (item) => {
        console.log(item)
        setDataPenjualan(item, () => {
            const formData = new FormData();

            formData.append('kode', item.kode);

            axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select-detail.php`, formData, config).then(response => {
                let data = response.data.data;
                setDataDetailPenjualan(data, () => {
                    window.print();
                    setDataPenjualan([]);
                    setDataDetailPenjualan([]);
                });
            }).catch(error => {
                console.log(error);
                setDataPenjualan([]);
                setDataDetailPenjualan([]);
            });
        });
    }

    return (
        <React.Fragment>
            <PrintoutPenjualan 
            alamat={getDataPenjualan?.alamat}
            bayar={getDataPenjualan?.total_harga ?? 0} 
            data={getDataDetailPenjualan} 
            diskon={getDataPenjualan?.diskon ?? 0} 
            kode={getDataPenjualan?.kode} 
            kode_customer={getDataPenjualan?.kode_customer} 
            nama_customer={getDataPenjualan?.nama_customer} 
            kode_consignee={getDataPenjualan?.value} 
            nama_consignee={getDataPenjualan?.value} 
            ongkosKirim={getDataPenjualan?.ongkos_kirim ?? 0} 
            jenis={getDataPenjualan?.jenis_jual?.toLowerCase()} 
            kembalian={(+getDataPenjualan?.total_harga - +getDataPenjualan?.total_bayar) ?? 0} 
            tanggal={getDataPenjualan?.tanggal} 
            totalJual={getDataPenjualan?.total_jual ?? 0} />

            <div className={style.header}>
                <p className={style.title}>Laporan Transaksi Penjualan</p>
                <p className={style.pathname}>Laporan / Laporan Penjualan / Transaksi Penjualan </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <p className={global.title}>Laporan Transaksi Penjualan</p>
                    <div className={`${global.input_group_row} col-6 `}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Jenis Penjualan</p>
                        <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                            { value: 'Semua', label: 'Semua' },
                            { value: 'Tunai', label: 'Tunai' },
                            { value: 'Pesanan', label: 'Pesanan' },
                            { value: 'Konsinyasi', label: 'Konsinyasi' }
                        ]} placeholder={'Select Penjualan...'} styles={CustomSelect} value={getValueJenis} onChange={e => setValueJenis(e)} />
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
                            <p className={global.title}>Daftar Penjualan</p>
                        </div>
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <CSVLink data={getDataExport} filename={`Laporan Transaksi Konsinyasi ${getValueTanggalAwal} - ${getValueTanggalAkhir}`}>
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
                                        <th>Kode Jual</th>
                                        <th>Jenis Jual</th>
                                        <th>Tanggal</th>
                                        <th>Kode Customer/Consignee</th>
                                        <th>Nama Customer/Consignee</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Jumlah</th>
                                        <th>Harga</th>
                                        <th>Total Jual</th>
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