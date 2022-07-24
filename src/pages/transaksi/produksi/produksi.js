import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/produksi.module.css';

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

export default function Produksi() {

    const [getDataPermintaan, setDataPermintaan] = useState([]);
    const [getDataPesanan, setDataPesanan] = useState([]);
    const [getDataSelectKodePermintaan, setDataSelectKodePermintaan] = useState(null);
    const [getDataSelectKodePesanan, setDataSelectKodePesanan] = useState(null);

    const [getValueDeskripsi, setValueDeskripsi] = useState('');
    const [getValueStatus, setValueStatus] = useState([]);
    const [getValueLamaProduksi, setValueLamaProduksi] = useState(0);
    const [getValueKodeCustomer, setValueKodeCustomer] = useState('');
    const [getValueKodePesanan, setValueKodePesanan] = useState(null);
    const [getValueKodePermintaan, setValueKodePermintaan] = useState(null);
    const [getValueKodeProduksi, setValueKodeProduksi] = useState('');
    const [getValueKodeProduk, setValueKodeProduk] = useState('');
    const [getValueNamaCustomer, setValueNamaCustomer] = useState('');
    const [getValueNamaPesanan, setValueNamaPesanan] = useState('');
    const [getValueNamaProduk, setValueNamaProduk] = useState('');
    const [getValueJumlah, setValueJumlah] = useState(0);
    const [getValueTanggal, setValueTanggal] = useState('');
    const [getValueTanggalPesanan, setValueTanggalPesanan] = useState('');
    const [getValueJenisProduksi, setValueJenisProduksi] = useState(null);

    useEffect(() => {
        GetPermintaanProduksi();
        GetPesananProduksi();

        setValueTanggal(moment().format('YYYY-MM-DD'));
    }, []);

    useEffect(() => {
        if (getValueJenisProduksi) GetPerencanaanProduksi();
    }, [getValueJenisProduksi]);

    useEffect(() => {
        if (getValueKodePermintaan) {
            let data = getDataPermintaan.find(item => item.kode === getValueKodePermintaan.value);

            setValueKodeProduk(data.kode_produk);
            setValueNamaProduk(data.nama_produk);
            setValueJumlah(data.jumlah);
        } else {
            setValueKodeProduk('');
            setValueNamaProduk('');
            setValueJumlah(0);
        }
    }, [getValueKodePermintaan]);

    useEffect(() => {
        if (getValueKodePesanan) {
            let data = getDataPesanan.find(item => item.kode === getValueKodePesanan.value);

            setValueTanggalPesanan(data.tanggal);
            setValueKodeCustomer(data.kode_customer);
            setValueNamaCustomer(data.nama_customer);
            setValueNamaPesanan(data.nama);
            setValueJumlah(data.jumlah);
            setValueDeskripsi(data.deskripsi);
        } else {
            setValueTanggalPesanan('');
            setValueKodeCustomer('');
            setValueNamaCustomer('');
            setValueNamaPesanan('');
            setValueJumlah(0);
            setValueDeskripsi('');
        }
    }, [getValueKodePesanan]);

    const GetPermintaanProduksi = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/permintaan-stok/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectKodePermintaan = [];

            if (data && data.length > 0) {
                data.forEach(item => {
                    dataSelectKodePermintaan.push({
                        value: item.kode,
                        label: item.kode
                    });
                })
            }

            setDataPermintaan(data);
            setDataSelectKodePermintaan(dataSelectKodePermintaan);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPesananProduksi = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectKodePesanan = [];

            if (data && data.length > 0) {
                data.forEach(item => {
                    dataSelectKodePesanan.push({
                        value: item.kode,
                        label: item.kode
                    });
                })
            }

            setDataPesanan(data);
            setDataSelectKodePesanan(dataSelectKodePesanan);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPerencanaanProduksi = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_produksi', getValueJenisProduksi.value.toLowerCase());

        axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/select.php`, formData, config).then(response => {
            let data = response.data.data;

            setValueKodeProduksi(GenerateCode(getValueJenisProduksi?.value === 'Stok' ? 'PS' : 'PP', data));

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertProduksi = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeProduksi);
        formData.append('tanggal', getValueTanggal);
        formData.append('jumlah', getValueJumlah);
        formData.append('lama', getValueLamaProduksi);
        formData.append('status', getValueStatus.value);
        formData.append('jenis_produksi', getValueJenisProduksi.value.toLowerCase());

        if (getValueJenisProduksi.value === 'Stok') {
            formData.append('kode_permintaan', getValueKodePermintaan.value);
            formData.append('kode_produk', getValueKodeProduk);
        } else if (getValueJenisProduksi.value === 'Pesanan') {
            formData.append('kode_pesanan', getValueKodePesanan.value);
            formData.append('tanggal_pesan', getValueTanggalPesanan);
            formData.append('kode_customer', getValueKodeCustomer);
            formData.append('deskripsi', getValueDeskripsi);
        }

        axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/insert.php`, formData, config).then(() => {
            window.location.href = '/transaksi/produksi/daftar-produksi';
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Perencanaan Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Perencanaan Produksi</p>
            </div>
            <div className={style.content}>
                <div className={`col-12 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.card}`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Input Produksi</p>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}>Pilih Produksi</p>
                            <Select isClearable={true} isSearchable={true} options={[
                                { value: 'Stok', label: 'Stok' },
                                { value: 'Pesanan', label: 'Pesanan' }
                            ]} placeholder={'Select Produksi...'} value={getValueJenisProduksi} styles={CustomSelect} onChange={e => setValueJenisProduksi(e)} />
                        </div>
                        <div className={`d-flex flex-wrap`}>
                            {getValueJenisProduksi?.value === 'Pesanan' ?
                                <React.Fragment>
                                    <div className={`${global.input_group} col-6 mb-2 pe-2`}>
                                        <p className={global.title}>Kode Pesanan</p>
                                        <Select id='select-kode-pesanan' name='select-kode-pesanan' isClearable={true} isSearchable={true} options={getDataSelectKodePesanan} placeholder={'Select Kode...'} value={getValueKodePesanan} styles={CustomSelect} onChange={e => setValueKodePesanan(e)} />
                                    </div>
                                    <div className={`${global.input_group} col-6 mb-2 ps-2`}>
                                        <p className={global.title}>Tanggal Pesan</p>
                                        <input type="date" id='input-tanggal-pesan' name='input-tanggal-pesan' value={getValueTanggalPesanan} readOnly={true} />
                                    </div>
                                </React.Fragment>
                                :
                                getValueJenisProduksi?.value === 'Stok' &&
                                <React.Fragment>
                                    <div className={`${global.input_group} col-6 mb-2`}>
                                        <p className={global.title}>Kode Permintaan</p>
                                        <Select id='select-kode-permintaan' name='select-kode-permintaan' isClearable={true} isSearchable={true} options={getDataSelectKodePermintaan} placeholder={'Select Kode...'} value={getValueKodePermintaan} styles={CustomSelect} onChange={e => setValueKodePermintaan(e)} />
                                    </div>
                                </React.Fragment>
                            }
                            <div className={`d-flex flex-wrap w-100`}>
                                {getValueJenisProduksi &&
                                    <React.Fragment>
                                        <div className={`${global.input_group} col-6 mb-2 pe-2`}>
                                            <p className={global.title}>Kode Produksi</p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={getValueKodeProduksi} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-6 mb-2 ps-2`}>
                                            <p className={global.title}>Tanggal Produksi</p>
                                            <input type="date" id='input-tanggal-produksi' name='input-tanggal-produksi' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} />
                                        </div>
                                        {getValueJenisProduksi?.value === 'Pesanan' &&
                                            <React.Fragment>
                                                <div className={`${global.input_group} col-6 mb-2 pe-2`}>
                                                    <p className={global.title}>Nama Customer</p>
                                                    <input type="text" id='input-nama-customer' name='input-nama-customer' value={getValueNamaCustomer} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-6 mb-2 ps-2`}>
                                                    <p className={global.title}>Nama Pesanan</p>
                                                    <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' value={getValueNamaPesanan} readOnly={true} />
                                                </div>
                                            </React.Fragment>
                                        }
                                        {getValueJenisProduksi?.value === 'Stok' &&
                                            <React.Fragment>
                                                <div className={`${global.input_group} col-6 mb-2 pe-2`}>
                                                    <p className={global.title}>Kode Produk</p>
                                                    <input type="text" id='input-kode-produk' name='input-kode-produk' value={getValueKodeProduk} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-6 mb-2 ps-2`}>
                                                    <p className={global.title}>Nama Produk</p>
                                                    <input type="text" id='input-nama-produk' name='input-nama-produk' value={getValueNamaProduk} readOnly={true} />
                                                </div>
                                            </React.Fragment>
                                        }
                                        <div className={`${global.input_group} col-6 mb-2 pe-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='input-jumlah' name='input-jumlah' value={getValueJumlah} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-6 mb-2 ps-2`}>
                                            <p className={global.title}>Lama Produksi</p>
                                            <input type="text" id='input-lama-produksi' name='input-lama-produksi' value={getValueLamaProduksi} onChange={e => setValueLamaProduksi(e.target.value)} />
                                        </div>
                                    </React.Fragment>
                                }

                                {getValueJenisProduksi?.value === 'Pesanan' ?
                                    <React.Fragment>
                                        <div className={`${global.input_group} col-6 mb-2 pe-2`}>
                                            <p className={global.title}>Deskripsi</p>
                                            <input type="text" id='input-deskripsi' name='input-deskripsi' value={getValueDeskripsi} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-6 mb-2 ps-2`}>
                                            <p className={global.title}>Status</p>
                                            <Select id='select-status' name='select-status' isClearable={true} isSearchable={true} options={[
                                                { value: '0', label: 'Proses' },
                                                { value: '1', label: 'Selesai' }
                                            ]} placeholder={'Select Status...'} value={getValueStatus} styles={CustomSelect} onChange={e => setValueStatus(e)} />
                                        </div>
                                    </React.Fragment>
                                    :
                                    getValueJenisProduksi?.value === 'Stok' &&
                                    <div className={`${global.input_group} col-12 mb-2`}>
                                        <p className={global.title}>Status</p>
                                        <Select id='select-status' name='select-status' isClearable={true} isSearchable={true} options={[
                                            { value: '0', label: 'Proses' },
                                            { value: '1', label: 'Selesai' }
                                        ]} placeholder={'Select Status...'} value={getValueStatus} styles={CustomSelect} onChange={e => setValueStatus(e)} />
                                    </div>
                                }
                            </div>
                        </div>
                        {getValueJenisProduksi &&
                            <button type='button' className={global.button} onClick={InsertProduksi}><MdAdd /> Simpan</button>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}