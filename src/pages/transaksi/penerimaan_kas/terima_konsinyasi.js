import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import { baseURL, CheckInputValidity, config, GenerateCode, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

// Import Component
import PrintoutUangMuka from './printout_uang_muka';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/uang_muka_pesanan.module.css';

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

export default function terima_konsinyasi() {

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Terima Piutang</p>
                <p className={style.pathname}>Transaksi / Penerimaan Kas / Terima Piutang</p>
            </div>
            <form id='form-data' className={style.content}>
                <div className={`col-12`}>
                    <div className={`${global.card}`}>
                        <p className={global.title}>Input Penerimaan Hasil Konsinyasi</p>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Kode Kas Masuk <span className={global.important}>*</span></p>
                                <input type="text" id='input-kode-kas-masuk' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-3 px-2`}>
                                <p className={global.title}>Kode Jual <span className={global.important}>*</span></p>
                                <input type="text" id='input-kode-jual' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-4 ps-2`}>
                                <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                <input type="date" id='input-tanggal' required={true} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-2 pe-2`}>
                                <p className={global.title}>Kode Consignee <span className={global.important}>*</span></p>
                                <input type="text" id='input-kode-customer' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-4 px-2`}>
                                <p className={global.title}>Nama Consignee <span className={global.important}>*</span></p>
                                <input type="text" id='input-nama-customer' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-2 px-2`}>
                                <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                <Select id='select-kode-produk' isClearable={true} isSearchable={true} placeholder={'Select Kode...'} styles={CustomSelect} />
                            </div>
                            <div className={`${global.input_group} col-4 ps-2`}>
                                <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                <Select id='select-nama-produk' isClearable={true} isSearchable={true} placeholder={'Select Nama...'} styles={CustomSelect} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-2 pe-2`}>
                                <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                <input type="text" id='input-jumlah' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-2 px-2`}>
                                <p className={global.title}>Jumlah Terjual <span className={global.important}>*</span></p>
                                <input type="text" id='input-jumlah-terjual' required={true} />
                            </div>
                            <div className={`${global.input_group} col-2 px-2`}>
                                <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                <input type="text" id='input-harga' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-2 px-2`}>
                                <p className={global.title}>Total Harga <span className={global.important}>*</span></p>
                                <input type="text" id='input-total-harga' required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-2 px-2`}>
                                <p className={global.title}>HPP</p>
                                <input type="text" id='input-hpp' readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-2 ps-2`}>
                                <p className={global.title}>Total HPP</p>
                                <input type="text" id='input-total-hpp' readOnly={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12`}>
                    <div className={global.card}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Detail Konsinyasi</p>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Produk</td>
                                        <td>Nama Produk</td>
                                        <td>Jumlah</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                        <td>HPP</td>
                                        <td>Total HPP</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Jual <span className={global.important}>*</span></p>
                            <input type="text" id='input-detail-total-jual' className={`col-4`} required={true} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Harga Pokok Penjualan</p>
                            <input type="text" id='input-detail-total-jual' className={`col-4`} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Diskon</p>
                            <input type="text" id='input-detail-diskon' className={'col-4'} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Terima Konsinyasi <span className={global.important}>*</span></p>
                            <input type="text" id='input-detail-total-harga' className={`col-4`} required={true} readOnly={true} />
                            <div className='col-5 ps-2'>
                                <Select id='select-kode-akun' name='select-kode-akun' className={`col-5`} isClearable={true} isSearchable={true} placeholder={'Select Akun...'} styles={CustomSelect} />
                            </div>
                        </div>
                        <div className='d-flex'>
                        
                                <div className={`${global.input_group}`}>
                                    <p>Upload File Transfer</p>
                                    <input type="file" accept='.pdf' id='input-file-transfer' name='input-file-transfer' />
                                </div>
                            
                        </div>
                            <div className='d-flex'>
                                <div className='col-6 pe-2'>
                                    <button type='button' className={`${global.button} w-100`}>Simpan</button>
                                </div>
                                <div className='col-6 ps-2'>
                                    <Link to={'/transaksi/penjualan/daftar-konsinyasi'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</Link>
                                </div>
                            </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}
