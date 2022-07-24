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

                if (data && data.length > 0 && jenis === 'stok') {
                    data.forEach((item, index) => {
                        htmlTableDaftarStok.push(
                            <tr key={index} className={'align-middle'}>
                                <td>{index + 1}.</td>
                                <td>{item.tanggal}</td>
                                <td>{item.kode}</td>
                                <td>{item.nama_produk}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.lama}</td>
                                <td>{+item.status === 0 ? 'Menunggu' : +item.status === 1 ? 'Proses' : 'Selesai'}</td>
                                {+item.status === 0 && <td>Menunggu</td>}
                                {+item.status === 1 &&
                                    <td className={cx([global.table_action, 'text-nowrap'])}>
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => UpdateStatus(jenis, item)}>Selesai</button>
                                    </td>
                                }
                                {+item.status === 2 &&
                                    <td>
                                        <FaCheck />
                                    </td>
                                }
                            </tr >
                        );
                    });

                    setHTMLTableDaftarStok(htmlTableDaftarStok, () => {
                        $(`#table-data-stok`).DataTable();
                    });
                }

                if (data && data.length > 0 && jenis === 'pesanan') {
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
                                <td>{+item.status === 0 ? 'Menunggu' : +item.status === 1 ? 'Proses' : 'Selesai'}</td>
                                {+item.status === 0 ?
                                    <td className={cx([global.table_action, 'text-nowrap'])}>
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => UpdateStatus(jenis, item)}>Selesai</button>
                                    </td>
                                    :
                                    <td>
                                        <FaCheck />
                                    </td>
                                }
                            </tr>
                        );
                    });

                    setHTMLTableDaftarPesanan(htmlTableDaftarPesanan, () => {
                        $(`#table-data-pesanan`).DataTable();
                    });
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

        formData.append('kode', data.kode);
        formData.append('kode_produk', data.kode_produk);
        formData.append('jumlah', data.jumlah);
        formData.append('hpp_per_produk', data.hpp_per_produk);
        formData.append('harga_jual', data.harga_jual);
        formData.append('status', 2);
        formData.append('jenis_produksi', jenis);

        axios.post(`${baseURL}/api/transaksi/produksi/perencanaan-produksi/update.php`, formData, config).then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Produksi</p>
                <p className={style.pathname}>Transaksi / Produksi / Perencanaan Produksi</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.tab_card} pb-2`}>
                    <div className={`${global.item} ${getSelectedTab === 0 ? global.active : ''}`} onClick={() => setSelectedTab(0)}>
                        <p className={`${global.name}`}>Produksi Stok</p>
                    </div>
                    <div className={`${global.item} ${getSelectedTab === 1 ? global.active : ''}`} onClick={() => setSelectedTab(1)}>
                        <p className={`${global.name}`}>Produksi Pesanan</p>
                    </div>
                </div>
                <div className={`${global.card} col-12 ${getSelectedTab === 1 && 'd-none'}`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Perencanaan Produksi Stok</p>
                        <Link to={'/transaksi/produksi/produksi'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    </div>
                    <div className={`table-responsive`}>
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
                                    <td>Aksi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {getHTMLTableDaftarStok}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${global.card} col-12 ${getSelectedTab === 0 && 'd-none'}`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Perencanaan Produksi Pesanan</p>
                        <Link to={'/transaksi/produksi/produksi'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    </div>
                    <div className={`table-responsive`}>
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
                                    <td>Aksi</td>
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