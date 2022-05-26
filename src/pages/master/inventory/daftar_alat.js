import React, { Component } from 'react';

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
        htmlTableDaftarAlat: []
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-inventory-alat/select.php`, config).then(response => {
            let dataAlat = response.data.data;

            let htmlTableDaftarAlat = [];

            if (dataAlat.length > 0) {
                dataAlat.forEach((item, index) => {
                    htmlTableDaftarAlat.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.kapasitas}</td>
                            <td>{item.total_kapasitas}</td>
                            <td>{item.bop}</td>
                            <td></td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarAlat: htmlTableDaftarAlat }, () => {
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
                    <p className={style.title}>Alat</p>
                    <p className={style.pathname}>Master / Alat</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Alat</p>
                            <Link to={'/master/inventory/alat'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Alat</th>
                                            <th>Nama Alat</th>
                                            <th>Jumlah Unit</th>
                                            <th>Harga Perolehan</th>
                                            <th>Kapasitas per Unit</th>
                                            <th>Total Kapasitas</th>
                                            <th>Tarif BOP</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarAlat}
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