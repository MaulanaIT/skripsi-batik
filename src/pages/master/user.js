import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import sha256 from 'crypto-js/sha256';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, ShowLoading } from '../../component/helper';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 3)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export class user extends Component {

    state = {
        htmlTableDaftarUser: [],

        valueJabatan: []
    }
    
    componentDidMount() {
        this.GetUser();
    }

    DeleteUser = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/user/delete.php`, formData, config).then(() => {
            this.GetUser();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditUser = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetUser = () => {
        axios.get(`${baseURL}/api/master/user/select.php`, config).then(response => {
            ShowLoading();

            let dataUser = response.data.data;

            let htmlTableDaftarUser = [];

            if (dataUser.length > 0) {
                dataUser.forEach((item, index) => {
                    htmlTableDaftarUser.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>
                                <div id={`data-username-${item.id}`} className={`data-${item.id}`}>{item.username}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-username-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.username} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-password-${item.id}`} className={`data-${item.id} text-end`}>{item.password.substring(0, 20)}...</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-password-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.password} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-jabatan-${item.id}`} className={`data-${item.id} text-end`}>{item.jabatan}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-jabatan-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.jabatan} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyUser(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditUser(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteUser(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarUser: htmlTableDaftarUser }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    InsertUser = () => {
        if (!CheckInputValidity('form-data')) return;

        ShowLoading();

        const formData = new FormData();

        formData.append('username', GetValue('input-username'));
        formData.append('password', sha256(GetValue('input-password')));
        formData.append('jabatan', this.state.valueJabatan.value);

        axios.post(`${baseURL}/api/master/user/insert.php`, formData, config).then(() => {
            this.GetUser();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    SelectJabatan = (data) => {
        if (data) {
            this.setState({ valueJabatan: { value: data?.value, label: data?.label } });
        } else {
            this.setState({ valueJabatan: '' });
        }
    }

    render() {

        const { valueJabatan } = this.state;

        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>User</p>
                    <p className={style.pathname}>Master / User </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah User</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Username</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-username' name='input-username' required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Password</p>
                            <input type="password" className="col12 col-md-8 col-lg-6" id='input-password' name='input-password' required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jabatan</p>
                            <Select id='select-jabatan' isClearable={true} isSearchable={true} options={[
                                { value: 'Owner', label: 'Owner' },
                                { value: 'Admin, Keuangan', label: 'Admin, Keuangan' },
                                { value: 'Gudang, Pembelian', label: 'Gudang, Pembelian' }
                            ]} placeholder={'Select Jabatan...'} styles={CustomSelect} value={valueJabatan} onChange={(data) => this.SelectJabatan(data)} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertUser}><MdAdd /> Simpan</button>
                    </form>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar User</p>
                        </div>
                        <div className={global.card}>
                            <form id='form-table' className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Jabatan</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarUser}
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

export default user