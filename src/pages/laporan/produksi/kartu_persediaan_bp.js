import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { baseURL, config, cx, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'black',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'black'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)',
        color: state.isSelected ? 'rgba(0, 0, 0, 0.6)' : 'black',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(0, 0, 0, 0.8)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'black',
        fontSize: 12
    })
}

export default function Kartu_persediaan_bp() {

    const [getDataExport, setDataExport] = useState([]);

    const [getDataSelectBahanPenolong, setDataSelectBahanPenolong] = useState([]);

    const [getHTMLTableDaftarBahanPenolong, setHTMLTableDaftarBahanPenolong] = useStateWithCallbackLazy([]);

    const [getValueKodeBahanPenolong, setValueKodeBahanPenolong] = useState([]);
    const [getValueNamaBahanPenolong, setValueNamaBahanPenolong] = useState('');
    const [getValueJenis, setValueJenis] = useState([]);
    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        $(`#table-data`).DataTable();
        GetBahanPenolong();
    }, []);

    const GetBahanPenolong = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/bahan-penolong/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectBahanPenolong = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectBahanPenolong.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            setDataSelectBahanPenolong(dataSelectBahanPenolong);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetLaporan = () => {
        if (!getValueKodeBahanPenolong || getValueKodeBahanPenolong.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        // if (getValueJenis.value === 'Tanggal' && (getValueTanggalAwal === '' || getValueTanggalAkhir === '')) {
        //     alert('Isi data dengan benar');
        //     return;
        // }

        // if (getValueJenis.value === 'BahanPenolong' && (!getValueKodeBahanPenolong || getValueKodeBahanPenolong.length <= 0)) {
        //     alert('Isi data dengan benar');
        //     return;
        // }

        ShowLoading();

        const formData = new FormData();

        // formData.append('jenis_laporan', getValueJenis.value.toLowerCase());

        // if (getValueJenis.value === 'Tanggal') {
        //     formData.append('tanggal_awal', getValueTanggalAwal);
        //     formData.append('tanggal_akhir', getValueTanggalAkhir);
        // } else if (getValueJenis.value === 'Bahan Penolong') {
            formData.append('kode_item', getValueKodeBahanPenolong.value);

            setValueNamaBahanPenolong(getValueKodeBahanPenolong.label);
        // }

        axios.post(`${baseURL}/api/laporan/produksi/bahan-penolong/select.php`, formData, config).then(response => {
            let data = response.data.data;
            let master = response.data.master;

            let htmlTableDaftarBahanPenolong = [];
            let dataExport = [];

            dataExport.push([
                'Laporan Kartu Bahan Penolong',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]);

            dataExport.push([
                'Tanggal',
                'Nama',
                'Unit Masuk',
                'Harga Masuk',
                'Jumlah Masuk',
                'Unit Keluar',
                'Harga Keluar',
                'Jumlah Keluar',
                'Unit Saldo',
                'Harga Saldo',
                'Jumlah Saldo'
            ]);

            if (data && data.length > 0) {
                data.forEach(item => {
                    master.unit_saldo = +master.unit_saldo + +item.unit_keluar - +item.unit_masuk;
                    master.jumlah_saldo = +master.jumlah_saldo + +item.jumlah_keluar - +item.jumlah_masuk;
                    master.harga_saldo = Math.ceil(+master.jumlah_saldo / +master.unit_saldo);
                });
            }

            if (master) {
                htmlTableDaftarBahanPenolong.push(
                    <tr key={'-1'}>
                        <td>{master.tanggal}</td>
                        <td>Master {master.nama}</td>
                        <td>{SetNumberFormat(master.unit_masuk)}</td>
                        <td>{SetPriceFormat(master.harga_masuk)}</td>
                        <td>{SetPriceFormat(master.jumlah_masuk)}</td>
                        <td>{SetNumberFormat(master.unit_keluar)}</td>
                        <td>{SetPriceFormat(master.harga_keluar)}</td>
                        <td>{SetPriceFormat(master.jumlah_keluar)}</td>
                        <td>{SetNumberFormat(master.unit_saldo)}</td>
                        <td>{SetPriceFormat(master.harga_saldo ?? 0)}</td>
                        <td>{SetPriceFormat(master.jumlah_saldo)}</td>
                    </tr>
                );

                dataExport.push([
                    master.tanggal,
                    master.nama,
                    SetNumberFormat(master.unit_masuk),
                    SetPriceFormat(master.harga_masuk),
                    SetPriceFormat(master.jumlah_masuk),
                    SetNumberFormat(master.unit_keluar),
                    SetPriceFormat(master.harga_keluar),
                    SetPriceFormat(master.jumlah_keluar),
                    SetNumberFormat(master.unit_saldo),
                    SetPriceFormat(master.harga_saldo),
                    SetPriceFormat(master.jumlah_saldo)
                ]);
            }

            let currentUnitSaldo = master.unit_saldo;
            let currentJumlahSaldo = master.jumlah_saldo;
            let currentHargaSaldo = master.harga_saldo;

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    currentUnitSaldo = +currentUnitSaldo + +item.unit_masuk - +item.unit_keluar;
                    currentJumlahSaldo = +currentJumlahSaldo + +item.jumlah_masuk - +item.jumlah_keluar;
                    currentHargaSaldo = Math.ceil(+currentJumlahSaldo / +currentUnitSaldo);

                    htmlTableDaftarBahanPenolong.push(
                        <tr key={index}>
                            <td>{item.tanggal}</td>
                            <td>{item.keterangan}</td>
                            <td>{SetNumberFormat(item.unit_masuk)}</td>
                            <td>{SetPriceFormat(item.harga_masuk)}</td>
                            <td>{SetPriceFormat(item.jumlah_masuk)}</td>
                            <td>{SetNumberFormat(item.unit_keluar)}</td>
                            <td>{SetPriceFormat(item.harga_keluar)}</td>
                            <td>{SetPriceFormat(item.jumlah_keluar)}</td>
                            <td>{SetNumberFormat(currentUnitSaldo)}</td>
                            <td>{SetPriceFormat(currentHargaSaldo)}</td>
                            <td>{SetPriceFormat(currentJumlahSaldo)}</td>
                        </tr>
                    );

                    dataExport.push([
                        item.tanggal,
                        item.nama,
                        SetNumberFormat(item.unit_masuk),
                        SetPriceFormat(item.harga_masuk),
                        SetPriceFormat(item.jumlah_masuk),
                        SetNumberFormat(item.unit_keluar),
                        SetPriceFormat(item.harga_keluar),
                        SetPriceFormat(item.jumlah_keluar),
                        SetNumberFormat(item.currentUnitSaldo),
                        SetPriceFormat(item.currentHargaSaldo),
                        SetPriceFormat(item.currentJumlahSaldo)
                    ]);
                });
            }

            $(`#table-data`).DataTable().destroy();

            setDataExport(dataExport);
            setHTMLTableDaftarBahanPenolong(htmlTableDaftarBahanPenolong, () => {
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
                <p className={style.title}>Kartu Persediaan Bahan Penolong</p>
                <p className={style.pathname}>Laporan / Laporan Produksi / Kartu Persediaan Bahan Penolong</p>
            </div>
            <div className={style.content}>
                <div className={global.card}>
                    {/* <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-8 `}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Berdasarkan</p>
                            <Select isClearable={true} isSearchable={true} options={[
                                { value: 'Tanggal', label: 'Tanggal' },
                                { value: 'Bahan Penolong', label: 'Bahan Penolong' }
                            ]} placeholder={'Pilih Kartu...'} styles={CustomSelect} onChange={e => setValueJenis(e)} className='col-7' />
                        </div>
                    </div> */}
                    {/* {getValueJenis && getValueJenis.value === 'Tanggal' ?
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
                        getValueJenis && getValueJenis.value === 'Bahan Penolong' ? */}
                            <div className={`${global.input_group_row} col-4`}>
                                <p className={`${global.title} col-6`}>Nama Bahan Penolong</p>
                                <Select isClearable={true} isSearchable={true} options={getDataSelectBahanPenolong} placeholder={'Pilih Bahan Penolong...'} styles={CustomSelect} value={getValueKodeBahanPenolong} onChange={e => setValueKodeBahanPenolong(e)} className='col-7' />
                            </div>
                            {/* :
                            null
                    } */}
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
                        <div className={`${global.cursor_pointer} ms-auto pe-5`}>
                            <CSVLink data={getDataExport} filename={`Laporan Kartu Bahan Penolong ${getValueTanggalAwal} - ${getValueTanggalAkhir}`}>
                                <TiExport className='fs-4' />
                            </CSVLink>
                        </div>
                    </div>
                    <div className={cx([global.card, global.boxless])}>
                        <p className={`${style.title} text-center w-100 fw-bold`}>LEKSANA BATIK JAYA</p>
                        <p className={`${style.title} text-center w-100 fw-bold`}>KARTU PERSEDIAAN BAHAN PENOLONG</p>
                        <br></br>
                        <div className={`${bootstrap[`d-flex`]}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0 pe-2`}>Nama Bahan</p>
                                <input type="text" id='input-nama-bahan-penolong' name='input-nama-bahan-penolong' value={getValueNamaBahanPenolong} readOnly={true} />
                            </div>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td colSpan={3}>Persediaan Masuk</td>
                                        <td colSpan={3}>Persediaan Keluar</td>
                                        <td colSpan={3}>Saldo</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal</td>
                                        <td>Keterangan</td>
                                        <td>Unit</td>
                                        <td>Harga</td>
                                        <td>Jumlah</td>
                                        <td>Unit</td>
                                        <td>Harga</td>
                                        <td>Jumlah</td>
                                        <td>Unit</td>
                                        <td>Harga</td>
                                        <td>Jumlah</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarBahanPenolong}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
