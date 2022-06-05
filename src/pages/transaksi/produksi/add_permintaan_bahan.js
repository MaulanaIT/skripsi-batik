import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import {FiXCircle} from 'react-icons/fi';
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

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


export class add_permintaan_bahan extends Component {
    render() {
        return (
            <>
            <div id='add_permintaan_bahan' className={`${global.loading_background} d-none`}>

                    <div className={style.content}>
                        <div className={global.card}>
                            <p className={global.title}>Tambah Permintaan Bahan</p>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Kode Permintaan Bahan</p>
                                        <input type="text" id='input-kode-permintaan-bahan' name='input-kode-permintaan-bahan' readOnly />
                                    </div>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Kode Produksi</p>
                                        <input type="text" id='input-kode-produksi' name='input-kode-produksi' />
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-12 pe-2`}>
                                        <p className={global.title}>Nama Produksi</p>
                                        <input type="text" id='input-nama-produksi' name='input-nama-produksi' readOnly />
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-12 pe-2`}>
                                    <p className={global.title}>Jenis Bahan</p>
                                        <Select id='select-jenis-bahan' name='select-jenis-bahan' isClearable={true} isSearchable={true} options={[
                                            { value: 'Bahan Baku', label: 'Bahan Baku' },
                                            { value: 'Bahan Penolong', label: 'Bahan Penolong' }
                                        ]} placeholder={'Select Bahan...'} styles={CustomSelect} />
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-12 pe-2`}>
                                        <p className={global.title}>Nama Bahan</p>
                                        <input type="text" id='input-nama-bahan' name='input-nama-bahan'/>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Jumlah Kebutuhan</p>
                                        <input type="text" id='input-jumlah-kebutuhan' name='input-jumlah-kebutuhan'/>
                                    </div>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Max Quantity</p>
                                        <input type="text" id='input-jumlah-maksimal' name='input-jumlah-maksimal' readOnly/>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-12 pe-2`}>
                                        <button type='button' className={`${global.button} fs-10`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd />Tambah Permintaan Bahan</button>
                                    </div>
                                </div>
                                    
                                <div className={`table-responsive`}>
                                    <table id='table-data-bahan-baku-diminta' className={`table w-100 table-bordered`}>
                                        <thead className='text-nowrap'>
                                            <tr>
                                                <td>No.</td>
                                                <td>Jenis Bahan</td>
                                                <td>Nama Bahan</td>
                                                <td>Jumlah</td>
                                                <td>Aksi</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>

                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-12 pe-2`}>
                                        <button type='button' className={`${global.button} fs-10`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd />Simpan Permintaan Bahan</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                
            </div>
            </>
        )
    }
}

export default add_permintaan_bahan