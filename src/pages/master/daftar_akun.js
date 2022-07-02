import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, ShowLoading } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';


export class daftar_akun extends Component {

    state = {
        htmlTableDaftarAkun: []
    }

    componentDidMount() {
        this.GetAkun();
    }

    ApplyAkun = (id, jenis) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${id}`);
        let saldo = GetValue(`edit-${jenis === 0 ? 'debit' : 'kredit'}-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('nama', nama);
        formData.append('saldo', saldo);

        axios.post(`${baseURL}/api/master/akun/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetAkun();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteAkun = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/akun/delete.php`, formData, config).then(() => {
            this.GetAkun();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditAkun = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetAkun = () => {
        axios.get(`${baseURL}/api/master/akun/select.php`, config).then(response => {
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
                                <div id={`data-debit-${item.id}`} className={`data-${item.id} text-end`}>{parseInt(item.jenis) === 0 ? item.saldo : 0}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-debit-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.jenis === 0 ? item.debit : 0} required={true} readOnly={parseInt(item.jenis) === 1 && true } />
                                </div>
                            </td>
                            <td>
                                <div id={`data-kredit-${item.id}`} className={`data-${item.id} text-end`}>{parseInt(item.jenis) === 1 ? item.saldo : 0}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-kredit-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.jenis === 1 ? item.kredit : 0} required={true} readOnly={parseInt(item.jenis) === 0 && true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyAkun(item.id, parseInt(item.jenis))}><FaCheck /> Apply</button>
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

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Akun</p>
                    <p className={style.pathname}>Master / Akun</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Akun</p>
                            <Link to={'/master/akun'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={global.card}>
                            <form id='form-table' className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th rowSpan={2}>No.</th>
                                            <th rowSpan={2}>Kode Akun</th>
                                            <th rowSpan={2}>Nama Akun</th>
                                            <th colSpan={2}>Saldo Normal</th>
                                            <th rowSpan={2}>Aksi</th>
                                        </tr>
                                        <tr>
                                            <th>Debit</th>
                                            <th>Kredit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarAkun}
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

export default daftar_akun