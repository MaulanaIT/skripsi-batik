import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, HideLoading, ShowLoading } from '../../../component/helper';

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

    DeleteRetur = (kode) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/transaksi/pembelian/retur/delete.php`, formData, config).then(() => {
            this.GetRetur();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }
    GetRetur = async () => {
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
                                <div id={`data-jumlah-retur-${item.id}`} className={`data-${item.id} text-center`}>{item.jumlah_retur}</div>
                            </td>
                            <td>
                                <div id={`data-status-${item.id}`} className={`data-${item.id} text-center`}>{item.status}</div>
                            </td>
                            <td className={global.table_action}>
                                {localStorage.getItem('leksana_jabatan').toLowerCase() !== 'owner' &&
                                    <button type='button' id='button-detail' className={global.edit} onClick={
                                        localStorage.getItem('leksana_jabatan').toLowerCase() === 'admin, keuangan' ? this.SelectDetailKeuangan : this.SelectDetailGudang}><FaClipboardList /> Detail</button>
                                }
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteRetur(item.kode)}><FaTrash /> Delete</button>
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

    SelectDetailKeuangan = () => {
        document.getElementById('detail_retur_admkeu').classList.remove('d-none');
    }

    SelectDetailGudang = () => {
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
            </>
        )
    }
}

export default daftar_retur