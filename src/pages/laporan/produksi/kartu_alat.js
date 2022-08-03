import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/kas/penerimaan_kas.module.css';

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

export default function Kartu_alat() {

    const [getDataSelectAlat, setDataSelectAlat] = useState([]);

    const [getHTMLTableDaftarAlat, setHTMLTableDaftarAlat] = useStateWithCallbackLazy([]);

    const [getValueKodeAlat, setValueKodeAlat] = useState([]);
    const [getValueNamaAlat, setValueNamaAlat] = useState('');
    const [getValueJenis, setValueJenis] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        $(`#table-data`).DataTable();
        GetAlat();
    }, []);

    const GetAlat = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/alat/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectAlat = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectAlat.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            setDataSelectAlat(dataSelectAlat);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetLaporan = () => {
        if (!getValueJenis || getValueJenis.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        if (getValueJenis.value === 'Tanggal' && (getValueTanggalAwal === '' || getValueTanggalAkhir === '')) {
            alert('Isi data dengan benar');
            return;
        }

        if (getValueJenis.value === 'Alat' && (!getValueKodeAlat || getValueKodeAlat.length <= 0)) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_laporan', getValueJenis.value.toLowerCase());

        if (getValueJenis.value === 'Tanggal') {
            formData.append('tanggal_awal', getValueTanggalAwal);
            formData.append('tanggal_akhir', getValueTanggalAkhir);
        } else if (getValueJenis.value === 'Alat') {
            formData.append('kode_item', getValueKodeAlat.value);

            setValueNamaAlat(getValueKodeAlat.label);
        }

        axios.post(`${baseURL}/api/laporan/produksi/alat/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarAlat = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarAlat.push(
                        <tr key={index}>
                            <td>{item.tanggal}</td>
                            <td>{item.keterangan}</td>
                            <td>{item.unit_masuk}</td>
                            <td>{item.kapasitas_masuk}</td>
                            <td>{item.unit_keluar}</td>
                            <td>{item.kapasitas_keluar}</td>
                            <td>{item.unit_saldo}</td>
                            <td>{item.kapasitas_saldo}</td>
                        </tr>
                    );
                });
            }

            $(`#table-data`).DataTable().destroy();

            setHTMLTableDaftarAlat(htmlTableDaftarAlat, () => {
                $(`#table-data`).DataTable();
            });

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Kartu Alat</p>
                <p className={style.pathname}>Laporan / Laporan Produksi / Kartu Alat</p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-8 `}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Berdasarkan</p>
                            <Select isClearable={true} isSearchable={true} options={[
                                { value: 'Tanggal', label: 'Tanggal' },
                                { value: 'Alat', label: 'Alat' }
                            ]} placeholder={'Pilih Kartu...'} styles={CustomSelect} onChange={e => setValueJenis(e)} className='col-7' />
                        </div>
                    </div>
                    {getValueJenis && getValueJenis.value === 'Tanggal' ?
                        <div className={`${global.input_group_row} col-4`}>
                            <p className={`${global.title} col-6`}>Tanggal</p>
                            <div>
                                <input type="date" className={global.input1} id='input-tanggal-awal' name='input-tanggal-awal' value={getValueTanggalAwal} onChange={e => setValueTanggalAwal(e.target.value)} />
                            </div>
                            <div>
                                <p className={`${global.title} col-auto px-3`}>sampai</p>
                            </div>
                            <div>
                                <input type="date" className={global.input1} id='input-tanggal-akhir' name='input-tanggal-akhir' value={getValueTanggalAkhir} onChange={e => setValueTanggalAkhir(e.target.value)} />
                            </div>
                        </div>
                        :
                        getValueJenis && getValueJenis.value === 'Alat' ?
                            <div className={`${global.input_group_row} col-4`}>
                                <p className={`${global.title} col-6`}>Nama Alat</p>
                                <Select isClearable={true} isSearchable={true} options={getDataSelectAlat} placeholder={'Pilih Alat...'} styles={CustomSelect} value={getValueKodeAlat} onChange={e => setValueKodeAlat(e)} className='col-7' />
                            </div>
                            :
                            null
                    }
                    <div className='d-flex flex-column gap-2 pt-2'>
                        <div className='d-flex'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={GetLaporan}>Cek Laporan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${global.card} col-12`}>
                    <div className='d-flex'>
                        <div className='col-10'>
                            <p className={global.title}></p>
                        </div>
                        <div className='col-1 ps-5'>
                            <TiExport className='fs-4' />
                        </div>
                        <div className='col-1 pe-5'>
                            <AiFillPrinter className='fs-4' />
                        </div>
                    </div>
                    <div className={global.card}>
                        <p className={`${style.title} text-center w-100 fw-bold`}>LEKSANA BATIK JAYA</p>
                        <p className={`${style.title} text-center w-100 fw-bold`}>KARTU ALAT</p>
                        <br></br>
                        <div className={`${bootstrap[`d-flex`]}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0 pe-2`}>Nama Alat</p>
                                <input type="text" id='input-nama-bahan' name='input-nama-bahan' value={getValueNamaAlat} readOnly={true} />
                            </div>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td colSpan={2}>Persediaan Masuk</td>
                                        <td colSpan={2}>Persediaan Keluar</td>
                                        <td colSpan={2}>Saldo</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal</td>
                                        <td>Keterangan</td>
                                        <td>Unit</td>
                                        <td>Kapasitas</td>
                                        <td>Unit</td>
                                        <td>Kapasitas/Pemakaian</td>
                                        <td>Unit</td>
                                        <td>Kapasitas</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarAlat}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
