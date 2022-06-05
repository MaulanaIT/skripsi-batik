import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, cx, HideLoading, ShowLoading } from '../../../component/helper';

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
                                {/* <div className={global.input_group_row}>
                                    <input type="date" id={`edit-tanggal-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.tanggal} required={true} />
                                </div> */}
                            </td>
                            <td>
                                <div id={`data-kode-order-${item.id}`} className={`data-${item.id}`}>{item.kode_order}</div>
                                {/* <div className={global.input_group_row}>
                                    <input type="date" id={`edit-kode-order-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.kode_order} required={true} />
                                </div> */}
                            </td>
                            <td>
                                <div id={`data-kode-supplier-${item.id}`} className={`data-${item.id} text-end`}>{item.kode_supplier}</div>
                                {/* <div className={global.input_group_row}>
                                    <input type="text" id={`edit-kode-supplier-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.kode_supplier} required={true} />
                                </div> */}
                            </td>
                            <td>
                                <div id={`data-nama-supplier-${item.id}`} className={`data-${item.id}`}>{item.nama_supplier}</div>
                                {/* <div className={global.input_group_row}>
                                    <input type="date" id={`edit-nama-supplier-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.nama_supplier} required={true} />
                                </div> */}
                            </td>
                            <td>
                                <div id={`data-total-barang-${item.id}`} className={`data-${item.id}`}>{item.total_barang}</div>
                                {/* <div className={global.input_group_row}>
                                    <input type="date" id={`edit-total-barang-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.total_barang} required={true} />
                                </div> */}
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyTerimaBarang(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditTerimaBarang(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteTerimaBarang(item.id)}><FaTrash />Delete</button>
                            </td>
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
                            <Link to={'/transaksi/pembelian/penerimaan-barang'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
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
                                        <td>Aksi</td>
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