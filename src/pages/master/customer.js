import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md'
import { baseURL, CheckInputValidity, config, cx, GenerateCode, GetValue, HideLoading, InputFormatNumber, ResetForm, ShowLoading } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class customer extends Component {

    state = {
        dataCustomer: [],

        htmlTableDaftarCustomer: []
    }

    componentDidMount() {
        this.GetCustomer();
    }

    ApplyCustomer = (id) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${id}`);
        let alamat = GetValue(`edit-alamat-${id}`);
        let telepon = GetValue(`edit-telepon-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('telepon', telepon);

        axios.post(`${baseURL}/api/master/customer/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetCustomer();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteCustomer = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/customer/delete.php`, formData, config).then(() => {
            this.GetCustomer();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditCustomer = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetCustomer = () => {
        axios.get(`${baseURL}/api/master/customer/select.php`, config).then(response => {
            ShowLoading();

            let dataCustomer = response.data.data;

            let htmlTableDaftarCustomer = [];

            if (dataCustomer.length > 0) {
                dataCustomer.forEach((item, index) => {
                    htmlTableDaftarCustomer.push(
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
                                <div id={`data-alamat-${item.id}`} className={`data-${item.id}`}>{item.alamat}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-alamat-${item.id}`} className={`edit-${item.id} d-none`} maxLength={100} defaultValue={item.alamat} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-telepon-${item.id}`} className={`data-${item.id}`}>{item.telepon}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-telepon-${item.id}`} className={`edit-${item.id} d-none`} maxLength={13} onInput={InputFormatNumber} defaultValue={item.telepon} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyCustomer(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditCustomer(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteCustomer(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ dataCustomer: dataCustomer, htmlTableDaftarCustomer: htmlTableDaftarCustomer }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    InsertCustomer = () => {
        if (!CheckInputValidity('form-data')) return;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-customer'));
        formData.append('nama', GetValue('input-nama-customer'));
        formData.append('alamat', GetValue('input-alamat-customer'));
        formData.append('telepon', GetValue('input-telepon-customer'));

        axios.post(`${baseURL}/api/master/customer/insert.php`, formData, config).then(() => {
            ResetForm('form-data');

            this.GetCustomer();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Customer</p>
                    <p className={style.pathname}>Master / Customer </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah Customer</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Customer</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-customer' name='input-kode-customer' value={GenerateCode('CUS', this.state.dataCustomer)} maxLength={10} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Customer</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-customer' name='input-nama-customer' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Alamat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat-customer' name='input-alamat-customer' maxLength={100} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>No. Telp</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telepon-customer' name='input-telepon-customer' maxLength={13} onInput={InputFormatNumber} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertCustomer}><MdAdd /> Simpan</button>
                    </form>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Customer</p>
                        </div>
                        <div className={global.card}>
                            <form id='form-table' className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Customer</th>
                                            <th>Nama Customer</th>
                                            <th>Alamat</th>
                                            <th>No. Telp</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarCustomer}
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

export default customer