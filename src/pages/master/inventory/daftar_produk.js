import React, { useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, cx, ShowLoading, HideLoading, GetValue, CheckInputValidity } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export default function Daftar_produk() {

    const [getHTMLTableDaftarProduk, setHTMLTableDaftarProduk] = useState([]);

    useEffect(() => {
        GetProduk();
    }, []);

    useEffect(() => {
        $(`#table-data`).DataTable();
    }, [getHTMLTableDaftarProduk]);

    const ApplyProduk = (id) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${id}`);
        let jenis = GetValue(`edit-jenis-${id}`);
        let warna = GetValue(`edit-warna-${id}`);
        let jumlah = GetValue(`edit-jumlah-${id}`);
        let stok_minimal = GetValue(`edit-stok-minimal-${id}`);
        let hpp = GetValue(`edit-hpp-${id}`);
        let harga_jual = GetValue(`edit-harga-jual-${id}`);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('nama', nama);
        formData.append('jenis', jenis);
        formData.append('warna', warna);
        formData.append('jumlah', jumlah);
        formData.append('stok_minimal', stok_minimal);
        formData.append('hpp', hpp);
        formData.append('harga_jual', harga_jual);

        axios.post(`${baseURL}/api/master/inventory/produk/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.add('d-none'));

            GetProduk();
        }).catch(error => {
            console.log(error);

            alert(error)

            HideLoading();
        });
    }

    const DeleteProduk = (id) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('id', id);

        axios.post(`${baseURL}/api/master/inventory/produk/delete.php`, formData, config).then(() => {
            GetProduk();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const EditProduk = (id) => {
        document.querySelectorAll(`.data-${id}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${id}`).forEach(item => item.classList.remove('d-none'));
    }

    const GetProduk = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/produk/select.php`, config).then(response => {
            let data = response.data.data;

            let htmlTableDaftarProduk = [];

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    htmlTableDaftarProduk.push(
                        <tr key={index} className={`align-middle`}>
                            <td className={`text-center`}>{index + 1}.</td>
                            <td>
                                <div id={`data-kode-${item.id}`}>{item.kode}</div>
                            </td>
                            <td>
                                <div id={`data-nama-${item.id}`} className={`data-${item.id}`}>{item.nama}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-nama-${item.id}`} className={`edit-${item.id} d-none`} maxLength={50} defaultValue={item.nama} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-jenis-${item.id}`} className={`data-${item.id}`}>{item.jenis}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-jenis-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.jenis} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-warna-${item.id}`} className={`data-${item.id}`}>{item.warna}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-warna-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.warna} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-jumlah-${item.id}`} className={`data-${item.id}`}>{item.jumlah}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-jumlah-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.jumlah} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-stok-minimal-${item.id}`} className={`data-${item.id}`}>{item.stok_minimal}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-stok-minimal-${item.id}`} className={`edit-${item.id} d-none`} defaultValue={item.stok_minimal} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-hpp-${item.id}`} className={`data-${item.id} text-end`}>{item.hpp}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-hpp-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.hpp} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-harga-jual-${item.id}`} className={`data-${item.id} text-end`}>{item.harga_jual}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-harga-jual-${item.id}`} className={`edit-${item.id} text-end d-none`} defaultValue={item.harga_jual} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.id}`])} onClick={() => ApplyProduk(item.id)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.id}`])} onClick={() => EditProduk(item.id)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => DeleteProduk(item.id)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            $(`#table-data`).DataTable().destroy();

            setHTMLTableDaftarProduk(htmlTableDaftarProduk);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Produk</p>
                <p className={style.pathname}>Master / Produk</p>
            </div>
            <div className={`${style.content}`}>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Produk</p>
                        <Link to={'/master/inventory/produk'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</Link>
                    </div>
                    <div className={global.card}>
                        <form id='form-table' className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Produk</th>
                                        <th>Nama Produk</th>
                                        <th>Jenis Produk</th>
                                        <th>Jenis Warna</th>
                                        <th>Jumlah</th>
                                        <th>Stok Minimal</th>
                                        <th>Harga Pokok Produk</th>
                                        <th>Harga Jual</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarProduk}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}