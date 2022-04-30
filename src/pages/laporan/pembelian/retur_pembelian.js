import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/pembelian/retur_pembelian.module.css';
import Select from 'react-select';


const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
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
export class retur_pembelian extends Component {
    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Laporan Retur Pembelian</p>
                    <p className={style.pathname}>Laporan / Laporan Pembelian / Transaksi Pembelian </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                        <p className={global.title}>Laporan Retur Pembelian</p>
                        <div className={`${global.input_group_row} col-6 `}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Jenis Retur</p>
                            <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                                { value: 'Semua', label: 'Semua' },
                                { value: 'Bahan', label: 'Bahan' },
                                { value: 'Alat', label: 'Alat' }
                            ]} placeholder={'Select Retur...'} styles={CustomSelect} />
                        </div>
                        <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir' />
                        </div>
                        </div>
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
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Retur Pembelian</p>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table table-striped table-hover w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Retur</th>
                                            <th>Tanggal</th>
                                            <th>Jenis Retur</th>
                                            <th>Kode Supplier</th>
                                            <th>Nama Supplier</th>
                                            <th>Total Retur</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default retur_pembelian