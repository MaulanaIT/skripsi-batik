import React, { useEffect, useState, Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, cx, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';

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

export default function Lap_produk_setengah() {
    const [getDataFilterLaporan, setDataFilterLaporan] = useState([]);
    const [getDataNamaProduk, setDataNamaProduk] = useStateWithCallbackLazy([]);

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    const [getValueFilterLaporan, setValueFilterLaporan] = useState([]);
    const [getValueNama, setValueNama] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));

    useEffect(() => {
        getProduk();

        setDataFilterLaporan([
            { value: 'Tanggal', label: 'Tanggal' },
            { value: 'Nama', label: 'Nama' }
        ])
    }, []);

    const getLaporan = () => {
        axios.get(`${baseURL}/api/laporan/produksi/bahan-setengah-jadi/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    if (getValueFilterLaporan?.value === 'Nama') {
                        if (item.kode_produk === getValueNama?.value) {
                            htmlTableDaftarLaporan.push(
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{item.tanggal}</td>
                                    <td>{item.kode_produk}</td>
                                    <td>{item.nama_produk}</td>
                                    <td>{item.jumlah}</td>
                                    <td>{item.departemen}</td>
                                    <td>{
                                        item.departemen === 'Designer' ? 'Cap/Canting' :
                                            item.departemen === 'Cap/Canting' ? 'Pewarnaan' :
                                                item.departemen === 'Pewarnaan' ? 'Jahit' :
                                                    item.departemen === 'Jahit' && 'Packing'
                                    }</td>
                                </tr>
                            );
                        }
                    } else if (getValueFilterLaporan?.value === 'Tanggal') {
                        if (moment(item.tanggal).valueOf() >= moment(getValueTanggalAwal).valueOf() &&
                            moment(item.tanggal).valueOf() <= moment(getValueTanggalAkhir).valueOf()) {
                            htmlTableDaftarLaporan.push(
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{item.tanggal}</td>
                                    <td>{item.kode_produk}</td>
                                    <td>{item.nama_produk}</td>
                                    <td>{SetNumberFormat(item.jumlah)}</td>
                                    <td>{item.departemen}</td>
                                    <td>{
                                        item.departemen === 'Designer' ? 'Cap/Canting' :
                                            item.departemen === 'Cap/Canting' ? 'Pewarnaan' :
                                                item.departemen === 'Pewarnaan' ? 'Jahit' :
                                                    item.departemen === 'Jahit' && 'Packing'
                                    }</td>
                                </tr>
                            );
                        }
                    }
                });
            }

            setHTMLTableDaftarLaporan(htmlTableDaftarLaporan, () => {
                $(`#table-data`).DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    const getProduk = () => {
        axios.get(`${baseURL}/api/master/inventory/produk/select.php`, config).then(response => {
            let data = response.data.data;

            let dataNamaProduk = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataNamaProduk.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            axios.get(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/select.php`, config).then(responsePesanan => {
                let dataPesanan = responsePesanan.data.data;
    
                if (dataPesanan && dataPesanan.length > 0) {
                    for (const item of dataPesanan) {
                        dataNamaProduk.push({
                            value: item.kode,
                            label: item.nama
                        });
                    }
                }
    
                setDataNamaProduk(dataNamaProduk);
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Laporan Barang Setengah Jadi</p>
                <p className={style.pathname}>Laporan / Laporan Produksi / Laporan Barang Setengah Jadi </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <div className={`${global.input_group_row} col-12`}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Produksi Berdasarkan</p>
                        <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={getDataFilterLaporan} placeholder={'Select Laporan...'} value={getValueFilterLaporan} styles={CustomSelect} onChange={(value) => setValueFilterLaporan(value)} />
                    </div>

                    {getValueFilterLaporan?.value === 'Tanggal' &&
                        <div className={`d-flex`}>
                            <div className={`${global.input_group_row} col-6 pe-2`}>
                                <p className={`${global.title} col-12 col-lg-6 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                                <input type="date" className="col col-lg-4 col-md-3" value={getValueTanggalAwal} onChange={e => setValueTanggalAwal(e.target.value)} />
                            </div>
                            <div className={`${global.input_group_row} col-6 ps-2`}>
                                <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                                <input type="date" className="col col-lg-4 col-md-3" value={getValueTanggalAkhir} onChange={e => setValueTanggalAkhir(e.target.value)} />
                            </div>
                        </div>
                    }

                    {getValueFilterLaporan?.value === 'Nama' &&
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Nama Barang</p>
                            <Select isClearable={true} isSearchable={true} options={getDataNamaProduk} placeholder={'Pilih Barang...'} styles={CustomSelect} className='col-12 col-lg-4' value={getValueNama} onChange={value => setValueNama(value)} />
                        </div>
                    }
                    <div className='d-flex flex-column gap-2 pt-2'>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={getLaporan}>Cek Laporan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                            </div>
                        </div>
                    </div>
                </div>
                {getHTMLTableDaftarLaporan?.length > 0 &&
                    <div className={`${global.card} col-12`}>
                        <div className='d-flex'>
                            <div className='col-10'>
                                <p className={global.title}></p>
                            </div>
                            <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                                <TiExport className='fs-4' />
                            </div>
                        </div>
                        <div className={cx([global.card, global.boxless])}>
                            <p className={`${style.title} text-center w-100 fw-bold`}>LEKSANA BATIK JAYA</p>
                            <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN PERSEDIAAN BARANG SETENGAH JADI</p>
                            {getValueFilterLaporan?.value === 'Nama' &&
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Nama Produk</p>
                                        <input type="text" value={getValueNama?.label} readOnly={true} />
                                    </div>
                                </div>
                            }
                            {getValueFilterLaporan?.value === 'Tanggal' &&
                                <div className={`${bootstrap[`d-flex`]} flex-wrap`}>
                                    <div className={`${global.input_group_row} col-12`}>
                                        <p className={`${global.title} col-4 col-lg-2 pb-2 pb-md-0`}>Tanggal Produksi</p>
                                        <input type="date" className='col-4 col-lg-2' value={getValueTanggalAwal} readOnly={true} />
                                        <p className={`${global.title} col-auto px-2`}>s/d</p>
                                        <input type="date" className='col-4 col-lg-2' value={getValueTanggalAkhir} readOnly={true} />
                                    </div>
                                </div>
                            }
                            <br></br>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Tanggal Produksi</th>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Qty</th>
                                            <th>Dep Asal</th>
                                            <th>Dep Tujuan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarLaporan}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}