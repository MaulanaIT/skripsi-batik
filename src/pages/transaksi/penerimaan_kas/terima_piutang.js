import React, { useState, useEffect } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { baseURL, config, cx, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/kalkulator_estimasi.module.css';

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

export default function Terima_piutang() {

    const [getDataBelumLunas, setDataBelumLunas] = useState([]);
    const [getDataLunas, setDataLunas] = useState([]);
    const [getDataSelectAkun, setDataSelectAkun] = useState([]);

    const [getHTMLTableDaftarBelumLunas, setHTMLTableDaftarBelumLunas] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarLunas, setHTMLTableDaftarLunas] = useStateWithCallbackLazy([]);

    const [getValueKodeAkun, setValueKodeAkun] = useState([]);
    const [getValueKodeConsignee, setValueKodeConsignee] = useState('');
    const [getValueKodeJual, setValueKodeJual] = useState('');
    const [getValueKodeTerimaPiutang, setValueKodeTerimaPiutang] = useState('');
    const [getValueNamaConsignee, setValueNamaConsignee] = useState('');
    const [getValueJumlahPiutang, setValueJumlahPiutang] = useState(0);
    const [getValueSisaPiutang, setValueSisaPiutang] = useState(0);
    const [getValueTerimaPiutang, setValueTerimaPiutang] = useState(0);
    const [getValueTanggal, setValueTanggal] = useState('');

    const [getSelectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        GetAkun();
        GetKonsinyasi();
        GetTerimaPiutang();
    }, []);

    const Clear = () => {
        setValueKodeAkun([]);
        setValueKodeConsignee('');
        setValueNamaConsignee('');
        setValueKodeJual('');
        setValueJumlahPiutang(0);
        setValueSisaPiutang(0);
        setValueTerimaPiutang(0);
    }

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

    const GetKonsinyasi = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_penjualan', 'konsinyasi');

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let dataLunas = [...data.filter(item => +item.sisa === 0)];
            let dataBelumLunas = [...data.filter(item => +item.sisa > 0)];

            let htmlTableDaftarBelumLunas = [];
            let htmlTableDaftarLunas = [];

            if (dataBelumLunas && dataBelumLunas.length > 0) {
                dataBelumLunas.forEach((item, index) => {
                    htmlTableDaftarBelumLunas.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode_consignee}</td>
                            <td>{item.nama_consignee}</td>
                            <td>{item.piutang}</td>
                            <td>{item.terima_piutang}</td>
                            <td>{item.sisa}</td>
                            <td className={cx([global.table_action, 'text-nowrap'])}>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => SelectKonsinyasi(item)}>Terima Piutang</button>
                            </td>
                        </tr>
                    );
                });
            }

            if (dataLunas && dataLunas.length > 0) {
                dataLunas.forEach((item, index) => {
                    htmlTableDaftarLunas.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode_consignee}</td>
                            <td>{item.nama_consignee}</td>
                            <td>{item.jumlah_piutang}</td>
                            <td className={cx([global.table_action, 'text-nowrap'])}>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }}>Print</button>
                            </td>
                        </tr>
                    );
                });
            }

            setDataBelumLunas(dataBelumLunas);
            setDataLunas(dataLunas);

            setHTMLTableDaftarBelumLunas(htmlTableDaftarBelumLunas, () => {
                $(`#table-data-belum-lunas`).DataTable();
            });
            setHTMLTableDaftarLunas(htmlTableDaftarLunas, () => {
                $(`#table-data-lunas`).DataTable();
            });

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetTerimaPiutang = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penerimaan-kas/terima-piutang/select.php`, config).then(response => {
            setValueKodeTerimaPiutang(GenerateCode('TP', response.data.data));
            setValueTanggal(moment().format('YYYY-MM-DD'));

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertTerimaPiutang = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeTerimaPiutang);
        formData.append('kode_akun', getValueKodeAkun.value);
        formData.append('kode_jual', getValueKodeJual);
        formData.append('kode_consignee', getValueKodeConsignee);
        formData.append('jumlah_piutang', getValueJumlahPiutang);
        formData.append('sisa', +getValueSisaPiutang - +getValueTerimaPiutang);
        formData.append('terima_piutang', getValueTerimaPiutang);

        axios.post(`${baseURL}/api/transaksi/penerimaan-kas/terima-piutang/insert.php`, formData, config).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const SelectedTab = index => {
        setSelectedTab(index);
    }

    const SelectKonsinyasi = (data) => {
        setValueKodeConsignee(data.kode_consignee);
        setValueKodeJual(data.kode);
        setValueNamaConsignee(data.nama_consignee);
        setValueSisaPiutang(data.sisa);
        setValueJumlahPiutang(data.piutang);
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Terima Piutang</p>
                <p className={style.pathname}>Transaksi / Penerimaan Kas / Terima Piutang</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`col-12 col-md-7 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.tab_card} pb-2`}>
                        <div className={`${global.item} ${getSelectedTab === 0 ? global.active : ''}`} onClick={() => SelectedTab(0)}>
                            <p className={`${global.name}`}>Belum Lunas</p>
                        </div>
                        <div className={`${global.item} ${getSelectedTab === 1 ? global.active : ''}`} onClick={() => SelectedTab(1)}>
                            <p className={`${global.name}`}>Sudah Lunas</p>
                        </div>
                    </div>
                    <div className={global.card}>
                            <div className={`table-responsive ${getSelectedTab !== 0 && 'd-none'}`}>
                                <table id='table-data-belum-lunas' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Jual</td>
                                            <td>Tanggal</td>
                                            <td>Kode Consignee</td>
                                            <td>Nama Consignee</td>
                                            <td>Jumlah Piutang</td>
                                            <td>Terima Piutang</td>
                                            <td>Sisa Piutang</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarBelumLunas}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`table-responsive ${getSelectedTab !== 1 && 'd-none'}`}>
                                <table id='table-data-lunas' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Jual</td>
                                            <td>Tanggal</td>
                                            <td>Kode Consignee</td>
                                            <td>Nama Consignee</td>
                                            <td>Jumlah Piutang</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarLunas}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
                <div className={`col-12 col-md-5 ps-md-2 pt-2 pt-md-0`}>
                    <div className={`${global.card}`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Terima Piutang</p>
                        </div>
                        <div className='d-flex'>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Terima Piutang</p>
                                <input type="text" id='input-kode-terima-piutang' name='input-kode-terima-piutang' value={getValueKodeTerimaPiutang} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Tanggal</p>
                                <input type="date" id='input-tanggal' name='input-tanggal' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-5 pe-2`}>
                                <p className={global.title}>Kode Consignee</p>
                                <input type="text" id='input-kode-consignee' name='input-kode-consignee' value={getValueKodeConsignee} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-7 pe-2`}>
                                <p className={global.title}>Nama Consignee</p>
                                <input type="text" id='input-nama-consignee' name='input-nama-consignee' value={getValueNamaConsignee} readOnly={true} />
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Jual</p>
                                <input type="text" id='input-kode-jual' name='input-kode-jual' value={getValueKodeJual} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Sisa Piutang</p>
                                <input type="text" id='input-sisa-piutang' name='input-sisa-piutang' value={getValueSisaPiutang} readOnly={true} />
                            </div>
                        </div>
                        <div>
                            <p className={global.title}>Pelunasan</p>
                        </div>
                        <div className='d-flex'>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Pilih Akun</p>
                                <Select id='select-jenis-akun' name='select-jenis-akun' isClearable={true} isSearchable={true} options={getDataSelectAkun} placeholder={'Select Jenis Akun...'} value={getValueKodeAkun} styles={CustomSelect} onChange={e => setValueKodeAkun(e)} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Terima Piutang</p>
                                <input type="text" id='input-terima-piutang' name='input-terima-piutang' value={getValueTerimaPiutang} onChange={e => setValueTerimaPiutang(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={InsertTerimaPiutang}>Simpan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }} onClick={Clear}>Batal</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}