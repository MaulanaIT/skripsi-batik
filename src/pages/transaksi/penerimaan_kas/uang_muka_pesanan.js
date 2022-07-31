import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import { baseURL, CheckInputValidity, config, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/uang_muka_pesanan.module.css';

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

export default function Uang_muka_pesanan() {

    const [getDataSelectAkun, setDataSelectAkun] = useState([]);

    const [getValueDiskon, setValueDiskon] = useState(0);
    const [getValueHpp, setValueHpp] = useState(0);
    const [getValueHarga, setValueHarga] = useState(0);
    const [getValueJumlah, setValueJumlah] = useState(0);
    const [getValueKalkulasiTotalHarga, setValueKalkulasiTotalHarga] = useState(0);
    const [getValueKodeAkun, setValueKodeAkun] = useState('');
    const [getValueKodeJual, setValueKodeJual] = useState('');
    const [getValueKodeCustomer, setValueKodeCustomer] = useState('');
    const [getValueKodePesanan, setValueKodePesanan] = useState('');
    const [getValueNamaCustomer, setValueNamaCustomer] = useState('');
    const [getValueNamaPesanan, setValueNamaPesanan] = useState('');
    const [getValueOngkosKirim, setValueOngkosKirim] = useState(0);
    const [getValueSisa, setValueSisa] = useState(0);
    const [getValueTanggal, setValueTanggal] = useState('');
    const [getValueTotalHarga, setValueTotalHarga] = useState(0);
    const [getValueTotalHpp, setValueTotalHpp] = useState(0);
    const [getValueTotalJual, setValueTotalJual] = useState(0);
    const [getValueUangMuka, setValueUangMuka] = useState(0);

    const location = useLocation();

    useEffect(() => {
        let props = location.state.data;

        GetAkun();
        GetJual();

        setValueJumlah(+props.jumlah);
        setValueKodeCustomer(props.kode_customer);
        setValueNamaCustomer(props.nama_customer);
        setValueKodePesanan(props.kode);
        setValueNamaPesanan(props.nama);
        setValueTotalHpp(props.hpp);
        setValueTotalHarga(props.harga_jual);
        setValueTotalJual(props.harga_jual);
        setValueHpp(parseFloat(+props.hpp / +props.jumlah).toFixed(2));
        setValueHarga(parseFloat(+props.harga_jual / +props.jumlah).toFixed(2));
        setValueTanggal(moment().format('YYYY-MM-DD'));
    }, []);

    useEffect(() => {
        setValueKalkulasiTotalHarga(+getValueTotalJual - +getValueDiskon + +getValueOngkosKirim);
    }, [getValueTotalJual, getValueDiskon, getValueOngkosKirim]);

    useEffect(() => {
        setValueSisa(+getValueKalkulasiTotalHarga - +getValueUangMuka);
    }, [getValueUangMuka, getValueKalkulasiTotalHarga]);

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

    const GetJual = async () => {
        const formData = new FormData();

        formData.append('jenis_penjualan', 'pesanan');

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select.php`, formData, config).then(response => {
            let dataJual = response.data.data;

            setValueKodeJual(GenerateCode('JP', dataJual));
        }).catch(error => {
            console.log(error);
        });
    }

    const InsertUangMuka = () => {
        if (!CheckInputValidity('form-data') || getValueKodeAkun.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        let file = document.getElementById('input-file-transfer').files[0];

        if (file) {
            let arg = file.name.split('.');
            let extension = arg[arg.length - 1];
            formData.append('file_transfer', file);
            formData.append('nama_file', `File Uang Muka - ${getValueKodePesanan} - ${getValueTanggal}.${extension}`);
        }

        formData.append('kode', getValueKodePesanan);
        formData.append('tanggal', getValueTanggal);
        formData.append('kode_customer', getValueKodeCustomer);
        formData.append('total_jual', getValueKalkulasiTotalHarga);
        formData.append('total_hpp', getValueTotalHpp);
        formData.append('uang_muka', getValueUangMuka);
        formData.append('sisa', getValueSisa);

        axios.post(`${baseURL}/api/transaksi/penjualan/uang-muka-pesanan/insert.php`, formData, config).then(() => {
            const formData = new FormData();

            formData.append('kode', getValueKodeJual);
            formData.append('kode_pesanan', getValueKodePesanan);
            formData.append('tanggal', getValueTanggal);
            formData.append('kode_akun', getValueKodeAkun.value);
            formData.append('kode_customer', getValueKodeCustomer);
            formData.append('total_jual', getValueTotalJual);
            formData.append('diskon', getValueDiskon);
            formData.append('ongkos_kirim', getValueOngkosKirim);
            formData.append('total_harga', getValueKalkulasiTotalHarga);
            formData.append('total_bayar', getValueUangMuka);
            formData.append('sisa', getValueSisa);
            formData.append('jenis_penjualan', 'pesanan');

            axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/insert.php`, formData, config).then((response) => {
                window.location.href = '/#/transaksi/penjualan/daftar-pesanan';
            }).catch(error => {
                console.log(error);

                alert(error);

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Uang Muka Pesanan</p>
                <p className={style.pathname}>Transaksi / Penerimaan Kas / Uang Muka Pesanan</p>
            </div>
            <form id='form-data' className={style.content}>
                <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.card}`}>
                        <p className={global.title}>Input Penerimaan Uang Muka Pesanan</p>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Jual <span className={global.important}>*</span></p>
                                <input type="text" id='input-kode-jual' value={getValueKodeJual} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                <input type="date" id='input-tanggal' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} required={true} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                <input type="text" id='input-kode-customer' value={getValueKodeCustomer} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-5 ps-2`}>
                                <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                <input type="text" id='input-nama-customer' value={getValueNamaCustomer} required={true} readOnly={true} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-5 pe-2`}>
                                <p className={global.title}>Kode Pesanan <span className={global.important}>*</span></p>
                                <input type="text" id='input-kode-pesanan' value={getValueKodePesanan} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-7 pe-2`}>
                                <p className={global.title}>Nama Pesanan <span className={global.important}>*</span></p>
                                <input type="text" id='input-nama-pesanan' value={getValueNamaPesanan} required={true} readOnly={true} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                <input type="text" id='input-jumlah-beli' value={getValueJumlah} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-3 px-2`}>
                                <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                <input type="text" id='input-harga-beli' value={getValueHarga} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-3 ps-2`}>
                                <p className={global.title}>Total Harga <span className={global.important}>*</span></p>
                                <input type="text" id='input-total-harga-beli' value={getValueTotalHarga} required={true} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-3 ps-2`}>
                                <p className={global.title}>HPP</p>
                                <input type="text" id='input-total-harga-beli' value={getValueHpp} readOnly={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                    <div className={global.card}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Detail Pesanan</p>
                        </div>
                        {/* <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Pesanan</td>
                                        <td>Nama Pesanan</td>
                                        <td>Jumlah</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div> */}
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Jual <span className={global.important}>*</span></p>
                            <input type="text" id='input-detail-total-jual' className={`col-4`} value={getValueTotalJual} required={true} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Harga Pokok Penjualan</p>
                            <input type="text" id='input-detail-total-jual' className={`col-4`} value={getValueTotalHpp} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Diskon</p>
                            <input type="text" id='input-detail-diskon' className={'col-4'} value={getValueDiskon} onChange={e => setValueDiskon(e.target.value)} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Ongkos Kirim <span className={global.important}>*</span></p>
                            <input type="text" id='input-detail-ongkos-kirim' className={`col-4`} value={getValueOngkosKirim} onChange={e => setValueOngkosKirim(e.target.value)} required={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Total Harga <span className={global.important}>*</span></p>
                            <input type="text" id='input-detail-total-harga' value={getValueKalkulasiTotalHarga} className={`col-4`} required={true} readOnly={true} />
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Uang Muka <span className={global.important}>*</span></p>
                            <input type="text" id='input-detail-uang-muka' className={`col-4`} value={getValueUangMuka} onChange={e => setValueUangMuka(e.target.value)} />
                            <div className='col-5 ps-2'>
                                <Select id='select-kode-akun' name='select-kode-akun' isClearable={true} isSearchable={true} options={getDataSelectAkun} value={getValueKodeAkun} placeholder={'Select Akun...'} onChange={e => setValueKodeAkun(e)} styles={CustomSelect} />
                            </div>
                        </div>
                        <div className={`align-items-center ${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Sisa <span className={global.important}>*</span></p>
                            <input type="text" id='input-sisa' className={`col-4`} value={getValueSisa} required={true} readOnly={true} />
                        </div>
                        <div className='d-flex flex-column gap-3 pt-2'>
                            <div className='align-items-center d-flex justify-content-between'>
                                <p>Upload File Transfer</p>
                                <input type="file" accept='.pdf' id='input-file-transfer' name='input-file-transfer' />
                            </div>
                            <div className='d-flex'>
                                <div className='col-6 pe-2'>
                                    <button type='button' className={`${global.button} w-100`} onClick={InsertUangMuka}>Simpan</button>
                                </div>
                                <div className='col-6 ps-2'>
                                    <Link to={'/transaksi/penjualan/daftar-pesanan'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}
