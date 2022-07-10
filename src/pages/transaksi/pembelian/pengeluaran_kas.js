import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { baseURL, Calculate, config, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/pengeluaran_kas.module.css';

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

export default function Pengeluaran_kas() {

    const [getDataAkun, setDataAkun] = useState([]);
    const [getDataDetailPembelian, setDataDetailPembelian] = useState([]);
    const [getDataSelectAkun, setDataSelectAkun] = useState([]);
    const [getHTMLDetailOrder, setHTMLDetailOrder] = useState([]);
    const [getValueDiskon, setValueDiskon] = useState(0);
    const [getValueJenisPembelian, setValueJenisPembelian] = useState('');
    const [getValueKodeOrder, setValueKodeOrder] = useState('');
    const [getValueKodePengeluaranKas, setValueKodePengeluaranKas] = useState('');
    const [getValueKodeSupplier, setValueKodeSupplier] = useState('');
    const [getValueNamaSupplier, setValueNamaSupplier] = useState('');
    const [getValueOngkosKirim, setValueOngkosKirim] = useState(0);
    const [getValueSelectedAkun, setValueSelectedAkun] = useState([]);
    const [getValueTanggalBayar, setValueTanggalBayar] = useState('');
    const [getValueTanggalOrder, setValueTanggalOrder] = useState('');
    const [getValueTotalBayar, setValueTotalBayar] = useState(0);
    const [getValueTotalPembelian, setValueTotalPembelian] = useState(0);

    const location = useLocation();

    useEffect(() => {
        GetAkun();
        GetPengeluaranKas();
        GetTerimaBarang();
    }, []);

    useEffect(() => {
        if (getValueKodeOrder) GetDetailOrder();
    }, [getValueKodeOrder]);

    useEffect(() => {
        setValueTotalBayar(Calculate([getValueTotalPembelian, getValueDiskon, getValueOngkosKirim]));
    }, [getValueTotalPembelian, getValueDiskon, getValueOngkosKirim]);

    useEffect(() => {
        $(`#table-data`).DataTable();
    }, [getHTMLDetailOrder]);

    const GetAkun = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/akun/select.php`, config).then(response => {
            let data = response.data.data.filter(item => ['1101', '1102'].includes(item.kode));

            let dataSelectAkun = [];

            if (data && data.length > 0) {
                for (let item of data) {
                    dataSelectAkun.push(
                        { value: item.kode, label: item.nama }
                    );
                }
            }

            setDataSelectAkun(dataSelectAkun);
            setDataAkun(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const GetDetailOrder = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeOrder);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-order/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlDetailOrder = [];
            let totalPembelian = 0;
            let dataDetailPembelian = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlDetailOrder.push(
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td></td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    );

                    totalPembelian += parseInt(item.total_harga);

                    dataDetailPembelian.push({
                        kode: getValueKodePengeluaranKas,
                        kode_item: item.kode_item,
                        nama_item: item.nama_item,
                        jumlah: item.jumlah,
                        harga: item.harga,
                        total_harga: item.total_harga
                    })
                });
            }

            $(`#table-data`).DataTable().destroy();

            setHTMLDetailOrder(htmlDetailOrder);
            setValueTotalPembelian(totalPembelian);
            setDataDetailPembelian(dataDetailPembelian);

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const GetPengeluaranKas = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/pembelian/pengeluaran-kas/select.php`, config).then(response => {
            let data = response.data.data;

            setValueKodePengeluaranKas(GenerateCode('KK', data));
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const GetTerimaBarang = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/pembelian/terima-barang/select.php`, config).then(response => {
            let data = response.data.data.find(item => item.kode_order === location.state.kode);

            setValueJenisPembelian(data.jenis_pembelian.replace(/\b\w/g, c => c.toUpperCase()));
            setValueKodeOrder(data.kode_order);
            setValueKodeSupplier(data.kode_supplier);
            setValueNamaSupplier(data.nama_supplier);
            setValueTanggalBayar(moment().format('YYYY-MM-DD'));
            setValueTanggalOrder(data.tanggal);

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const InsertPengeluaranKas = () => {
        if (getDataAkun.find(item => item.kode === getValueSelectedAkun.value).saldo < getValueTotalBayar) {
            alert('Saldo Tidak Mencukupi');

            return;
        }

        ShowLoading();

        const formData = new FormData();

        let file = document.getElementById('input-file-transfer').files[0];
        let arg = file.name.split('.');
        let extension = arg[arg.length - 1];

        formData.append('kode', getValueKodePengeluaranKas)
        formData.append('tanggal', getValueTanggalBayar)
        formData.append('kode_order', getValueKodeOrder)
        formData.append('kode_supplier', getValueKodeSupplier)
        formData.append('diskon', getValueDiskon)
        formData.append('ongkos_kirim', getValueOngkosKirim)
        formData.append('total_bayar', getValueTotalBayar)
        formData.append('file_transfer', file);
        formData.append('nama_file', `File Transfer - ${getValueKodePengeluaranKas} - ${getValueTanggalBayar}.${extension}`);
        formData.append('kode_akun', getValueSelectedAkun.value);

        axios.post(`${baseURL}/api/transaksi/pembelian/pengeluaran-kas/insert.php`, formData, config).then(response => {
            console.log(response);

            const formDetailData = new FormData();

            formDetailData.append('data', JSON.stringify(getDataDetailPembelian));

            axios.post(`${baseURL}/api/transaksi/pembelian/detail-pengeluaran-kas/insert.php`, formDetailData, config).then(() => {
                // window.location.href = '/transaksi/pembelian/daftar-terima-barang';
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

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Pengeluaran Kas</p>
                <p className={style.pathname}>Transaksi / Pembelian / Pengeluaran Kas</p>
            </div>
            <div className={style.content}>
                <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.card}`}>
                        <p className={global.title}>Input Pengeluaran Kas</p>
                        <div className={`${global.input_group} col-4 pe-2`}>
                            <p className={global.title}>Jenis Pembelian</p>
                            <input type="text" id='input-jenis-pembelian' value={getValueJenisPembelian} readOnly={true} />
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Kas Keluar</p>
                                <input type="text" id='input-kode-kas-keluar' name='input-kode-kas-keluar' value={getValueKodePengeluaranKas} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Tanggal Bayar</p>
                                <input type="date" id='input-tanggal-bayar' name='input-tanggal-bayar' value={getValueTanggalBayar} onChange={e => setValueTanggalBayar(e.target.value)} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Kode Order</p>
                                <input type="text" id='input-kode-order' name='input-kode-order' value={getValueKodeOrder} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-5 ps-2`}>
                                <p className={global.title}>Tanggal Order</p>
                                <input type="text" id='input-tanggal-order' name='input-tanggal-order' value={getValueTanggalOrder} readOnly={true} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Kode Supplier</p>
                                <input type="text" id='input-kode-supplier' name='input-kode-supplier' value={getValueKodeSupplier} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-5 ps-2`}>
                                <p className={global.title}>Nama Supplier</p>
                                <input type="text" id='input-nama-supplier' name='input-nama-supplier' value={getValueNamaSupplier} readOnly={true} />
                            </div>
                        </div>
                    </div>
                </div>
                {getValueJenisPembelian !== '' ?
                    <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                        <div className={global.card}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Daftar Pembelian</p>
                            </div>
                            {getValueJenisPembelian === 'Bahan' ?
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Bahan</td>
                                                    <td>Nama Bahan</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getHTMLDetailOrder}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Alat</td>
                                                    <td>Nama Alat</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getHTMLDetailOrder}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            }
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Pembelian</p>
                                    <input type="text" id='input-detail-total-pembelian' name='input-detail-total-pembelian' className={`col-3`} value={getValueTotalPembelian} readOnly={true} />
                                </div>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Diskon</p>
                                    <input type="text" id='input-detail-diskon' name='input-detail-diskon' className={`col-3`} value={getValueDiskon} onInput={InputFormatNumber} onChange={e => setValueDiskon(e.target.value)} />
                                </div>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                    <input type="text" id='input-detail-ongkos-kirim' name='input-detail-ongkos-kirim' className={`col-3`} value={getValueOngkosKirim} onInput={InputFormatNumber} onChange={e => setValueOngkosKirim(e.target.value)} />
                                </div>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Bayar</p>
                                    <input type="text" id='input-detail-total-harga' name='input-detail-total-harga' className={`col-3`} value={getValueTotalBayar} readOnly={true} />
                                    <div className='col-6 ps-2'>
                                        <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={getDataSelectAkun} placeholder={'Select Akun...'} styles={CustomSelect} value={getValueSelectedAkun} onChange={e => setValueSelectedAkun(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-column gap-2 pt-2'>
                                <div className='align-items-center d-flex justify-content-between'>
                                    <p>Upload File Transfer</p>
                                    <input type="file" accept='.pdf' id='input-file-transfer' name='input-file-transfer' />
                                </div>
                                <div className='d-flex'>
                                    <div className='col-6 pe-2'>
                                        <button type='button' className={`${global.button} w-100`} onClick={InsertPengeluaranKas}>Simpan</button>
                                    </div>
                                    <div className='col-6 ps-2'>
                                        <Link to={'/transaksi/pembelian/daftar-terima-barang'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </React.Fragment>
    )
}