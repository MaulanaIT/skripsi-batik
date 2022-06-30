import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { FaClipboardList, FaPrint, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, cx, HideLoading, ShowLoading } from '../../../component/helper';

import DetailPesanan from './detail_aksi_pesan';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/perhitungan_harga.module.css';

export class perhitungan_harga extends Component {

    state = {
        htmlTableDaftarPesanan: []
    }

    componentDidMount() {
        this.GetPesanan();
    }

    GetPesanan = () => {
        axios.get(`${baseURL}/api/transaksi/penjualan/kalkulator-estimasi/select.php`, config).then(response => {
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
                                <div id={`data-nama-pesanan-${item.id}`} className={`data-${item.id}`}>{item.nama_pesanan}</div>
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
                                <div id={`data-harga-jual-${item.id}`} className={`data-${item.id}`}>{item.harga_jual}</div>
                            </td>
                            <td>
                                <div id={`data-status-${item.id}`} className={`data-${item.id}`}>{item.status}</div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-detail' className={global.edit} style={{gridColumn: '2 span'}}><FaClipboardList /> Detail</button>
                                <button type='button' id='button-print' className={global.apply}><FaPrint /> Print</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeletePesanan(item.id)}><FaTrash /> Delete</button>
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

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectDetail = () => {
        document.getElementById('detail_aksi_pesan').classList.remove('d-none');
    }

    render() {
        return (
            <>
            <DetailPesanan />
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
                                        <td>Harga Jual</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column gap-2 pt-2'>
                    <div>
                        <button type='button' className={global.button} onClick={this.SelectDetail}>Detail Pesanan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default perhitungan_harga