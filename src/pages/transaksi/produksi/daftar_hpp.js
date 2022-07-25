import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaCheck, FaPen, FaPlus } from 'react-icons/fa';
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

export default function Daftar_hpp() {

    const [getHTMLTableDaftarHPP, setHTMLTableDaftarHPP] = useStateWithCallbackLazy([]);

    useEffect(() => {
        GetHPP();
    }, []);

    const ApplyHPP = (kode) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let hargaJual = GetValue(`edit-harga-jual-${kode}`);

        const formData = new FormData();

        formData.append('kode', kode);
        formData.append('harga_jual', hargaJual);

        axios.post(`${baseURL}/api/transaksi/produksi/hpp/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${kode}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${kode}`).forEach(item => item.classList.add('d-none'));

            GetHPP();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const EditHPP = (kode) => {
        document.querySelectorAll(`.data-${kode}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${kode}`).forEach(item => item.classList.remove('d-none'));
    }

    const GetHPP = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/hpp/select.php`, config).then(response => {
            let data = response.data.data;

            console.log(data);

            let htmlTableDaftarHPP = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarHPP.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_produksi}</td>
                            <td>{item.tanggal_mulai}</td>
                            <td>{item.tanggal_selesai}</td>
                            <td>{item.biaya_bahan_baku}</td>
                            <td>{item.biaya_tenaga_kerja}</td>
                            <td>{item.biaya_overhead_pabrik}</td>
                            <td>{item.hpp}</td>
                            <td>{item.jumlah}</td>
                            <td>
                                <div id={`data-harga-jual-${item.kode}`} className={`data-${item.kode}`}>{item.harga_jual}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-harga-jual-${item.kode}`} className={`edit-${item.kode} d-none`} defaultValue={item.harga_jual} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td className={cx([global.table_action, 'text-nowrap'])}>
                                <button type='button' id={`button-apply-${item.kode}`} className={cx([global.apply, `d-none edit-${item.kode}`])} onClick={() => ApplyHPP(item.kode)}><FaCheck /> Apply</button>
                                <button type='button' id={`button-edit-${item.kode}`} className={cx([global.edit, `data-${item.kode}`])} onClick={() => EditHPP(item.kode)}><FaPen /> Edit</button>
                                {localStorage.getItem('leksana_jabatan').toLowerCase() !== 'owner' &&
                                    <Link to={'/transaksi/produksi/hpp'} state={{ data: item }} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><FaPlus /> Tambah Biaya</Link>
                                }
                            </td>
                        </tr>
                    );
                });
            }

            setHTMLTableDaftarHPP(htmlTableDaftarHPP, () => {
                $(`#table-data`).DataTable();

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        })
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Proses Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Proses Produksi</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Proses Produksi</p>
                        {['designer', 'cap/canting', 'pewarnaan', 'packing', 'super admin'].some(item => item === localStorage.getItem('leksana_jabatan').toLowerCase()) &&
                            <Link to={'/transaksi/produksi/hpp'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        }
                    </div>
                    <form id='form-table' className={`table-responsive`}>
                        <table id='table-data' className={`table w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>No.</td>
                                    <td>Kode HPP</td>
                                    <td>Kode Produksi</td>
                                    <td>Tanggal Mulai</td>
                                    <td>Tanggal Selesai</td>
                                    <td>Biaya Bahan Baku</td>
                                    <td>Biaya Tenaga Kerja</td>
                                    <td>Biaya Overhead Pabrik</td>
                                    <td>HPP</td>
                                    <td>Jumlah</td>
                                    <td>Harga Jual</td>
                                    <td>Aksi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarHPP}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}