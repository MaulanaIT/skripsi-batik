import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, cx, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';

import AddHPP from './add_hpp';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/hpp.module.css';

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

export default function Hpp() {

    const [getDataSelected, setDataSelected] = useState([]);
    const [getDataStok, setDataStok] = useState([]);
    const [getDataPesanan, setDataPesanan] = useState([]);
    const [getDataSelectKodeProduksi, setDataSelectKodeProduksi] = useState([]);

    const [getValueBiayaBahanBaku, setValueBiayaBahanBaku] = useState(0);
    const [getValueBiayaTenagaKerja, setValueBiayaTenagaKerja] = useState(0);
    const [getValueBiayaOverheadPabrik, setValueBiayaOverheadPabrik] = useState(0);
    const [getValueHPP, setValueHPP] = useState(0);

    const [getValueJumlah, setValueJumlah] = useState(0);
    const [getValueKodeHPP, setValueKodeHPP] = useState('');
    const [getValueKodeProduksi, setValueKodeProduksi] = useState(null);
    const [getValueKodeCustomer, setValueKodeCustomer] = useState('');
    const [getValueNamaCustomer, setValueNamaCustomer] = useState('');
    const [getValueKodePesanan, setValueKodePesanan] = useState('');
    const [getValueNamaPesanan, setValueNamaPesanan] = useState('');
    const [getValueKodeProduk, setValueKodeProduk] = useState('');
    const [getValueNamaProduk, setValueNamaProduk] = useState('');
    const [getValueTanggalMulai, setValueTanggalMulai] = useState('');
    const [getValueTanggalSelesai, setValueTanggalSelesai] = useState('');

    useEffect(() => {
        GetHPP();
        GetPerencanaanProduksi();
    }, []);

    const GetHPP = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/hpp/select.php`, config).then(response => {
            let data = response.data.data;

            setValueKodeHPP(GenerateCode('HPP', data));

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPerencanaanProduksi = () => {
        ShowLoading();

        let dataSelectKodeProduksi = [];

        ['stok', 'pesanan'].forEach(jenis => {
            const formData = new FormData();

            formData.append('jenis_produksi', jenis);

            axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/select.php`, formData, config).then(response => {
                let data = response.data.data;

                if (data && data.length > 0 && jenis === 'stok') {
                    for (let item of data) {
                        dataSelectKodeProduksi.push(
                            { value: item.kode, label: item.kode }
                        );
                    };

                    setDataStok(data);
                }

                if (data && data.length > 0 && jenis === 'pesanan') {
                    for (let item of data) {
                        dataSelectKodeProduksi.push(
                            { value: item.kode, label: item.kode }
                        );
                    };

                    setDataPesanan(data);
                }

                setDataSelectKodeProduksi(dataSelectKodeProduksi);

                HideLoading();
            }).catch(error => {
                console.log(error);

                alert(error);

                HideLoading();
            });
        });
    }

    const SelectKodeProduksi = (e) => {
        let kode = e?.value;
        let dataSelected = [];

        if (kode?.includes('PPS')) {
            dataSelected = getDataStok.find(item => item.kode === kode);

            setValueKodeProduk(dataSelected.kode_produk);
            setValueNamaProduk(dataSelected.nama_produk);
            setValueJumlah(dataSelected.jumlah);
            setValueTanggalMulai(dataSelected.tanggal);
            setValueTanggalSelesai(moment(dataSelected.tanggal).add(dataSelected.lama, 'days').format('YYYY-MM-DD'));
            setDataSelected(dataSelected);
        } else if (kode?.includes('PPP')) {
            dataSelected = getDataPesanan.find(item => item.kode === kode);

            console.log(dataSelected)

            setValueKodePesanan(dataSelected.kode_pesanan);
            setValueNamaPesanan(dataSelected.nama_pesanan);
            setValueKodeCustomer(dataSelected.kode_customer);
            setValueNamaCustomer(dataSelected.nama_customer);
            setValueJumlah(dataSelected.jumlah);
            setValueTanggalMulai(dataSelected.tanggal);
            setValueTanggalSelesai(moment(dataSelected.tanggal).add(dataSelected.lama, 'days').format('YYYY-MM-DD'));
            setDataSelected(dataSelected);
        }

        setValueKodeProduksi(e);
    }

    const SelectAddHPP = () => {
        document.getElementById('add_hpp').classList.remove('d-none');
    }

    return (
        <React.Fragment>
            <AddHPP kodeProduksi={getValueKodeProduksi?.value} />
            <div className={style.header}>
                <p className={style.title}>Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Perhitungan HPP</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Perhitungan Harga Pokok Produksi</p>
                        <Link to={'/transaksi/produksi/produksi'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}>Cetak</Link>
                    </div>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-5 pe-2`}>
                            <p className={global.title}>Kode Produksi</p>
                            <Select id='select-kode-produksi' name='select-kode-produksi' isClearable={true} isSearchable={true} options={getDataSelectKodeProduksi} placeholder={'Select Kode...'} styles={CustomSelect} onChange={e => SelectKodeProduksi(e)} />
                        </div>
                    </div>
                    {getValueKodeProduksi &&
                        <div className='d-flex flex-wrap'>
                            <div className='col-12 col-md-4 pe-2'>
                                <button type='button' className={global.button} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={SelectAddHPP}>Tambah Perhitungan HPP</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <br></br>
            {getValueKodeProduksi &&
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={`${global.title} text-center w-100`}>Kartu Harga Pokok Produksi</p>
                        </div>
                        {getValueKodeProduksi?.value?.includes('PPS') &&
                            <React.Fragment>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode HPP</p>
                                        <input type="text" id='input-kode-hpp' name='input-kode-hpp' value={getValueKodeHPP} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Produksi</p>
                                        <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={getValueKodeProduksi?.value} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Produk</p>
                                        <input type="text" id='input-kode-produk' name='input-kode-produk' value={getValueKodeProduk} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Nama Produk</p>
                                        <input type="text" id='input-nama-produk' name='input-nama-produk' value={getValueNamaProduk} readOnly={true} />
                                    </div>
                                </div>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Tanggal Mulai</p>
                                        <input type="date" id='input-tanggal-mulai' name='input-tanggal-mulai' value={getValueTanggalMulai} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Tanggal Selesai</p>
                                        <input type="date" id='input-tanggal-selesai' name='input-tanggal-selesai' value={getValueTanggalSelesai} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Jumlah</p>
                                        <input type="text" id='input-jumlah' name='input-jumlah' value={getValueJumlah} readOnly={true} />
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        {getValueKodeProduksi?.value?.includes('PPP') &&
                            <React.Fragment>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode HPP</p>
                                        <input type="text" id='input-kode-hpp' name='input-kode-hpp' value={getValueKodeHPP} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Produksi</p>
                                        <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={getValueKodeProduksi?.value} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Pesanan</p>
                                        <input type="text" id='input-kode-pesanan' name='input-kode-pesanan' value={getValueKodePesanan} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Nama Pesanan</p>
                                        <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' value={getValueNamaPesanan} readOnly={true} />
                                    </div>
                                </div>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode Customer</p>
                                        <input type="text" id='input-nama-customer' name='input-nama-customer' value={getValueKodeCustomer} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Nama Customer</p>
                                        <input type="text" id='input-nama-customer' name='input-nama-customer' value={getValueNamaCustomer} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Tanggal Pesan</p>
                                        <input type="date" id='input-tanggal-pesan' name='input-tanggal-pesan' value={getValueTanggalMulai} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Tanggal Selesai</p>
                                        <input type="date" id='input-tanggal-selesai' name='input-tanggal-selesai' value={getValueTanggalSelesai} readOnly={true} />
                                    </div>
                                </div>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Jumlah</p>
                                        <input type="text" id='input-jumlah' name='input-jumlah' value={getValueJumlah} readOnly={true} />
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Perhitungan Harga Pokok</p>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table table-bordered table-striped table-hover w-100`}>
                                    <thead className='text-center'>
                                        <tr>
                                            <td colSpan={4}>Biaya Bahan Baku</td>
                                            <td colSpan={4}>Biaya Tenaga Kerja</td>
                                            <td colSpan={4}>Biaya Overhead Pabrik</td>
                                        </tr>
                                        <tr>
                                            <td>Tgl</td>
                                            <td>Harga</td>
                                            <td>Qty</td>
                                            <td>Total</td>
                                            <td>Tgl</td>
                                            <td>TK</td>
                                            <td>Upah</td>
                                            <td>Total</td>
                                            <td>Tgl</td>
                                            <td>Harga</td>
                                            <td>Qty</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={`${global.title} fw-bold`} style={{ fontSize: 18 }}>Biaya Produksi</p>
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-4`}>
                                <p className={global.title}>Biaya Bahan Baku</p>
                                <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' value={getValueBiayaBahanBaku} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-3 pe-4`}>
                                <p className={global.title}>Biaya Tenaga Kerja</p>
                                <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' value={getValueBiayaTenagaKerja} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-3 pe-4`}>
                                <p className={global.title}>Biaya Overhead</p>
                                <input type="text" id='input-biaya-overhead' name='input-biaya-overhead' value={getValueBiayaOverheadPabrik} readOnly={true} />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-3`}>
                                <p className={`${global.title} fw-bold`} style={{ fontSize: 18 }}>Harga Pokok Produksi</p>
                                <input type="text" id='input-harga-pokok-produksi' name='input-harga-pokok-produksi' value={getValueHPP} readOnly={true} />
                            </div>
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}