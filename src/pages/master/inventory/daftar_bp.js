import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, CheckInputValidity, config, GetValue, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';


export class daftar_bp extends Component {

    state = {
        htmlTableDaftarBahanBaku: []
    }

    componentDidMount() {
        this.GetBahanPenolong();
    }

    ApplyBahanPenolong = (id) => {
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

        axios.post(`${baseURL}/api/master-inventory-bahan-penolong/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetBahanPenolong();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteBahanPenolong = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master-inventory-bahan-penolong/delete.php`, formData, config).then(() => {
            this.GetBahanPenolong();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditBahanPenolong = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetBahanPenolong = () => {
        axios.get(`${baseURL}/api/master-inventory-bahan-penolong/select.php`, config).then(response => {
            let dataBahanBaku = response.data.data;

            let htmlTableDaftarBahanBaku = [];

            if (dataBahanBaku.length > 0) {
                dataBahanBaku.forEach((item, index) => {
                    htmlTableDaftarBahanBaku.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.satuan}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.stok_minimal}</td>
                            <td>{item.harga}</td>
                            <td></td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarBahanBaku: htmlTableDaftarBahanBaku }, () => {
                $('#table-data').DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Bahan Penolong</p>
                    <p className={style.pathname}>Master / Bahan Penolong</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Bahan Penolong</p>
                            <Link to={'/master/inventory/bahan-penolong'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode BP</th>
                                            <th>Nama Bahan Penolong</th>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_bp