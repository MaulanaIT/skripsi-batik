import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaPen, FaTrash } from 'react-icons/fa';
import { baseURL, config } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';


export class daftar_akun extends Component {

    state = {
        htmlTableDaftarAkun: []
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-akun/select.php`, config).then(response => {
            let dataAkun = response.data.data;

            let htmlTableDaftarAkun = [];

            if (dataAkun.length > 0) {
                dataAkun.forEach((item, index) => {
                    htmlTableDaftarAkun.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td className={`text-end`}>{item.saldo}</td>
                            <td className={global.table_action}>
                                <button type='button' className={global.edit} onClick={this.EditAkun}><FaPen /> Edit</button>
                                <button type='button' className={global.delete} onClick={() => this.DeleteAkun(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarAkun: htmlTableDaftarAkun }, () => {
                $('#table-data').DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    DeleteAkun = (id) => {
        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master-akun/delete.php`, formData, config).then(response => {
            let dataAkun = response.data;

            console.log(dataAkun);
        }).catch(error => {
            console.log(error);
        });
    }

    EditAkun = () => {
        return;
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Akun</p>
                    <p className={style.pathname}>Master / Akun</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Akun</p>
                            <Link to={'/master/akun'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Kode Akun</th>
                                            <th>Nama Akun</th>
                                            <th>Saldo</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarAkun}
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

export default daftar_akun