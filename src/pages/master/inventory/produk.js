import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { baseURL, CheckInputValidity, config, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';
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
                    <div className={global.card}>
                        <p className={global.title}>Tambah Produk</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Produk</p>
                            <input type="text" className={global.input1} id='input-kode-produk' name='input-kode-produk' maxLength={10} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Produk</p>
                            <input type="text" className={global.input2} id='input-nama-produk' name='input-nama-produk' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Jenis Produk</p>
                            <Select id='select-jenis-produk' name='select-jenis-produk' isClearable={true} isSearchable={true} options={[
                                { value: 'Cap', label: 'Cap' },
                                { value: 'Tulis', label: 'Tulis' },
                                { value: 'Kombinasi', label: 'Kombinasi' },
                            ]} placeholder={'Pilih Jenis Produk...'} styles={CustomSelect} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Jenis Warna</p>
                            <Select id='select-warna-produk' name='select-warna-produk' isClearable={true} isSearchable={true} options={[
                                { value: 'Alami', label: 'Alami' },
                                { value: 'Sintetis', label: 'Sintetis' }
                            ]} placeholder={'Pilih Jenis Warna...'} styles={CustomSelect} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Jumlah</p>
                            <input type="text" className={global.input3} id='input-jumlah-produk' name='input-jumlah-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Stok Minimal</p>
                            <input type="text" className={global.input3} id='input-stok-minimal-produk' name='input-stok-minimal-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>HPP</p>
                            <input type="text" className={global.input3} id='input-hpp-produk' name='input-hpp-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Harga Jual</p>
                            <input type="text" className={global.input3} id='input-harga-jual-produk' name='input-harga-jual-produk' onInput={InputFormatNumber} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertProduk}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default produk