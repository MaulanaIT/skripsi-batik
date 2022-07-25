import React, { useEffect, useRef, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { MdAdd, MdEdit } from 'react-icons/md';
import { baseURL, CheckInputValidity, config, cx, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

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
    const [getDataHPP, setDataHPP] = useState([]);
    const [getDataStok, setDataStok] = useState([]);
    const [getDataPesanan, setDataPesanan] = useState([]);
    const [getDataSelectKodeProduksi, setDataSelectKodeProduksi] = useState([]);

    const [getHTMLTableDaftarDetailBahanBaku, setHTMLTableDaftarDetailBahanBaku] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarDetailOverhead, setHTMLTableDaftarDetailOverhead] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarDetailTenagaKerja, setHTMLTableDaftarDetailTenagaKerja] = useStateWithCallbackLazy([]);

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
    const [getValueKodePermintaan, setValueKodePermintaan] = useState('');
    const [getValueKodeProduk, setValueKodeProduk] = useState('');
    const [getValueNamaProduk, setValueNamaProduk] = useState('');
    const [getValueTanggalMulai, setValueTanggalMulai] = useState('');
    const [getValueTanggalSelesai, setValueTanggalSelesai] = useState('');

    const [getIsUpdateData, setIsUpdateData] = useState(false);

    const addReff = useRef();

    const location = useLocation();

    useEffect(() => {
        if (location.state === null) {
            setIsUpdateData(false);
        } else {
            // console.log(location.state.data);
            setDataSelected(location.state.data);
            setIsUpdateData(true);
        }

        GetHPP();
    }, []);

    useEffect(() => {
        GetPerencanaanProduksi();
    }, [getDataHPP]);

    const GetHPP = async () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/hpp/select.php`, config).then(response => {
            let data = response.data.data;

            setValueKodeHPP(GenerateCode('HPP', data));
            setDataHPP(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPerencanaanProduksi = async () => {
        ShowLoading();

        let dataSelectKodeProduksi = [];

        ['stok', 'pesanan'].forEach(jenis => {
            const formData = new FormData();

            formData.append('jenis_produksi', jenis);

            axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/select.php`, formData, config).then(response => {
                let data = response.data.data;

                if (data && data.length > 0 && jenis === 'stok') {
                    for (let item of data) {
                        let check = getDataHPP.findIndex(hpp => hpp.kode_produksi === item.kode);

                        if (check < 0) {
                            dataSelectKodeProduksi.push(
                                { value: item.kode, label: item.kode }
                            );
                        }
                    };
                    setDataStok(data);
                }

                if (data && data.length > 0 && jenis === 'pesanan') {
                    for (let item of data) {
                        let check = getDataHPP.findIndex(hpp => hpp.kode_produksi === item.kode);

                        if (check < 0) {
                            dataSelectKodeProduksi.push(
                                { value: item.kode, label: item.kode }
                            );
                        }
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

    const InsertHPP = async () => {
        if (!CheckInputValidity('form-data')) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        if (getIsUpdateData) {
            formData.append('kode', getDataSelected.kode);
            formData.append('kode_produk', getDataSelected.kode_produk);
            formData.append('kode_produksi', getDataSelected.kode_produksi);
            formData.append('kode_permintaan', getDataSelected.kode_permintaan);
            formData.append('tanggal_mulai', getDataSelected.tanggal_mulai);
            formData.append('tanggal_selesai', getDataSelected.tanggal_selesai);
            formData.append('biaya_bahan_baku', getValueBiayaBahanBaku);
            formData.append('biaya_tenaga_kerja', getValueBiayaTenagaKerja);
            formData.append('biaya_overhead_pabrik', getValueBiayaOverheadPabrik);
            formData.append('jumlah', getDataSelected.jumlah);
            formData.append('hpp', getValueHPP);
        } else {
            formData.append('kode', getValueKodeHPP);
            formData.append('kode_produk', getValueKodeProduk);
            formData.append('kode_produksi', getValueKodeProduksi.value);
            formData.append('kode_permintaan', getValueKodePermintaan);
            formData.append('tanggal_mulai', getValueTanggalMulai);
            formData.append('tanggal_selesai', getValueTanggalSelesai);
            formData.append('biaya_bahan_baku', getValueBiayaBahanBaku);
            formData.append('biaya_tenaga_kerja', getValueBiayaTenagaKerja);
            formData.append('biaya_overhead_pabrik', getValueBiayaOverheadPabrik);
            formData.append('jumlah', getValueJumlah);
            formData.append('hpp', getValueHPP);
        }

        await axios.post(`${baseURL}/api/transaksi/produksi/hpp/insert.php`, formData, config).then(async () => {
            await addReff.current?.InsertDetailAlat();
            await addReff.current?.InsertDetailBahanBaku();
            await addReff.current?.InsertDetailPenolong();
            await addReff.current?.InsertDetailTenagaKerja();

            const formData = new FormData();

            if (getIsUpdateData) {
                formData.append('kode', getDataSelected.kode_produksi);
                formData.append('status', 0);
                formData.append('jenis_produksi', getDataSelected.kode_produksi.includes('PS') ? 'stok' : getValueKodeProduksi?.value?.includes('PP') && 'pesanan');
            } else {
                formData.append('kode', getValueKodeProduksi.value);
                formData.append('status', 0);
                formData.append('jenis_produksi', getValueKodeProduksi?.value?.includes('PS') ? 'stok' : getValueKodeProduksi?.value?.includes('PP') && 'pesanan');
            }

            axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/update.php`, formData, config).then(() => {
                window.location.href = '/#/transaksi/produksi/daftar-hpp';
            }).catch(error => {
                console.log(error);

                alert(error);

                HideLoading();
            })
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const SelectKodeProduksi = (e) => {
        let kode = e?.value;
        let dataSelected = [];

        if (kode?.includes('PS')) {
            dataSelected = getDataStok.find(item => item.kode === kode);

            setValueKodeProduk(dataSelected.kode_produk);
            setValueNamaProduk(dataSelected.nama_produk);
            setValueJumlah(dataSelected.jumlah);
            setValueTanggalMulai(dataSelected.tanggal);
            setValueTanggalSelesai(moment(dataSelected.tanggal).add(dataSelected.lama, 'days').format('YYYY-MM-DD'));
            setValueKodePermintaan(dataSelected.kode_permintaan);
        } else if (kode?.includes('PP')) {
            dataSelected = getDataPesanan.find(item => item.kode === kode);

            setValueKodePesanan(dataSelected.kode_pesanan);
            setValueNamaPesanan(dataSelected.nama_pesanan);
            setValueKodeCustomer(dataSelected.kode_customer);
            setValueNamaCustomer(dataSelected.nama_customer);
            setValueJumlah(dataSelected.jumlah);
            setValueTanggalMulai(dataSelected.tanggal);
            setValueTanggalSelesai(moment(dataSelected.tanggal).add(dataSelected.lama, 'days').format('YYYY-MM-DD'));
            setValueKodePermintaan(dataSelected.kode_permintaan);
        }

        setValueKodeProduksi(e);
    }

    const SelectAddHPP = () => {
        document.getElementById('add_hpp').classList.remove('d-none');
    }

    const SetDetailData = (Alat, BahanBaku, Penolong, TenagaKerja) => {
        let htmlTableDaftarDetailBahanBaku = [];
        let htmlTableDaftarDetailOverhead = [];
        let htmlTableDaftarDetailTenagaKerja = [];

        $(`#table-data-bahan-baku`).DataTable().destroy();
        $(`#table-data-tenaga-kerja`).DataTable().destroy();
        $(`#table-data-overhead`).DataTable().destroy();

        if (BahanBaku && BahanBaku.length > 0) {
            BahanBaku.forEach((item, index) => {
                htmlTableDaftarDetailBahanBaku.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{item.tanggal}</td>
                        <td>{item.harga}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        if (TenagaKerja && TenagaKerja.length > 0) {
            TenagaKerja.forEach((item, index) => {
                htmlTableDaftarDetailTenagaKerja.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{item.tanggal}</td>
                        <td>{item.harga}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        if (Alat && Alat.length > 0) {
            Alat.forEach((item, index) => {
                htmlTableDaftarDetailOverhead.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{item.tanggal}</td>
                        <td>{item.harga}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        if (Penolong && Penolong.length > 0) {
            Penolong.forEach((item, index) => {
                htmlTableDaftarDetailOverhead.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{item.tanggal}</td>
                        <td>{item.harga}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        setHTMLTableDaftarDetailBahanBaku(htmlTableDaftarDetailBahanBaku, () => {
            $(`#table-data-bahan-baku`).DataTable();
        });
        setHTMLTableDaftarDetailTenagaKerja(htmlTableDaftarDetailTenagaKerja, () => {
            $(`#table-data-tenaga-kerja`).DataTable();
        });
        setHTMLTableDaftarDetailOverhead(htmlTableDaftarDetailOverhead, () => {
            $(`#table-data-overhead`).DataTable();
        });
    }

    const SetHPP = (BahanBaku, TenagaKerja, Overhead) => {
        setValueBiayaBahanBaku(BahanBaku);
        setValueBiayaTenagaKerja(TenagaKerja);
        setValueBiayaOverheadPabrik(Overhead);
        setValueHPP(+BahanBaku + +TenagaKerja + +Overhead);
    }

    return (
        <React.Fragment>
            <AddHPP ref={addReff} isUpdate={location.state ? true : false} dataSelected={location.state?.data} kodeHPP={getValueKodeHPP} kodeProduksi={getValueKodeProduksi?.value} kodePermintaan={getValueKodePermintaan} setDetailData={SetDetailData} setHpp={SetHPP} />
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
                            {getIsUpdateData ?
                                <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={getDataSelected.kode_produksi} required={true} readOnly={true} />
                                :
                                <Select id='select-kode-produksi' name='select-kode-produksi' isClearable={true} isSearchable={true} options={getDataSelectKodeProduksi} placeholder={'Select Kode...'} value={getValueKodeProduksi} styles={CustomSelect} onChange={e => SelectKodeProduksi(e)} />
                            }
                        </div>
                    </div>
                    <div className='d-flex flex-wrap'>
                        <div className='col-12 col-md-4 pe-2'>
                            <button type='button' className={global.button} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={SelectAddHPP}>Tambah Perhitungan HPP</button>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            {(getValueKodeProduksi !== null || getIsUpdateData) &&
                <div className={`${style.content}`}>
                    <form id='form-data' className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={`${global.title} text-center w-100`}>Kartu Harga Pokok Produksi</p>
                        </div>
                        {(getValueKodeProduksi?.value?.includes('PS') || getDataSelected?.kode_produksi?.includes('PS')) &&
                            <React.Fragment>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode HPP <span className={global.important}>*</span></p>
                                        <input type="text" id='input-kode-hpp' name='input-kode-hpp' value={getIsUpdateData ? getDataSelected.kode : getValueKodeHPP} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Produksi <span className={global.important}>*</span></p>
                                        <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={getIsUpdateData ? getDataSelected.kode_produksi : getValueKodeProduksi?.value} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                        <input type="text" id='input-kode-produk' name='input-kode-produk' value={getIsUpdateData ? getDataSelected.kode_produk : getValueKodeProduk} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                        <input type="text" id='input-nama-produk' name='input-nama-produk' value={getIsUpdateData ? getDataSelected.nama_produk : getValueNamaProduk} required={true} readOnly={true} />
                                    </div>
                                </div>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Tanggal Mulai <span className={global.important}>*</span></p>
                                        <input type="date" id='input-tanggal-mulai' name='input-tanggal-mulai' value={getIsUpdateData ? getDataSelected.tanggal_mulai : getValueTanggalMulai} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Tanggal Selesai <span className={global.important}>*</span></p>
                                        <input type="date" id='input-tanggal-selesai' name='input-tanggal-selesai' value={getIsUpdateData ? getDataSelected.tanggal_selesai : getValueTanggalSelesai} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                        <input type="text" id='input-jumlah' name='input-jumlah' value={getIsUpdateData ? getDataSelected.jumlah : getValueJumlah} required={true} readOnly={true} />
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        {(getValueKodeProduksi?.value?.includes('PP') || getDataSelected?.kode_produksi?.includes('PP')) &&
                            <React.Fragment>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode HPP <span className={global.important}>*</span></p>
                                        <input type="text" id='input-kode-hpp' name='input-kode-hpp' value={getIsUpdateData ? getDataSelected.kode : getValueKodeHPP} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Produksi <span className={global.important}>*</span></p>
                                        <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={getIsUpdateData ? getDataSelected.kode_produksi : getValueKodeProduksi?.value} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Kode Pesanan <span className={global.important}>*</span></p>
                                        <input type="text" id='input-kode-pesanan' name='input-kode-pesanan' value={getValueKodePesanan} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Nama Pesanan <span className={global.important}>*</span></p>
                                        <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' value={getValueNamaPesanan} required={true} readOnly={true} />
                                    </div>
                                </div>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                        <input type="text" id='input-nama-customer' name='input-nama-customer' value={getValueKodeCustomer} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                        <input type="text" id='input-nama-customer' name='input-nama-customer' value={getValueNamaCustomer} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Tanggal Pesan <span className={global.important}>*</span></p>
                                        <input type="date" id='input-tanggal-pesan' name='input-tanggal-pesan' value={getValueTanggalMulai} required={true} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-4`}>
                                        <p className={global.title}>Tanggal Selesai <span className={global.important}>*</span></p>
                                        <input type="date" id='input-tanggal-selesai' name='input-tanggal-selesai' value={getValueTanggalSelesai} required={true} readOnly={true} />
                                    </div>
                                </div>
                                <div className={`${bootstrap['d-flex']}`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                        <input type="text" id='input-jumlah' name='input-jumlah' value={getValueJumlah} required={true} readOnly={true} />
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Perhitungan Harga Pokok</p>
                            </div>
                            <div className={`mb-4 table-responsive`}>
                                <table id='table-data-bahan-baku' className={`table table-bordered w-100`}>
                                    <thead className='text-center'>
                                        <tr>
                                            <td colSpan={4}>Biaya Bahan Baku</td>
                                        </tr>
                                        <tr>
                                            <td>Tgl</td>
                                            <td>Harga</td>
                                            <td>Qty</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarDetailBahanBaku}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`mb-4 table-responsive`}>
                                <table id='table-data-tenaga-kerja' className={`table table-bordered w-100`}>
                                    <thead className='text-center'>
                                        <tr>
                                            <td colSpan={4}>Biaya Tenaga Kerja</td>
                                        </tr>
                                        <tr>
                                            <td>Tgl</td>
                                            <td>Upah</td>
                                            <td>Qty</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarDetailTenagaKerja}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`mb-4 table-responsive`}>
                                <table id='table-data-overhead' className={`table table-bordered w-100`}>
                                    <thead className='text-center'>
                                        <tr>
                                            <td colSpan={4}>Biaya Overhead Pabrik</td>
                                        </tr>
                                        <tr>
                                            <td>Tgl</td>
                                            <td>Harga</td>
                                            <td>Qty</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarDetailOverhead}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={`${global.title} fw-bold`} style={{ fontSize: 18 }}>Biaya Produksi</p>
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-4 pe-2`}>
                                <p className={global.title}>Biaya Bahan Baku <span className={global.important}>*</span></p>
                                <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' value={getValueBiayaBahanBaku} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-4 px-2`}>
                                <p className={global.title}>Biaya Tenaga Kerja <span className={global.important}>*</span></p>
                                <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' value={getValueBiayaTenagaKerja} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-4 ps-2`}>
                                <p className={global.title}>Biaya Overhead <span className={global.important}>*</span></p>
                                <input type="text" id='input-biaya-overhead' name='input-biaya-overhead' value={getValueBiayaOverheadPabrik} required={true} readOnly={true} />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-4`}>
                                <p className={`${global.title} fw-bold`} style={{ fontSize: 18 }}>Harga Pokok Produksi <span className={global.important}>*</span></p>
                                <input type="text" id='input-harga-pokok-produksi' name='input-harga-pokok-produksi' value={getValueHPP} required={true} readOnly={true} />
                            </div>
                        </div>
                        {getIsUpdateData ?
                            <button type='button' className={global.button} onClick={InsertHPP}><MdEdit className='me-2' />  Update</button>
                            :
                            <button type='button' className={global.button} onClick={InsertHPP}><MdAdd className='me-2' />  Simpan</button>
                        }
                    </form>
                </div>
            }
        </React.Fragment>
    )
}