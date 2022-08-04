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

export default function Lap_tenaga_kerja() {
    const [getHTMLTableDaftarTenagaKerja, setHTMLTableDaftarTenagaKerja] = useStateWithCallbackLazy([]);

    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));
    
    const [getValueDetailTanggalAwal, setValueDetailTanggalAwal] = useState('');
    const [getValueDetailTanggalAkhir, setValueDetailTanggalAkhir] = useState('');

    const [getValueTotalBiaya, setValueTotalBiaya] = useState(0);

    useEffect(() => {
        $(`#table-data`).DataTable();
    }, []);

    const GetLaporan = () => {
        if (getValueTanggalAwal === '' || getValueTanggalAkhir === '') {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('tanggal_awal', getValueTanggalAwal);
        formData.append('tanggal_akhir', getValueTanggalAkhir);

        axios.post(`${baseURL}/api/laporan/produksi/tenaga-kerja/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarTenagaKerja = [];

            let totalBiaya = 0;

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarTenagaKerja.push(
                        <tr key={index}>
                            <td>{item.nama}</td>
                            <td>{item.departemen}</td>
                            <td>{item.kuantitas}</td>
                            <td>{item.nama_produk}</td>
                            <td>{item.upah}</td>
                            <td>{item.total_biaya}</td>
                        </tr>
                    );

                    totalBiaya += +item.total_biaya;
                });
            }

            $(`#table-data`).DataTable().destroy();

            setValueDetailTanggalAkhir(getValueTanggalAkhir);
            setValueDetailTanggalAwal(getValueTanggalAwal);
            setValueTotalBiaya(totalBiaya);
            setHTMLTableDaftarTenagaKerja(htmlTableDaftarTenagaKerja, () => {
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
                <p className={style.title}>Laporan Tenaga Kerja</p>
                <p className={style.pathname}>Laporan / Laporan Produksi / Laporan Tenaga Kerja</p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-3`}>Tanggal</p>
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
                        <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN TENAGA KERJA</p>
                        <br></br>
                        <div className={`${bootstrap[`d-flex`]}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Produksi</p>
                                <input type="date" id='input-tanggal-awal-produksi' name='input-tanggal-awal-produksi' value={getValueDetailTanggalAwal} readOnly={true} />
                                <p className={`${global.title} col-1 ps-2`}>s/d</p>
                                <input type="date" id='input-tanggal-akhir-produksi' name='input-tanggal-akhir-produksi' value={getValueDetailTanggalAkhir} readOnly={true} />
                            </div>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <td>Nama Tenaga Kerja</td>
                                        <td>Departemen</td>
                                        <td>Kuantitas Produksi</td>
                                        <td>Nama Produk</td>
                                        <td>Upah</td>
                                        <td>Total Biaya</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarTenagaKerja}
                                </tbody>
                            </table>
                            <div className={'d-flex align-items-center pe-2'}>
                                <p className={`${global.input_group_row} col-4`}>TOTAL BIAYA TENAGA KERJA</p>
                                <div className={'col-3'}>
                                    <input type="text" id='input-total-biaya-tenaga-kerja' name='input-total-biaya-tenaga-kerja' value={getValueTotalBiaya} readOnly={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
