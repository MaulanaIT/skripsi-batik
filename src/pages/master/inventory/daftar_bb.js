import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';


// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';


export class daftar_bb extends Component {

    state = {
        htmlTableDaftarBahanBaku: []
    }

    componentDidMount() {
        this.GetBahanBaku();
    }

    ApplyBahanBaku = (id) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${id}`);
        let satuan = GetValue(`edit-satuan-${id}`);
        let jumlah = GetValue(`edit-jumlah-${id}`);
        let stok_minimal = GetValue(`edit-stok-minimal-${id}`);
        let harga = GetValue(`edit-harga-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('nama', nama);
        formData.append('satuan', satuan);
        formData.append('jumlah', jumlah);
        formData.append('stok_minimal', stok_minimal);
        formData.append('harga', harga);

        axios.post(`${baseURL}/api/master/inventory/bahan-baku/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetBahanBaku();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteBahanBaku = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/inventory/bahan-baku/delete.php`, formData, config).then(() => {
            this.GetBahanBaku();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditBahanBaku = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetBahanBaku = () => {
        axios.get(`${baseURL}/api/master/inventory/bahan-baku/select.php`, config).then(response => {
            let dataBahanBaku = response.data.data;

            let htmlTableDaftarBahanBaku = [];

            if (dataBahanBaku.length > 0) {
                dataBahanBaku.forEach((item, index) => {
                    htmlTableDaftarBahanBaku.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>
                                <div id={`data-nama-${item.id}`} className={`data-${item.id}`}>{item.nama}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-nama-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.nama} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-satuan-${item.id}`} className={`data-${item.id}`}>{item.satuan}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-satuan-${item.id}`} className={`edit-${item.id} d-none`} maxLength={20} defaultValue={item.satuan} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-jumlah-${item.id}`} className={`data-${item.id}`}>{item.jumlah}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-jumlah-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.jumlah} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-stok-minimal-${item.id}`} className={`data-${item.id}`}>{item.stok_minimal}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-stok-minimal-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.stok_minimal} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-harga-${item.id}`} className={`data-${item.id}`}>{item.harga}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-harga-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.harga} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyBahanBaku(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditBahanBaku(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteBahanBaku(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarBahanBaku: htmlTableDaftarBahanBaku }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Bahan Baku</p>
                    <p className={style.pathname}>Master / Bahan Baku</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Bahan Baku</p>
                            <Link to={'/master/inventory/bahan-baku'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={global.card}>
                            <form id='form-table' className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode BB</th>
                                            <th>Nama Bahan Baku</th>
                                            <th>Satuan</th>
                                            <th>Jumlah</th>
                                            <th>Stok Min</th>
                                            <th>Harga</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarBahanBaku}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_bb