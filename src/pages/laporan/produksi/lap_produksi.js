import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';

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
        color: 'rgba(255, 255, 255, 0.6)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export class laporan_produksi extends Component {

render() {
    return (
        <>
        <div className={style.header}>
                    <p className={style.title}>Laporan Produksi</p>
                    <p className={style.pathname}>Laporan / Produksi / Laporan Produksi</p>
        </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-2`}>Tanggal</p>
                        <div>
                        <input type="date" className={global.input1} id='input-tanggal-awal' name='input-tanggal-awal'/>
                        </div>
                        <div>
                        <p className={`${global.title} col-auto px-3`}>sampai</p>
                        </div>
                        <div>
                        <input type="date" className={global.input1} id='input-tanggal-akhir' name='input-tanggal-akhir'/>
                        </div>
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-2`}>Produksi Berdasarkan</p>
                            <Select id='select-produksi-berdasarkan' name='select-produksi-berdasarkan' isClearable={true} isSearchable={true} options={[
                                { value: 'Pesanan', label: 'Pesanan' },
                                { value: 'Stok', label: 'Stok' }
                                ]} placeholder={'Select Produksi...'} styles={CustomSelect} />
                    </div>
                    
                <div className='d-flex'>
                    <div className='col-6 pe-3'>
                        <button type='button' className={`${global.button} w-100`}>Lihat</button>
                    </div>
                    <div className='col-6 ps-3'>
                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Cetak</button>
                    </div>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                    <p className={`${style.title} text-center w-100 fw-bold`} style={{fontSize: 18}}>LEKSANA BATIK JAYA</p>
                    <p className={`${style.title} text-center w-100`} style={{fontSize: 17}}>LAPORAN PRODUKSI</p>
                    
                    <div>
                        <p className={style.title}>Tanggal</p>
                        <div className={`d-flex`}>
                            <div className={'col-3'}>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' className={'w-100'} readOnly />
                            </div>
                            <div className={'d-flex align-items-center px-3'}>
                            <p className={global.title}> sampai </p>
                            </div>
                            <div className={'col-3'}>
                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir' className={'w-100'} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table table-bordered table-striped table-hover w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>Tanggal Produksi</td>
                                    <td>Nama Pesanan</td>
                                    <td>Nama Customer</td>
                                    <td>Jumlah</td>
                                    <td>Lama Produksi</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
}

export default laporan_produksi
