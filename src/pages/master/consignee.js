import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { MdAdd } from 'react-icons/md'
import { baseURL, config, GenerateCode, GetInputValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class consignee extends Component {

    state = {
        dataConsignee: [],

        htmlTableDaftarConsignee: []
    }

    async componentDidMount() {
        axios.get(`${baseURL}/api/master-consignee/select.php`, config).then(response => {
            let dataConsignee = response.data.data;

            let htmlTableDaftarConsignee = [];

            if (dataConsignee.length > 0) {
                dataConsignee.forEach((item, index) => {
                    htmlTableDaftarConsignee.push(
                        <tr key={index} className={`align-middle`}>
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

            this.setState({ dataConsignee: dataConsignee, htmlTableDaftarConsignee: htmlTableDaftarConsignee }, () => {
                $('#table-data').DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertConsignee = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetInputValue('input-kode-consignee'));
        formData.append('nama', GetInputValue('input-nama-consignee'));
        formData.append('alamat', GetInputValue('input-alamat-consignee'));
        formData.append('telepon', GetInputValue('input-telepon-consignee'));

        axios.post(`${baseURL}/api/master-consignee/insert.php`, formData, config).then(response => {
            HideLoading();

            window.location.reload();
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
                    <div className={global.card}>
                    <p className={global.title}>Tambah Consignee</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Consignee</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-consignee' name='input-kode-consignee' value={GenerateCode('CONS', this.state.dataConsignee.length + 1)} maxLength={10} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Consignee</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-consignee' name='input-nama-consignee' maxLength={50} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Alamat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat-consignee' name='input-alamat-consignee' maxLength={100} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>No. Telp</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telepon-consignee' name='input-telepon-consignee' maxLength={13} onInput={InputFormatNumber} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertConsignee}><MdAdd /> Simpan</button>
                    </div>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Consignee</p>
                        </div>
                        <div className={global.card}>
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
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default consignee