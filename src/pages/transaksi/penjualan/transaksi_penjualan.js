import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/transaksi_penjualan.module.css';

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

export class transaksi_penjualan extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Transaksi Penjualan</p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                        <p className={global.title}>Input Penjualan</p>
                        <div className={global.input_group}>
                            <p className={global.title}>Jenis Transaksi</p>
                            <Select isClearable={true} isSearchable={true} options={[
                                { value: 'Tunai', label: 'Tunai' },
                                { value: 'Konsinyasi', label: 'Konsinyasi' }
                            ]} placeholder={'Select Transaksi...'} styles={CustomSelect} />
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-6']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Kode Jual</p>
                                <input type="text" id='input-kode-jual' name='input-kode-jual' readOnly />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-6']} ${bootstrap['ps-2']}`}>
                                <p className={global.title}>Tanggal</p>
                                <input type="date" id='input-tanggal-jual' name='input-tanggal-jual' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-5']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Kode Consignee</p>
                                <Select id='select-kode-consignee' name='select-kode-consignee' isClearable={true} isSearchable={true} options={[
                                    { value: 'CN0001', label: 'CN0001' },
                                    { value: 'CN0002', label: 'CN0002' }
                                ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-7']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Nama Consignee</p>
                                <input type="text" id='input-nama-consignee' name='input-nama-consignee' placeholder='Nama Consignee...' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-5']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Kode Produk</p>
                                <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                    { value: 'PROD0001', label: 'PROD0001' },
                                    { value: 'PROD0002', label: 'PROD0002' }
                                ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-7']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Nama Produk</p>
                                <input type="text" id='input-nama-produk' name='input-nama-produk' placeholder='Nama Produk...' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Jumlah</p>
                                <input type="text" id='input-jumlah-jual' name='input-jumlah-jual' readOnly />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['px-2']}`}>
                                <p className={global.title}>Harga</p>
                                <input type="text" id='input-harga-jual' name='input-harga-jual' />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['ps-2']}`}>
                                <p className={global.title}>Total Harga</p>
                                <input type="text" id='input-total-harga-jual' name='input-total-harga-jual' />
                            </div>
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Tambah</button>
                    </div>
                    <div className={global.card}></div>
                </div>
            </>
        )
    }
}

export default transaksi_penjualan