import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL, CheckInputValidity, config, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

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

export default function Produk() {

    const [getDataProduk, setDataProduk] = useState([]);

    const [getValueKodeProduk, setValueKodeProduk] = useState('');
    const [getValueNamaProduk, setValueNamaProduk] = useState('');
    const [getValueJumlahProduk, setValueJumlahProduk] = useState(0);
    const [getValueStokMinimalProduk, setValueStokMinimalProduk] = useState(0);
    const [getValueHppProduk, setValueHppProduk] = useState(0);
    const [getValueHargaJualProduk, setValueHargaJualProduk] = useState(0);

    const [getSelectedJenisProduk, setSelectedJenisProduk] = useState('');
    const [getSelectedWarnaProduk, setSelectedWarnaProduk] = useState('');

    useEffect(() => {
        GetProduk();
    }, []);

    const GetProduk = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/produk/select.php`, config).then(response => {
            let data = response.data.data;
            
            setValueKodeProduk(GenerateCode('PROD', data));

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertProduk = () => {
        if (!CheckInputValidity('form-data')) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeProduk);
        formData.append('nama', getValueNamaProduk);
        formData.append('jenis', getSelectedJenisProduk.value);
        formData.append('warna', getSelectedWarnaProduk.value);
        formData.append('jumlah', getValueJumlahProduk);
        formData.append('stok_minimal', getValueStokMinimalProduk);
        formData.append('hpp', getValueHppProduk);
        formData.append('harga_jual', getValueHargaJualProduk);

        axios.post(`${baseURL}/api/master/inventory/produk/insert.php`, formData, config).then(() => {
            window.location.href = '/master/inventory/daftar-produk';
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
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
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Produk <span className={global.important}>*</span></p>
                        <input type="text" className="col col-lg-2 col-md-3" value={getValueKodeProduk} maxLength={10} readOnly={true} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Produk <span className={global.important}>*</span></p>
                        <input type="text" className="col-12 col-md-8 col-lg-6" value={getValueNamaProduk} maxLength={50} onChange={e => setValueNamaProduk(e.target.value)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jenis Produk <span className={global.important}>*</span></p>
                        <Select id='select-jenis-produk' name='select-jenis-produk' value={getSelectedJenisProduk} isClearable={true} isSearchable={true} options={[
                            { value: 'Cap', label: 'Cap' },
                            { value: 'Tulis', label: 'Tulis' },
                            { value: 'Kombinasi', label: 'Kombinasi' },
                        ]} placeholder={'Pilih Jenis Produk...'} styles={CustomSelect} onChange={e => setSelectedJenisProduk(e)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jenis Warna <span className={global.important}>*</span></p>
                        <Select id='select-warna-produk' name='select-warna-produk' value={getSelectedWarnaProduk} isClearable={true} isSearchable={true} options={[
                            { value: 'Alami', label: 'Alami' },
                            { value: 'Sintetis', label: 'Sintetis' }
                        ]} placeholder={'Pilih Jenis Warna...'} styles={CustomSelect} onChange={e => setSelectedWarnaProduk(e)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah <span className={global.important}>*</span></p>
                        <input type="text" className="col col-lg-2 col-md-3" value={getValueJumlahProduk} onInput={InputFormatNumber} onChange={e => setValueJumlahProduk(e.target.value)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Stok Minimal <span className={global.important}>*</span></p>
                        <input type="text" className="col col-lg-2 col-md-3" value={getValueStokMinimalProduk} onInput={InputFormatNumber} onChange={e => setValueStokMinimalProduk(e.target.value)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>HPP <span className={global.important}>*</span></p>
                        <input type="text" className="col col-lg-2 col-md-3" value={getValueHppProduk} onInput={InputFormatNumber} onChange={e => setValueHppProduk(e.target.value)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga Jual <span className={global.important}>*</span></p>
                        <input type="text" className="col col-lg-2 col-md-3" value={getValueHargaJualProduk} onInput={InputFormatNumber} onChange={e => setValueHargaJualProduk(e.target.value)} required={true} />
                    </div>
                    <button type='button' className={global.button} onClick={   InsertProduk}><MdAdd /> Simpan</button>
                </form>
            </div>
        </React.Fragment>
    )
}