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

export class kartu_persediaan_bp extends Component {

render() {
    return (
        <>
        <div className={style.header}>
                    <p className={style.title}>Kartu Produksi</p>
                    <p className={style.pathname}>Laporan / Produksi / Kartu Persediaan Bahan Baku</p>
        </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.input_group_row}col-6`}>
                        <p className={global.title}>Berdasarkan</p>
                            <Select isClearable={true} isSearchable={true} options={[
                                { value: 'Tanggal', label: 'Tanggal' },
                                { value: 'Bahan Penolong', label: 'Bahan Penolong' }
                            ]} placeholder={'Pilih Kartu...'} styles={CustomSelect} onChange={(value) => this.SelectKartu(value)} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-2`}>Tanggal</p>
                        <input type="date" className={global.input1} id='input-tanggal-awal' name='input-tanggal-awal'/>
                        <p className={`${global.title} col-1`}></p>
                        <input type="date" className={global.input1} id='input-tanggal-akhir' name='input-tanggal-akhir'/>
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-2`}>Nama Bahan Penolong</p>
                        <input type="text" className={global.input1} id='input-nama-bahan-penolong' name='input-nama-bahan-penolong'/>
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
                    <p className={style.title}>Leksana Batik Jaya</p>
                    <p className={style.title}>Kartu Persediaan Bahan Penolong</p>
                    
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Nama Bahan</p>
                            <input type="text" id='input-nama-bahan' name='input-nama-bahan' readOnly />
                        </div>
                        <div className={`${global.input_group} col-3 ps-2`}>
                            <p className={global.title}>Jenis Bahan</p>
                            <input type="text" id='input-jenis-bahan' name='input-jenis-bahan' />
                        </div>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table table-striped table-hover w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>Tanggal</td>
                                    <td>Keterangan</td>
                                    "persediaan masuk"
                                    <td>Unit</td>
                                    <td>Harga</td>
                                    <td>Jumlah</td>
                                    "persediaan keluar"
                                    <td>Unit</td>
                                    <td>Harga</td>
                                    <td>Jumlah</td>
                                    "saldo"
                                    <td>Unit</td>
                                    <td>Harga</td>
                                    <td>Jumlah</td>
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

export default kartu_persediaan_bp
