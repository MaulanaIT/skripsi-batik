import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class supplier extends Component {
    componentDidMount() {
        $('#table-data').DataTable();
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
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-supplier' name='input-kode-supplier' readOnly />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Nama Supplier</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-supplier' name='input-nama-supplier' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>Alamat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-alamat' name='input-alamat' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>No. Telp</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-telp' name='input-telp' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3`}>No. Rek. Bank</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-rek-bank' name='input-rek-bank' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Supplier</p>
                        </div>
                        <div className={global.card}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table table-striped table-hover w-100`}>
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