import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { baseURL, CheckInputValidity, config, cx, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';
import $ from 'jquery';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import DetailOrder from './detail_order_admkeu';
import DetailOrder2 from './detail_order_gudang';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/order_pembelian.module.css';

export class daftar_order extends Component {

    componentDidMount() {
        this.GetOrder();
    }

    GetOrder = () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/order/select.php`, config).then(response => {
            ShowLoading();

            let dataAkun = response.data.data;

            let htmlTableDaftarAkun = [];

            if (dataAkun.length > 0) {
                dataAkun.forEach((item, index) => {
                    htmlTableDaftarAkun.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>
                                <div id={`data-kode-${item.id}`}>{item.kode}</div>
                            </td>
                            <td>
                                <div id={`data-nama-${item.id}`} className={`data-${item.id}`}>{item.nama}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-nama-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.nama} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-saldo-${item.id}`} className={`data-${item.id} text-end`}>{item.saldo}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-saldo-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.saldo} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyAkun(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditAkun(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteAkun(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarAkun: htmlTableDaftarAkun }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    SelectDetail = () => {
    document.getElementById('detail_order_admkeu').classList.remove('d-none');
    }
    SelectDetail2 = () => {
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
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Order</td>
                                        <td>Tanggal</td>
                                        <td>Kode Supplier</td>
                                        <td>Nama Supplier</td>
                                        <td>Total Harga</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                        <td>
                                            <button type='button' className={global.button} onClick={this.SelectDetail}>Detail</button>
                                        </td>
                                        <td>
                                            <button type='button' className={global.button} onClick={this.SelectDetail2}>Detail2</button>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_order