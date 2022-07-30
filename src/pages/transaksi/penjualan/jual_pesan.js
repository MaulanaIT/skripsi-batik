import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/transaksi_penjualan.module.css';

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

export default function Jual_pesan() {

    const [getDataSelectAkun, setDataSelectAkun] = useState([]);

    const [getValueKodeAkun, setValueKodeAkun] = useState([]);
    const [getValueKodeJual, setValueKodeJual] = useState('');
    const [getValueTanggal, setValueTanggal] = useState('');
    const [getValueKodeCustomer, setValueKodeCustomer] = useState('');
    const [getValueNamaCustomer, setValueNamaCustomer] = useState('');
    const [getValueTotalJual, setValueTotalJual] = useState(0);
    const [getValueDiskon, setValueDiskon] = useState(0);
    const [getValueOngkosKirim, setValueOngkosKirim] = useState(0);
    const [getValueTotalHarga, setValueTotalHarga] = useState(0);
    const [getValueUangMuka, setValueUangMuka] = useState(0);
    const [getValueSisa, setValueSisa] = useState(0);
    const [getValueTotalBayar, setValueTotalBayar] = useState(0);
    const [getValueKembalian, setValueKembalian] = useState(0);

    const location = useLocation();

    useEffect(() => {
        let props = location.state.data;

        GetAkun();
        GetPesanan();

        setValueKodeCustomer(props.kode_customer);
        setValueNamaCustomer(props.nama_customer);

        setValueTanggal(moment().format('YYYY-MM-DD'));
    }, []);

    useEffect(() => {
        setValueKembalian(+getValueTotalBayar - +getValueSisa);
    }, [getValueTotalBayar]);

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

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const GetPesanan = () => {
        const formData = new FormData();

        formData.append('jenis_penjualan', 'pesanan');
        
        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select.php`, formData, config).then(response => {
            ShowLoading();
            let data = response.data.data.find(item => item.kode_pesanan === location.state.data.kode);
            
            setValueKodeJual(data.kode);
            setValueTotalJual(data.total_jual);
            setValueDiskon(data.diskon);
            setValueOngkosKirim(data.ongkos_kirim);
            setValueTotalHarga(data.total_harga);
            setValueUangMuka(data.total_bayar);
            setValueSisa(data.sisa);

            HideLoading();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const InsertJual = () => {
        ShowLoading();

        const formData = new FormData();

        let file = document.getElementById('input-file-transfer').files[0];

        if (file) {
            let arg = file.name.split('.');
            let extension = arg[arg.length - 1];
            formData.append('file_transfer', file);
            formData.append('nama_file', `File Uang Muka - ${getValueKodeJual} - ${getValueTanggal}.${extension}`);
        }


        formData.append('kode', getValueKodeJual);
        formData.append('kode_akun', getValueKodeAkun.value);
        formData.append('sisa', getValueSisa);
        formData.append('jenis_penjualan', 'pesanan');

        axios.post(`${baseURL}/api/transaksi/penjualan/penyerahan-pesanan/insert.php`, formData, config).then(() => {
            window.location.href = '/#/transaksi/penjualan/daftar-pesanan';
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Transaksi Penjualan</p>
                <p className={style.pathname}>Transaksi / Penjualan / Transaksi Penjualan Pesanan</p>
            </div>
            <div className={style.content}>
                <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.card}`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Input Penjualan</p>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Jual</p>
                                <input type="text" id='input-kode-jual' value={getValueKodeJual} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Tanggal</p>
                                <input type="date" id='input-tanggal-jual' value={getValueTanggal} readOnly={true} />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-5 pe-2`}>
                                <p className={global.title}>Kode Customer</p>
                                <input type="text" id='input-kode-customer' value={getValueKodeCustomer} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-7 pe-2`}>
                                <p className={global.title}>Nama Customer</p>
                                <input type="text" id='input-nama-customer' value={getValueNamaCustomer} readOnly={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                    <div className={`${global.card}`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Detail Penjualan</p>
                        </div>
                        {/* <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Pesanan</td>
                                            <td>Nama Pesanan</td>
                                            <td>Jumlah Jual</td>
                                            <td>Harga Jual</td>
                                            <td>Total Harga</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div> */}
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Jual</p>
                            <input type="text" id='input-detail-total-jual' value={getValueTotalJual} className={`col-4`} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Harga Pokok Penjualan</p>
                            <input type="text" id='input-detail-total-jual' className={`col-4`} value={getValueTotalJual} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Diskon</p>
                            <input type="text" id='input-detail-diskon' value={getValueDiskon} className={'col-4'} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                            <input type="text" id='input-detail-ongkos-kirim' value={getValueOngkosKirim} className={`col-4`} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Harga</p>
                            <input type="text" id='input-detail-total-harga' value={getValueTotalHarga} className={`col-4`} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Uang Muka</p>
                            <input type="text" id='input-detail-uang-muka' value={getValueUangMuka} className={`col-4`} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Sisa</p>
                            <input type="text" id='input-detail-piutang' value={getValueSisa} className={`col-4`} readOnly={true} />
                            <div className='col-5 ps-2'>
                                <Select id='select-kode-akun' name='select-kode-akun' isClearable={true} isSearchable={true} options={getDataSelectAkun} placeholder={'Select Akun...'} value={getValueKodeAkun} styles={CustomSelect} onChange={e => setValueKodeAkun(e)} />
                            </div>
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Bayar</p>
                            <input type="text" id='input-detail-bayar' value={getValueTotalBayar} className={`col-4`} onChange={e => setValueTotalBayar(e.target.value)} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Kembalian</p>
                            <input type="text" id='input-detail-kembalian' value={getValueKembalian} className={`col-4`} readOnly={true} />
                        </div>
                        <div className='d-flex flex-column gap-5 pt-2'>
                            <div>
                                <p>Upload File Transfer</p>
                                <input type="file" accept='.pdf' id='input-file-transfer' name='input-file-transfer' />
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-2 pt-2'>
                            <div className='d-flex'>
                                <div className='col-6 pe-2'>
                                    <button type='button' className={`${global.button} w-100`} onClick={InsertJual}>Simpan</button>
                                </div>
                                <div className='col-6 ps-2'>
                                    <Link to={'/transaksi/penjualan/daftar-pesanan'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}