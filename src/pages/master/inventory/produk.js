import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL, CheckInputValidity, config, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
        backgroundColor: 'rgba(0, 0, 0, 3)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
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

    state = {
        dataProduk: 0
    }

    InsertProduk = () => {
        if (!CheckInputValidity('form-data')) return;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-produk'));
        formData.append('nama', GetValue('input-nama-produk'));
        formData.append('jenis', GetValue('input-jenis-produk'));
        formData.append('warna', GetValue('input-warna-produk'));
        formData.append('jumlah', GetValue('input-jumlah-produk'));
        formData.append('stok_minimal', GetValue('input-stok-minimal-produk'));
        formData.append('hpp', GetValue('input-hpp-produk'));
        formData.append('harga_jual', GetValue('input-harga-jual-produk'));

        axios.post(`${baseURL}/api/master/inventory/produk/insert.php`, formData, config).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Produk</p>
                    <p className={style.pathname}>Master / Inventory / Produk </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Tambah Produk</p>
                            <Link to={'/master/inventory/daftar-produk'} className={`${global.button}`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }}>Kembali</Link>
                        </div>
                        <p className={global.title}>Tambah Produk</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Produk</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-produk' name='input-kode-produk' maxLength={10} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Produk</p>
                            <input type="text" className="col-12 col-md-8 col-lg-6" id='input-nama-produk' name='input-nama-produk' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jenis Produk</p>
                            <Select id='select-jenis-produk' name='select-jenis-produk' isClearable={true} isSearchable={true} options={[
                                { value: 'Cap', label: 'Cap' },
                                { value: 'Tulis', label: 'Tulis' },
                                { value: 'Kombinasi', label: 'Kombinasi' },
                            ]} placeholder={'Pilih Jenis Produk...'} styles={CustomSelect} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jenis Warna</p>
                            <Select id='select-warna-produk' name='select-warna-produk' isClearable={true} isSearchable={true} options={[
                                { value: 'Alami', label: 'Alami' },
                                { value: 'Sintetis', label: 'Sintetis' }
                            ]} placeholder={'Pilih Jenis Warna...'} styles={CustomSelect} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-jumlah-produk' name='input-jumlah-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Stok Minimal</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-stok-minimal-produk' name='input-stok-minimal-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>HPP</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-hpp-produk' name='input-hpp-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga Jual</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-harga-jual-produk' name='input-harga-jual-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertProduk}><MdAdd /> Simpan</button>
                        </form>
                    </div>
            </>
        )
    }
}

export default produk