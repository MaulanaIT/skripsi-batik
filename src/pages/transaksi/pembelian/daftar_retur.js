import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, cx, HideLoading, ShowLoading } from '../../../component/helper';

import DetailRetur from './detail_retur_admkeu';
import DetailRetur2 from './detail_retur_gudang';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/retur_pembelian.module.css';

export class daftar_retur extends Component {

    state = {
        htmlTableDaftarRetur: []
    }

    componentDidMount() {
        this.GetRetur();
    }

    GetRetur = () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/retur/select.php`, config).then(response => {
            ShowLoading();

            let dataRetur = response.data.data;

            let htmlTableDaftarRetur = [];

            if (dataRetur.length > 0) {
                dataRetur.forEach((item, index) => {
                    htmlTableDaftarRetur.push(
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
                                <div id={`data-total-harga-${item.id}`} className={`data-${item.id}`}>{item.total_harga}</div>
                                {/* <div className={global.input_group_row}>
                                    <input type="date" id={`edit-total-harga-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.total_harga} required={true} />
                                </div> */}
                            </td>
                            <td>
                                <div id={`data-status-${item.id}`} className={`data-${item.id}`}>{item.status}</div>
                                {/* <div className={global.input_group_row}>
                                    <input type="date" id={`edit-status-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.status} required={true} />
                                </div> */}
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyRetur(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditRetur(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteRetur(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarRetur: htmlTableDaftarRetur }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    SelectDetail = () => {
    document.getElementById('detail_retur_admkeu').classList.remove('d-none');
    }
    SelectDetail2 = () => {
    document.getElementById('detail_retur_gudang').classList.remove('d-none');
    }

    render() {
        return (
            <>
                <DetailRetur />
                <DetailRetur2 />
                <div className={style.header}>
                    <p className={style.title}>Retur Pembelian</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Retur Pembelian</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Retur Pembelian</p>
                            <Link to={'/transaksi/pembelian/retur-pembelian'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className='text-nowrap'>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Retur</td>
                                        <td>Tanggal</td>
                                        <td>Kode Supplier</td>
                                        <td>Nama Supplier</td>
                                        <td>Total Retur</td>
                                        <td>Status</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.htmlTableDaftarRetur}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column gap-2 pt-2'>
                    <div>
                        <button type='button' className={global.button} onClick={this.SelectDetail}>Detail AdmKeu</button>
                    </div>
                    <div>
                        <button type='button' className={global.button} onClick={this.SelectDetail2}>Detail Gudang</button>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_retur