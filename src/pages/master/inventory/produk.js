import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import global from '../../../css/master.module.css';
import style from '../../../css/master.module.css';

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

export class produk extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Produk</p>
                    <p className={style.pathname}>Master / Inventory / Produk </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Produk</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Produk</p>
                            <input type="text" className={global.input1} id='input-kode-produk' name='input-kode-produk' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Produk</p>
                            <input type="text" className={global.input2} id='input-nama-produk' name='input-nama-produk' />
                        </div>
                        <div className={`${global.input_group}`}>
                                            <p className={`${global.title} col-3`}>Jenis Produk</p>
                                            <Select id='select-jenis-produk' name='select-jenis-produk' isClearable={true} isSearchable={true} options={[
                                                { value: 'Cap', label: 'Cap' },
                                                { value: 'Tulis', label: 'Tulis' },
                                                { value: 'Kombinasi', label: 'Kombinasi' },
                                            ]} placeholder={'Pilih Jenis Produk...'} styles={CustomSelect} />
                        </div>
                        <div className={`${global.input_group}`}>
                                            <p className={`${global.title} col-3`}>Jenis Warna</p>
                                            <Select id='select-jenis-warna' name='select-jenis-warna' isClearable={true} isSearchable={true} options={[
                                                { value: 'Alami', label: 'Alami' },
                                                { value: 'Sintetis', label: 'Sintetis' }
                                            ]} placeholder={'Pilih Jenis Warna...'} styles={CustomSelect} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Jumlah</p>
                            <input type="text" className={global.input3} id='input-jumlah' name='input-jumlah' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Stok Minimal</p>
                            <input type="text" className={global.input3} id='input-stok-minimal' name='input-stok-minimal' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>HPP</p>
                            <input type="text" className={global.input3} id='input-hpp' name='input-hpp' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Harga Jual</p>
                            <input type="text" className={global.input3} id='input-harga-jual' name='input-harga-jual' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default produk