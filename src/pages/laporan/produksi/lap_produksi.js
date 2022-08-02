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

export default function Lap_produksi() {

    const [getHTMLTableDaftarLaporan, setHTMLTableDaftarLaporan] = useStateWithCallbackLazy([]);

    const [getValueJenis, setValueJenis] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        $('#table-data').DataTable();
    }, []);

    const GetLaporan = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_produksi', getValueJenis.value.toLowerCase());
        formData.append('tanggal_awal', getValueTanggalAwal);
        formData.append('tanggal_akhir', getValueTanggalAkhir);
        
        axios.post(`${baseURL}/api/laporan/produksi/produksi/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarLaporan = [];
            
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarLaporan.push(
                        <tr key={index} className={'align-middle'}>
                            <td className='text-center'>{index+1}.</td>
                            <td>{item.tanggal}</td>
                            <td>{item.kode}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.lama}</td>
                            <td>{item.status}</td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            setHTMLTableDaftarLaporan(htmlTableDaftarLaporan, () => {
                $('#table-data').DataTable();
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
                <p className={style.title}>Laporan Produksi</p>
                <p className={style.pathname}>Laporan / Laporan Produksi / Laporan Produksi </p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <div className={`${global.input_group_row} col-6 `}>
                        <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Produksi Berdasarkan</p>
                        <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                            { value: 'Stok', label: 'Stok' },
                            { value: 'Pesanan', label: 'Pesanan' }
                        ]} placeholder={'Select Produksi...'} styles={CustomSelect} value={getValueJenis} onChange={e => setValueJenis(e)} />
                    </div>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Awal</p>
                            <input type="date" id='input-tanggal-awal' name='input-tanggal-awal' value={getValueTanggalAwal} onChange={e => setValueTanggalAwal(e.target.value)} />
                        </div>
                        <div className={`${global.input_group_row} col-6`}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Akhir</p>
                            <input type="date" id='input-tanggal-akhir' name='input-tanggal-akhir' value={getValueTanggalAkhir} onChange={e => setValueTanggalAkhir(e.target.value)} />
                        </div>
                    </div>
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
                        <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN PRODUKSI</p>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Produksi</p>
                                <input type="text" id='input-produksi' name='input-produksi' value={getValueJenis.value} readOnly={true} />
                            </div>
                        </div>
                        <div className={`${bootstrap[`d-flex`]}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Produksi</p>
                                <input type="date" id='input-tanggal-awal-produksi' name='input-tanggal-awal-produksi' value={getValueTanggalAwal} readOnly={true} />
                                <p className={`${global.title} col-1 ps-2`}>s/d</p>
                                <input type="date" id='input-tanggal-akhir-produksi' name='input-tanggal-akhir-produksi' value={getValueTanggalAkhir} readOnly={true} />
                            </div>
                        </div>
                        <br></br>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Tanggal Produksi</th>
                                        <th>Kode Produksi</th>
                                        <th>Jumlah</th>
                                        <th>Lama Produksi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarLaporan}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}