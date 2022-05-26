import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { MdAdd } from 'react-icons/md'
import { baseURL, config, GenerateCode, GetInputValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class supplier extends Component {

    state = {
        dataSupplier: [],

        htmlTableDaftarSupplier: []
    }

    async componentDidMount() {
        axios.get(`${baseURL}/api/master-supplier/select.php`, config).then(response => {
            let dataSupplier = response.data.data;

            let htmlTableDaftarSupplier = [];

            if (dataSupplier.length > 0) {
                dataSupplier.forEach((item, index) => {
                    htmlTableDaftarSupplier.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.telepon}</td>
                            <td>{item.rekening}</td>
                            <td></td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ dataSupplier: dataSupplier, htmlTableDaftarSupplier: htmlTableDaftarSupplier }, () => {
                $('#table-data').DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertSupplier = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetInputValue('input-kode-supplier'));
        formData.append('nama', GetInputValue('input-nama-supplier'));
        formData.append('alamat', GetInputValue('input-alamat-supplier'));
        formData.append('telepon', GetInputValue('input-telepon-supplier'));
        formData.append('rekening', GetInputValue('input-rekening-supplier'));

        axios.post(`${baseURL}/api/master-supplier/insert.php`, formData, config).then(response => {
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
                    <p className={style.title}>Supplier</p>
                    <p className={style.pathname}>Master / Supplier </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                        <p className={global.title}>Tambah Supplier</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Kode Supplier</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-supplier' name='input-kode-supplier' value={GenerateCode('SUP', this.state.dataSupplier.length + 1)} maxLength={10} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Nama Supplier</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-supplier' name='input-nama-supplier' maxLength={50} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Alamat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat-supplier' name='input-alamat-supplier' maxLength={100} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>No. Telp</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telepon-supplier' name='input-telp-supplier' maxLength={13} onInput={InputFormatNumber} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>No. Rek. Bank</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-rekening-supplier' name='input-rekening-supplier' maxLength={30} onInput={InputFormatNumber} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertSupplier}><MdAdd /> Simpan</button>
                    </div>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Supplier</p>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default supplier