import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { baseURL, config, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';
import { Link, useLocation } from 'react-router-dom';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/pengembalian_dana.module.css'

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

export default function Pengembalian_dana() {

    const [getDataAkun, setDataAkun] = useState([]);
    const [getDataSelectAkun, setDataSelectAkun] = useState([]);
    const [getValueJumlahUangDiterima, setValueJumlahUangDiterima] = useState(0);
    const [getValueKodeKasMasuk, setValueKodeKasMasuk] = useState('');
    const [getValueKodeRetur, setValueKodeRetur] = useState('');
    const [getValueKodeSupplier, setValueKodeSupplier] = useState('');
    const [getValueNamaSupplier, setValueNamaSupplier] = useState('');
    const [getValueSelectedAkun, setValueSelectedAkun] = useState([]);
    const [getValueTanggal, setValueTanggal] = useState('');
    const [getValueTotalRetur, setValueTotalRetur] = useState(0);

    const location = useLocation();

    useEffect(() => {
        GetAkun();
        GetRefund();
        GetRetur();
    }, []);

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

    const GetRefund = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/pembelian/refund/select.php`, config).then(response => {
            let data = response.data.data;
            
            setValueKodeKasMasuk(GenerateCode('REF', data));

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetRetur = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/pembelian/retur/select.php`, config).then(response => {
            let data = response.data.data;
            data = data.find(item => item.kode === location.state.kode);

            setValueTanggal(data.tanggal);
            setValueKodeRetur(data.kode);
            setValueTotalRetur(data.jumlah_retur);
            setValueJumlahUangDiterima(data.total_harga);
            setValueKodeSupplier(data.kode_supplier);
            setValueNamaSupplier(data.nama_supplier);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const Insert = () => {
        ShowLoading();

        const formData = new FormData();

        let file = document.getElementById('input-file-transfer').files[0];
        let arg = file.name.split('.');
        let extension = arg[arg.length - 1];
        
        formData.append('kode', getValueKodeKasMasuk);
        formData.append('kode_retur', getValueKodeRetur);
        formData.append('tanggal', getValueTanggal);
        formData.append('jumlah_terima', getValueJumlahUangDiterima);
        formData.append('file_transfer', file);
        formData.append('nama_file', `File Transfer - ${getValueKodeKasMasuk} - ${getValueTanggal}.${extension}`);
        formData.append('kode_akun', getValueSelectedAkun.value);

        axios.post(`${baseURL}/api/transaksi/pembelian/refund/insert.php`, formData, config).then(() => {
            window.location.href = '/transaksi/pembelian/daftar-retur';
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Pengembalian Dana</p>
                <p className={style.pathname}>Penerimaan Kas / Pengembalian Dana </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <p className={global.title}>Input Penerimaan Uang atas Retur</p>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Kode Kas Masuk</p>
                            <input type="text" id='input-kode-kas-masuk' name='input-kode-kas-masuk' value={getValueKodeKasMasuk} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Kode Supplier</p>
                            <input type="text" id='input-kode-supplier' name='input-kode-supplier' value={getValueKodeSupplier} readOnly={true} />
                        </div>
                    </div>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Tanggal</p>
                            <input type="text" id='input-tanggal' name='input-tanggal' value={getValueTanggal} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Nama Supplier</p>
                            <input type="text" id='input-nama-supplier' name='input-nama-supplier' value={getValueNamaSupplier} readOnly={true} />
                        </div>
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Retur</p>
                        <input type="text" className="col col-lg-2 col-md-3" id='input-kode-retur' name='input-kode-retur' value={getValueKodeRetur} readOnly={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Total Retur</p>
                        <input type="text" className="col col-lg-2 col-md-3" id='input-total-retur' name='input-total-retur' value={getValueTotalRetur} readOnly={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah Uang yang Diterima</p>
                        <input type="text" className="col col-lg-2 col-md-3" id='input-detail-jumlah-uang' name='input-detail-jumlah-uang' value={getValueJumlahUangDiterima} readOnly={true} />
                        <div className='col-3 ps-2'>
                            <Select id='select-kode-akun' name='select-kode-akun' isClearable={true} isSearchable={true} options={getDataSelectAkun} value={getValueSelectedAkun} placeholder={'Select Akun...'} styles={CustomSelect} onChange={e => setValueSelectedAkun(e)} />
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-5 pt-2'>
                        <div>
                            <p>Upload File Transfer</p>
                            <input type="file" accept='.pdf' id='input-file-transfer' name='input-file-transfer' />
                        </div>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={Insert}>Simpan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <Link to={'/transaksi/pembelian/daftar-retur'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}