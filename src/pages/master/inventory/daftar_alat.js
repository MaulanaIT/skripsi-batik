import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, CheckInputValidity, config, cx, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';


export class daftar_bp extends Component {

    state = {
        htmlTableDaftarAlat: []
    }

    componentDidMount() {
        this.GetAlat();
    }

    ApplyAlat = (id) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${id}`);
        let jumlah = GetValue(`edit-jumlah-${id}`);
        let harga = GetValue(`edit-harga-${id}`);
        let kapasitas = GetValue(`edit-kapasitas-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('nama', nama);
        formData.append('jumlah', jumlah);
        formData.append('harga', harga);
        formData.append('kapasitas', kapasitas);

        axios.post(`${baseURL}/api/master/inventory/alat/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            this.GetAlat();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    DeleteAlat = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/inventory/alat/delete.php`, formData, config).then(() => {
            this.GetAlat();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    EditAlat = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    GetAlat = () => {
        axios.get(`${baseURL}/api/master/inventory/alat/select.php`, config).then(response => {
            ShowLoading();

            let dataAlat = response.data.data;

            let htmlTableDaftarAlat = [];

            if (dataAlat.length > 0) {
                dataAlat.forEach((item, index) => {
                    htmlTableDaftarAlat.push(
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
                                <div id={`data-jumlah-${item.id}`} className={`data-${item.id}`}>{item.jumlah}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-jumlah-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.jumlah} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-harga-${item.id}`} className={`data-${item.id}`}>{item.harga}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-harga-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.harga} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-kapasitas-${item.id}`} className={`data-${item.id}`}>{item.kapasitas}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-kapasitas-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.kapasitas} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-total-kapasitas-${item.id}`} className={`data-${item.id}`}>{item.total_kapasitas}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-total-kapasitas-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.total_kapasitas} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-bop-${item.id}`} className={`data-${item.id}`}>{item.bop}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-bop-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.bop} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => this.ApplyAlat(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => this.EditAlat(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteAlat(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $('#table-data').DataTable().destroy();

            this.setState({ htmlTableDaftarAlat: htmlTableDaftarAlat }, () => {
                $('#table-data').DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

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
                            <form id='form-table' className={`table-responsive`}>
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
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default daftar_bp