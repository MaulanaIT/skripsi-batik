import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { MdAdd } from 'react-icons/md'
import { baseURL, config, generateCode, getInputValue } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class customer extends Component {

    state = {
        dataCustomer: [],

        htmlTableDaftarCustomer: []
    }

    async componentDidMount() {
        axios.get(`${baseURL}/api/master-customer/select.php`, config).then(response => {
            let dataCustomer = response.data.data;

            let htmlTableDaftarCustomer = [];

            if (dataCustomer.length > 0) {
                dataCustomer.map((item, index) => {
                    htmlTableDaftarCustomer.push(
                        <tr className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.telepon}</td>
                            <td></td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ dataCustomer: dataCustomer, htmlTableDaftarCustomer: htmlTableDaftarCustomer }, () => {
                $('#table-data').DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertCustomer = () => {
        const formData = new FormData();

        formData.append('kode', getInputValue('input-kode-customer'));
        formData.append('nama', getInputValue('input-nama-customer'));
        formData.append('alamat', getInputValue('input-alamat-customer'));
        formData.append('telepon', getInputValue('input-telepon-customer'));

        axios.post(`${baseURL}/api/master-customer/insert.php`, formData, config).then(response => {
            let dataCustomer = response.data;

            console.log(dataCustomer);
        }).catch(error => {
            console.log(error);
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
                    <div className={global.card}>
                        <p className={global.title}>Tambah Customer</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Customer</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-customer' name='input-kode-customer' value={generateCode('CUS', this.state.dataCustomer.length + 1)} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Customer</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-customer' name='input-nama-customer' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Alamat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat' name='input-alamat' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>No. Telp</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telp' name='input-telp' />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertCustomer}><MdAdd /> Simpan</button>
                    </div>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Customer</p>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table table-striped table-hover w-100`}>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default customer