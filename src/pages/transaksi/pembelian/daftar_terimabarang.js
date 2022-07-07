import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/penerimaan_barang.module.css';

export class daftar_terimabarang extends Component {

    state = {
        htmlTableDaftarTerimaBarang: []
    }

    componentDidMount() {
        this.GetTerimaBarang();
    }

    GetTerimaBarang = () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/terima-barang/select.php`, config).then(response => {
            ShowLoading();

            let dataTerimaBarang = response.data.data;
            let jabatan = localStorage.getItem('leksana_jabatan').toLowerCase();

            let htmlTableDaftarTerimaBarang = [];

            if (dataTerimaBarang.length > 0) {
                dataTerimaBarang.forEach((item, index) => {
                    htmlTableDaftarTerimaBarang.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>
                                <div id={`data-kode-${item.id}`}>{item.kode}</div>
                            </td>
                            <td>
                                <div id={`data-tanggal-${item.id}`} className={`data-${item.id}`}>{item.tanggal}</div>
                            </td>
                            <td>
                                <div id={`data-kode-order-${item.id}`} className={`data-${item.id}`}>{item.kode_order}</div>
                            </td>
                            <td>
                                <div id={`data-kode-supplier-${item.id}`} className={`data-${item.id} text-end`}>{item.kode_supplier}</div>
                            </td>
                            <td>
                                <div id={`data-nama-supplier-${item.id}`} className={`data-${item.id}`}>{item.nama_supplier}</div>
                            </td>
                            <td>
                                <div id={`data-total-barang-${item.id}`} className={`data-${item.id}`}>{item.total_barang}</div>
                            </td>
                            {jabatan === 'admin, keuangan' &&
                                <td className={global.table_action}>
                                    {item.status === '0' ?
                                        <Link to={'/transaksi/pembelian/pengeluaran-kas'} state={{ kode: item.kode_order }} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}>Bayar</Link>
                                        :
                                        'Dibayar'
                                    }
                                </td>
                            }
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarTerimaBarang: htmlTableDaftarTerimaBarang }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Penerimaan Barang</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Penerimaan Barang</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>List Penerimaan Barang</p>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Penerimaan</td>
                                        <td>Tanggal Terima</td>
                                        <td>Kode Order</td>
                                        <td>Kode Supplier</td>
                                        <td>Nama Supplier</td>
                                        <td>Total Barang</td>
                                        {localStorage.getItem('leksana_jabatan').toLowerCase() === 'admin, keuangan' &&
                                            <td>Aksi</td>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.htmlTableDaftarTerimaBarang}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_terimabarang