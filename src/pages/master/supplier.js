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

export class supplier extends Component {

    state = {
        dataSupplier: [],

        htmlTableDaftarSupplier: []
    }

    componentDidMount() {
        this.GetSupplier();
    }

    ApplySupplier = (id) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${id}`);
        let alamat = GetValue(`edit-alamat-${id}`);
        let telepon = GetValue(`edit-telepon-${id}`);
        let rekening = GetValue(`edit-rekening-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('telepon', telepon);
        formData.append('rekening', rekening);

        axios.post(`${baseURL}/api/master/supplier/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetSupplier();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteSupplier = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/supplier/delete.php`, formData, config).then(() => {
            this.GetSupplier();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditSupplier = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetSupplier = () => {
        axios.get(`${baseURL}/api/master/supplier/select.php`, config).then(response => {
            ShowLoading();

            let dataSupplier = response.data.data;

            let htmlTableDaftarSupplier = [];

            if (dataSupplier.length > 0) {
                dataSupplier.forEach((item, index) => {
                    htmlTableDaftarSupplier.push(
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
                            <td>
                                <div id={`data-rekening-${item.id}`} className={`data-${item.id}`}>{item.rekening}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-rekening-${item.id}`} className={`edit-${item.id} d-none`} maxLength={30} defaultValue={item.rekening} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplySupplier(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditSupplier(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteSupplier(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ dataSupplier: dataSupplier, htmlTableDaftarSupplier: htmlTableDaftarSupplier }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    InsertSupplier = () => {
        if (!CheckInputValidity('form-data')) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-supplier'));
        formData.append('nama', GetValue('input-nama-supplier'));
        formData.append('alamat', GetValue('input-alamat-supplier'));
        formData.append('telepon', GetValue('input-telepon-supplier'));
        formData.append('rekening', GetValue('input-rekening-supplier'));

        axios.post(`${baseURL}/api/master/supplier/insert.php`, formData, config).then(() => {
            ResetForm('form-data');

            this.GetSupplier();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Supplier</p>
                    <p className={style.pathname}>Master / Supplier </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah Supplier</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Kode Supplier <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-supplier' name='input-kode-supplier' value={GenerateCode('SUP', this.state.dataSupplier)} maxLength={10} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Nama Supplier <span className={global.important}>*</span></p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-supplier' name='input-nama-supplier' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Alamat <span className={global.important}>*</span></p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat-supplier' name='input-alamat-supplier' maxLength={100} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>No. Telp <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telepon-supplier' name='input-telp-supplier' maxLength={13} onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>No. Rek. Bank <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-rekening-supplier' name='input-rekening-supplier' maxLength={30} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertSupplier}><MdAdd /> Simpan</button>
                    </form>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Supplier</p>
                        </div>
                        <div className={global.card}>
                            <form id='form-table' className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Supplier</th>
                                            <th>Nama Supplier</th>
                                            <th>Alamat</th>
                                            <th>No. Telp</th>
                                            <th>No. Rek. Bank</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarSupplier}
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

export default supplier