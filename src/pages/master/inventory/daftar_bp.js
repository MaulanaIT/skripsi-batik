import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { baseURL, config } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';


export class daftar_bp extends Component {

    state = {
        htmlTableDaftarBahanBaku: []
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-inventory-bahan-baku/select.php`, config).then(response => {
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