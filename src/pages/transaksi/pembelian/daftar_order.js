import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { FaClipboardList, FaPrint, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, cx, HideLoading, ShowLoading } from '../../../component/helper';

import DetailOrder from './detail_order_admkeu';
import DetailOrder2 from './detail_order_gudang';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/order_pembelian.module.css';

export class daftar_order extends Component {

    state = {
        htmlTableDaftarOrder: []
    }

    componentDidMount() {
        this.GetOrder();
    }

    DeleteOrder = (kode) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/pembelian/order/delete.php`, formData, config).then(() => {
            this.GetOrder();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    GetOrder = () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/order/select.php`, config).then(response => {
            ShowLoading();

            let dataOrder = response.data.data;

            let htmlTableDaftarOrder = [];

            if (dataOrder.length > 0) {
                dataOrder.forEach((item, index) => {
                    htmlTableDaftarOrder.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>
                                <div id={`data-kode-${item.id}`} className={'text-center'}>{item.kode}</div>
                            </td>
                            <td>
                                <div id={`data-tanggal-${item.id}`} className={`data-${item.id} text-center`}>{item.tanggal}</div>
                            </td>
                            <td>
                                <div id={`data-kode-supplier-${item.id}`} className={`data-${item.id} text-center`}>{item.kode_supplier}</div>
                            </td>
                            <td>
                                <div id={`data-nama-supplier-${item.id}`} className={`data-${item.id}`}>{item.nama_supplier}</div>
                            </td>
                            <td>
                                <div id={`data-total-harga-${item.id}`} className={`data-${item.id} text-end`}>{item.total_harga}</div>
                            </td>
                            <td>
                                <div id={`data-status-${item.id}`} className={`data-${item.id} text-center`}>{item.status}</div>
                            </td>
                            <td className={global.table_action}>
                                {localStorage.getItem('leksana_jabatan').toLowerCase() !== 'owner' &&
                                    <button type='button' id='button-detail' className={global.edit} style={{ gridColumn: '2 span' }} onClick={
                                        localStorage.getItem('leksana_jabatan').toLowerCase() === 'admin, keuangan' ? this.SelectDetailKeuangan : this.SelectDetailGudang}><FaClipboardList /> Detail</button>
                                }
                                <button type='button' id='button-print' className={global.apply}><FaPrint /> Print</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteOrder(item.kode)}><FaTrash /> Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarOrder: htmlTableDaftarOrder }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    SelectDetailKeuangan = () => {
        document.getElementById('detail_order_admkeu').classList.remove('d-none');
    }
    SelectDetailGudang = () => {
        document.getElementById('detail_order_gudang').classList.remove('d-none');
    }

    render() {
        return (
            <>
                <DetailOrder />
                <DetailOrder2 />
                <div className={style.header}>
                    <p className={style.title}>Order Pembelian</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Order Pembelian</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Order Pembelian</p>
                            <Link to={'/transaksi/pembelian/order-pembelian'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <form className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-center text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Order</td>
                                        <td>Tanggal</td>
                                        <td>Kode Supplier</td>
                                        <td>Nama Supplier</td>
                                        <td>Total Harga</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.htmlTableDaftarOrder}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_order