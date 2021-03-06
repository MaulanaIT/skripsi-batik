import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { baseURL, config, cx, HideLoading, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

export default function Daftar_produksi() {

    const [getHTMLTableDaftarPesanan, setHTMLTableDaftarPesanan] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarStok, setHTMLTableDaftarStok] = useStateWithCallbackLazy([]);

    const [getSelectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        GetPerencanaanProduksi();
    }, []);

    const GetPerencanaanProduksi = () => {
        let htmlTableDaftarStok = [];
        let htmlTableDaftarPesanan = [];

        ['stok', 'pesanan'].forEach(jenis => {
            ShowLoading();

            const formData = new FormData();

            formData.append('jenis_produksi', jenis);

            axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/select.php`, formData, config).then(response => {
                let data = response.data.data;

                let jabatan = localStorage.getItem('leksana_jabatan').toLowerCase();

                if (jenis === 'stok') {
                    if (data && data.length > 0) {
                        data.forEach((item, index) => {
                            htmlTableDaftarStok.push(
                                <tr key={index} className={'align-middle'}>
                                    <td>{index + 1}.</td>
                                    <td>{item.tanggal}</td>
                                    <td>{item.kode}</td>
                                    <td>{item.nama_produk}</td>
                                    <td>{item.jumlah}</td>
                                    <td>{item.lama}</td>
                                    <td>{+item.status === 0 ? 'Proses' : 'Selesai'}</td>
                                    {(jabatan === 'packing' || jabatan === 'super admin') ?
                                        +item.status === 0 ?
                                            <td className={cx([global.table_action, 'text-nowrap'])}>
                                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => UpdateStatus(jenis, item)}>Selesai</button>
                                            </td>
                                            :
                                            <td>
                                                <FaCheck />
                                            </td>
                                        :
                                        null
                                    }
                                </tr >
                            );
                        });

                        setHTMLTableDaftarStok(htmlTableDaftarStok, () => {
                            $(`#table-data-stok`).DataTable();
                        });
                    } else {
                        setHTMLTableDaftarStok([], () => {
                            $(`#table-data-stok`).DataTable();
                        });
                    }
                }

                if (jenis === 'pesanan') {
                    if (data && data.length > 0) {
                        data.forEach((item, index) => {
                            htmlTableDaftarPesanan.push(
                                <tr key={index} className={'align-middle'}>
                                    <td>{index + 1}.</td>
                                    <td>{item.tanggal}</td>
                                    <td>{item.tanggal_pesan}</td>
                                    <td>{item.kode}</td>
                                    <td>{item.nama_pesanan}</td>
                                    <td>{item.nama_customer}</td>
                                    <td>{item.jumlah}</td>
                                    <td>{item.lama}</td>
                                    <td>{+item.status === 0 ? 'Proses' : 'Selesai'}</td>
                                    {(jabatan === 'packing' || jabatan === 'super admin') ?
                                        +item.status === 0 ?
                                            <td className={cx([global.table_action, 'text-nowrap'])}>
                                                <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => UpdateStatus(jenis, item)}>Selesai</button>
                                            </td>
                                            :
                                            <td>
                                                <FaCheck />
                                            </td>
                                        :
                                        null
                                    }
                                </tr>
                            );
                        });

                        setHTMLTableDaftarPesanan(htmlTableDaftarPesanan, () => {
                            $(`#table-data-pesanan`).DataTable();
                        });
                    } else {
                        setHTMLTableDaftarPesanan([], () => {
                            $(`#table-data-pesanan`).DataTable();
                        });
                    }
                }

                HideLoading();
            }).catch(error => {
                console.log(error);

                alert(error);

                HideLoading();
            });
        });
    }

    const UpdateStatus = (jenis, data) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_produksi', jenis);

        if (jenis === 'stok') {
            formData.append('kode', data.kode);
            formData.append('kode_produk', data.kode_produk);
            formData.append('jumlah', data.jumlah);
            formData.append('hpp_per_produk', data.hpp_per_produk);
            formData.append('harga_jual', data.harga_jual);
            formData.append('status', 1);

            axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/update.php`, formData, config).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error);

                alert(error);

                HideLoading();
            });
        } else if (jenis === 'pesanan') {
            formData.append('kode', data.kode_pesanan);
            formData.append('hpp', data.hpp);

            axios.post(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/update.php`, formData, config).then(() => {
                window.location.reload();
            }).catch(error => {
                console.log(error);

                alert(error);

                HideLoading();
            });
        }
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Perencanaan Produksi</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.tab_card} pb-2 w-100`}>
                    <div className={`${global.item} ${getSelectedTab === 0 ? global.active : ''}`} onClick={() => setSelectedTab(0)}>
                        <p className={`${global.name}`}>Produksi Stok</p>
                    </div>
                    <div className={`${global.item} ${getSelectedTab === 1 ? global.active : ''}`} onClick={() => setSelectedTab(1)}>
                        <p className={`${global.name}`}>Produksi Pesanan</p>
                    </div>
                    {(localStorage.getItem('leksana_jabatan').toLowerCase() === 'gudang, pembelian' || localStorage.getItem('leksana_jabatan').toLowerCase() === 'super admin' || localStorage.getItem('leksana_jabatan').toLowerCase() === 'owner') &&
                        <Link to={'/transaksi/produksi/produksi'} className={`${global.button} ms-auto`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    }
                </div>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Perencanaan Produksi {getSelectedTab === 0 ? 'Stok' : 'Pesanan'}</p>
                    </div>
                    <div className={`table-responsive ${getSelectedTab === 1 && 'd-none'}`}>
                        <table id='table-data-stok' className={`table w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>No.</td>
                                    <td>Tanggal Produksi</td>
                                    <td>Kode Produksi</td>
                                    <td>Nama Produk</td>
                                    <td>Jumlah</td>
                                    <td>Lama Produksi</td>
                                    <td>Status</td>
                                    {(localStorage.getItem('leksana_jabatan').toLowerCase() === 'packing' || localStorage.getItem('leksana_jabatan').toLowerCase() === 'super admin') &&
                                        <td>Aksi</td>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarStok}
                            </tbody>
                        </table>
                    </div>
                    <div className={`table-responsive ${getSelectedTab === 0 && 'd-none'}`}>
                        <table id='table-data-pesanan' className={`table w-100`}>
                            <thead className='text-nowrap'>
                                <tr>
                                    <td>No.</td>
                                    <td>Tanggal Produksi</td>
                                    <td>Tanggal Pesan</td>
                                    <td>Kode Produksi</td>
                                    <td>Nama Pesanan</td>
                                    <td>Nama Customer</td>
                                    <td>Jumlah</td>
                                    <td>Lama Produksi</td>
                                    <td>Status</td>
                                    {(localStorage.getItem('leksana_jabatan').toLowerCase() === 'packing' || localStorage.getItem('leksana_jabatan').toLowerCase()
                                        === 'super admin') &&
                                        <td>Aksi</td>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarPesanan}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}