import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPrint, FaTrash } from 'react-icons/fa';
import { baseURL, config, cx, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/daftar_pesanan.module.css';

export class daftar_pesanan extends Component {

    state = {
        dataSelectedPesanan: [],

        htmlTableDaftarPesanan: [],
        htmlTableDaftarDetailPesanan: []
    }

    componentDidMount() {
        this.GetPesanan();
    }

    DeletePesanan = (kode) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/delete.php`, formData, config).then(() => {
            this.GetPesanan();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    GetPesanan = () => {
        axios.get(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/select.php`, config).then(response => {
            ShowLoading();

            let dataPesanan = response.data.data;

            let htmlTableDaftarPesanan = [];

            if (dataPesanan.length > 0) {
                dataPesanan.forEach((item, index) => {
                    htmlTableDaftarPesanan.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>
                                <div id={`data-kode-${item.id}`}>{item.kode}</div>
                            </td>
                            <td>
                                <div id={`data-nama-pesanan-${item.id}`} className={`data-${item.id}`}>{item.nama}</div>
                            </td>
                            <td>
                                <div id={`data-tanggal-${item.id}`} className={`data-${item.id}`}>{item.tanggal}</div>
                            </td>
                            <td>
                                <div id={`data-kode-customer-${item.id}`} className={`data-${item.id} text-end`}>{item.kode_customer}</div>
                            </td>
                            <td>
                                <div id={`data-nama-customer-${item.id}`} className={`data-${item.id}`}>{item.nama_customer}</div>
                            </td>
                            <td>
                                <div id={`data-jenis-produk-${item.id}`} className={`data-${item.id}`}>{item.jenis_produk}</div>
                            </td>
                            <td>
                                <div id={`data-jumlah-${item.id}`} className={`data-${item.id}`}>{item.jumlah}</div>
                            </td>
                            <td>
                                <div id={`data-hpp-${item.id}`} className={`data-${item.id}`}>{item.hpp}</div>
                            </td>
                            <td>
                                <div id={`data-harga-jual-${item.id}`} className={`data-${item.id}`}>{item.harga_jual}</div>
                            </td>
                            <td>
                                <div id={`data-status-${item.id}`} className={`data-${item.id}`}>{+item.status === 0 ? 'Menunggu' : +item.status === 1 ? 'Uang Muka Diterima' : 'Selesai'}</div>
                            </td>
                            <td className={cx([global.table_action, 'text-nowrap'])}>
                                {+item.status === 0 ?
                                    <Link to={'/transaksi/penerimaan-kas/uang-muka-pesanan'} state={{ data: item }} className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }}>Terima Uang Muka</Link>
                                    :
                                    <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} disabled={true}>Terima Uang Muka</button>
                                }
                                {+item.status === 1 ?
                                    <Link to={'/transaksi/penjualan/jual-pesan'} state={{ data: item }} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Penyerahan Pesanan</Link>
                                    :
                                    <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }} disabled={true}>Penyerahan Pesanan</button>
                                }
                                <button type='button' id='button-print' className={global.apply}><FaPrint /> Print</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeletePesanan(item.kode)} disabled={+item.status === 2 && true}><FaTrash /> Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarPesanan: htmlTableDaftarPesanan }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    SelectDetail = (data) => {
        $(`#table-detail-data-pesanan`).DataTable();
    }

    render() {
        return (
            <React.Fragment>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Perhitungan Harga</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Pesanan</p>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Pesanan</td>
                                        <td>Nama Pesanan</td>
                                        <td>Tanggal</td>
                                        <td>Kode Customer</td>
                                        <td>Nama Customer</td>
                                        <td>Jenis Produk</td>
                                        <td>Jumlah</td>
                                        <td>Harga Pokok Produk</td>
                                        <td>Harga Jual</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.htmlTableDaftarPesanan}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default daftar_pesanan