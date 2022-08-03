import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { baseURL, CheckInputValidity, config, cx, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/produksi.module.css';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

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
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export default function Permintaanprod() {

    const [getDataProduk, setDataProduk] = useState([]);
    const [getDataSelectKodeProduk, setDataSelectKodeProduk] = useState([]);
    const [getDataSelectNamaProduk, setDataSelectNamaProduk] = useState([]);

    const [getHTMLTableDaftarPermintaan, setHTMLTableDaftarPermintaan] = useStateWithCallbackLazy([]);

    const [getValueKodeProduk, setValueKodeProduk] = useState([]);
    const [getValueNamaProduk, setValueNamaProduk] = useState([]);
    const [getValueJumlah, setValueJumlah] = useState(0);
    const [getValueKodePermintaan, setValueKodePermintaan] = useState('');

    useEffect(() => {
        GetProduk();
        GetPermintaanProduksi();
    }, []);

    const AcceptPermintaan = kode => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/produksi/permintaan-stok/update.php`, formData, config).then(() => {
            HideLoading();

            $(`#table-data`).DataTable().destroy();

            GetPermintaanProduksi();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const DeletePermintaan = kode => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/produksi/permintaan-stok/delete.php`, formData, config).then(() => {
            HideLoading();

            $(`#table-data`).DataTable().destroy();

            GetPermintaanProduksi();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetProduk = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/produk/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectKodeProduk = [];
            let dataSelectNamaProduk = [];

            if (data && data.length > 0) {
                data.forEach(item => {
                    dataSelectKodeProduk.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaProduk.push({
                        value: item.kode,
                        label: item.nama
                    });
                })
            }

            setDataProduk(data);
            setDataSelectKodeProduk(dataSelectKodeProduk);
            setDataSelectNamaProduk(dataSelectNamaProduk);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPermintaanProduksi = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/permintaan-stok/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarPermintaan = [];
            let jabatan = localStorage.getItem('leksana_jabatan').toLowerCase();

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarPermintaan.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_produk}</td>
                            <td>{item.nama_produk}</td>
                            <td>{item.jumlah}</td>
                            <td className={+item.status === 0 ? global.table_action : 'text-center'}>
                                {+item.status === 0 ?
                                    <React.Fragment>
                                        {(jabatan === 'owner' || jabatan === 'super admin') &&
                                            <button type='button' id='button-accept' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => AcceptPermintaan(item.kode)}><FaCheck />Accept</button>
                                        }
                                        <button type='button' id='button-delete' className={global.delete} onClick={() => DeletePermintaan(item.kode)}><FaTrash />Delete</button>
                                    </React.Fragment>
                                    :
                                    <FaCheck />
                                }
                            </td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftarPermintaan(htmlTableDaftarPermintaan, () => {
                $(`#table-data`).DataTable();

                setValueKodePermintaan(GenerateCode('PPS', data));

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertPermintaan = () => {
        if (!CheckInputValidity('form-data') || getValueKodeProduk.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodePermintaan);
        formData.append('kode_produk', getValueKodeProduk.value);
        formData.append('jumlah', getValueJumlah);

        axios.post(`${baseURL}/api/transaksi/produksi/permintaan-stok/insert.php`, formData, config).then(response => {
            setValueKodeProduk([]);
            setValueNamaProduk([]);
            setValueJumlah(0);

            $(`#table-data`).DataTable().destroy();

            GetPermintaanProduksi();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const SelectProduk = (data) => {
        if (data) {
            let valueKode = getDataSelectKodeProduk.find(item => item.value === data?.value);
            let valueNama = getDataSelectNamaProduk.find(item => item.value === data?.value);

            setValueKodeProduk(valueKode);
            setValueNamaProduk(valueNama);
        } else {
            setValueKodeProduk([]);
            setValueNamaProduk([]);
        }
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Permintaan Produksi</p>
            </div>
            {localStorage.getItem('leksana_jabatan').toLowerCase() !== 'owner' &&
                <div className={style.content}>
                    <div className={`col-12 pe-md-2 pb-2 pb-md-0`}>
                        <form id='form-data' className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Permintaan Produksi Stok</p>
                            </div>
                            <div className={`d-flex flex-wrap`}>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Permintaan <span className={global.important}>*</span></p>
                                    <input type="text" id='input-kode-permintaan' name='input-kode-permintaan' value={getValueKodePermintaan} required={true} readOnly={true} />
                                </div>
                                <div className={`${global.input_group} col-6 ps-2`}>
                                    <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                    <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={getDataSelectKodeProduk} placeholder={'Select Kode...'} styles={CustomSelect} value={getValueKodeProduk} onChange={SelectProduk} />
                                </div>
                            </div>
                            <div className={`d-flex flex-wrap`}>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                    <Select id='select-nama-produk' name='select-nama-produk' isClearable={true} isSearchable={true} options={getDataSelectNamaProduk} placeholder={'Select Nama...'} styles={CustomSelect} value={getValueNamaProduk} onChange={SelectProduk} />
                                </div>
                                <div className={`${global.input_group} col-6 ps-2`}>
                                    <p className={global.title}>Jumlah Produksi <span className={global.important}>*</span></p>
                                    <input type="text" id='input-jumlah-produksi' name='input-jumlah-produksi' value={getValueJumlah} onChange={e => setValueJumlah(e.target.value)} required={true} />
                                </div>
                            </div>
                            <button type='button' className={global.button} onClick={InsertPermintaan}><MdAdd /> Simpan</button>
                        </form>
                    </div>
                </div>
            }
            <div className={style.content}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Permintaan Produksi Stok</p>
                    </div>
                    <div className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className="align-middle text-center text-nowrap">
                                <tr>
                                    <th>No.</th>
                                    <th>Kode Permintaan</th>
                                    <th>Kode Produk</th>
                                    <th>Nama Produk</th>
                                    <th>Jumlah Produksi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarPermintaan}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}