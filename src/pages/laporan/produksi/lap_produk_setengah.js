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

export class lap_produk_setengah extends Component {

    state = {
        tabSelected: 0
    }

    componentDidMount() {
        $('#table-data-bahan-baku').DataTable();
    }

    SelectProduksi = (value) => {
        this.setState({ pilihProduksi: value ? value.value : '' });
    }

    render() {
        return (
            <>
            <div className={style.header}>
                <p className={style.title}>Laporan Barang Setengah Jadi</p>
                <p className={style.pathname}>Laporan / Laporan Produksi / Laporan Barang Setengah Jadi </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <div className={`${global.input_group_row} col-6 `}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Produksi Berdasarkan</p>
                        <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                            { value: 'Tanggal', label: 'Tanggal' },
                            { value: 'Nama', label: 'Nama' }
                        ]} placeholder={'Select Produksi...'} styles={CustomSelect} onChange={(value) => this.SelectProduksi(value)} />
                    </div>
                    
                    {this.state.pilihProduksi === 'Tanggal' ?
                    <>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' className="col col-lg-4 col-md-3" />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir'/>
                        </div>
                    </div>
                    </>
                    : null}
                    
                {this.state.pilihProduksi === 'Nama' ?
                <>
                     <div className={`${global.input_group_row} col-6`}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Nama Barang</p>
                        <Select isClearable={true} isSearchable={true} placeholder={'Pilih Barang...'} styles={CustomSelect} className='col-7' />
                    </div>
                </>
                :
                <>
                </>
                }
                    <div className='d-flex flex-column gap-2 pt-2'>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`}>Cek Laporan</button>
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
                            <p className={global.title}></p>
                        </div>
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <TiExport className='fs-4' />
                        </div>
                    </div>
                    <div className={cx([global.card, global.boxless])}>
                        <p className={`${style.title} text-center w-100 fw-bold`}>LEKSANA BATIK JAYA</p>
                        <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN PERSEDIAAN BARANG SETENGAH JADI</p>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Nama Produk</p>
                                <input type="text" id='input-nama-produk' name='input-nama-produk' readOnly={true} />
                            </div>
                        </div>
                        <div className={`${bootstrap[`d-flex`]}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Produksi</p>
                                <input type="date" id='input-tanggal-awal-produksi' name='input-tanggal-awal-produksi' readOnly={true} />
                                <p className={`${global.title} col-1 ps-2`}>s/d</p>
                                <input type="date" id='input-tanggal-akhir-produksi' name='input-tanggal-akhir-produksi' readOnly={true} />
                            </div>
                        </div>
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
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default lap_produk_setengah