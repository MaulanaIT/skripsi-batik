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

export class consignee extends Component {

    state = {
        dataConsignee: [],

        htmlTableDaftarConsignee: []
    }

    componentDidMount() {
        this.GetConsignee();
    }

    ApplyConsignee = (id) => {
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

        axios.post(`${baseURL}/api/master/consignee/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetConsignee();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteConsignee = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/consignee/delete.php`, formData, config).then(() => {
            this.GetConsignee();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditConsignee = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetConsignee = () => {
        axios.get(`${baseURL}/api/master/consignee/select.php`, config).then(response => {
            ShowLoading();

            let dataConsignee = response.data.data;

            let htmlTableDaftarConsignee = [];

            if (dataConsignee.length > 0) {
                dataConsignee.forEach((item, index) => {
                    htmlTableDaftarConsignee.push(
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
                            <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyConsignee(item.id)}><FaCheck /> Apply</button>
                            <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditConsignee(item.id)}><FaPen /> Edit</button>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteConsignee(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ dataConsignee: dataConsignee, htmlTableDaftarConsignee: htmlTableDaftarConsignee }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    InsertConsignee = () => {
        if (!CheckInputValidity('form-data')) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-consignee'));
        formData.append('nama', GetValue('input-nama-consignee'));
        formData.append('alamat', GetValue('input-alamat-consignee'));
        formData.append('telepon', GetValue('input-telepon-consignee'));

        axios.post(`${baseURL}/api/master/consignee/insert.php`, formData, config).then(() => {
            ResetForm('form-data');

            this.GetConsignee();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Consignee</p>
                    <p className={style.pathname}>Master / Consignee </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah Consignee</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Consignee <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-consignee' name='input-kode-consignee' value={GenerateCode('CONS', this.state.dataConsignee)} maxLength={10} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Consignee <span className={global.important}>*</span></p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-consignee' name='input-nama-consignee' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Alamat <span className={global.important}>*</span></p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat-consignee' name='input-alamat-consignee' maxLength={100} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>No. Telp <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telepon-consignee' name='input-telepon-consignee' maxLength={13} onInput={InputFormatNumber} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertConsignee}><MdAdd /> Simpan</button>
                    </form>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Consignee</p>
                        </div>
                        <form id='form-table' className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Consignee</th>
                                            <th>Nama Consignee</th>
                                            <th>Alamat</th>
                                            <th>No. Telp</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarConsignee}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default consignee