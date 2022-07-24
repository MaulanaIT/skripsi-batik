import React, { useState, useEffect } from 'react';

// Import Library
import $, { data } from 'jquery';
import axios from 'axios';
import Select from 'react-select';
import { baseURL, CheckInputValidity, config, cx, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';
import { MdAdd } from 'react-icons/md'
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 3)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 0.6)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export default function Tenaga_kerja() {

    const [getHTMLTableDaftarTenagaKerja, setHTMLTableDaftarTenagaKerja] = useStateWithCallbackLazy([]);

    const [getValueKodeTenagaKerja, setValueKodeTenagaKerja] = useState('');
    const [getValueNamaTenagaKerja, setValueNamaTenagaKerja] = useState('');
    const [getValueDepartemen, setValueDepartemen] = useState(null);
    const [getValueTelepon, setValueTelepon] = useState('');
    const [getValueUpah, setValueUpah] = useState(0);

    useEffect(() => {
        GetTenagaKerja();
    }, []);

    const ApplyTenagaKerja = (kode) => {
        if (!CheckInputValidity('form-table')) return;

        ShowLoading();

        let nama = GetValue(`edit-nama-${kode}`);
        let departemen = GetValue(`edit-departemen-${kode}`);
        let telepon = GetValue(`edit-telepon-${kode}`);
        let upah = GetValue(`edit-upah-${kode}`);

        const formData = new FormData();

        formData.append('kode', kode);
        formData.append('nama', nama);
        formData.append('departemen', departemen);
        formData.append('telepon', telepon);
        formData.append('upah', upah);

        axios.post(`${baseURL}/api/master/tenaga-kerja/update.php`, formData, config).then(() => {
            document.querySelectorAll(`.data-${kode}`).forEach(item => item.classList.remove('d-none'));
            document.querySelectorAll(`.edit-${kode}`).forEach(item => item.classList.add('d-none'));

            GetTenagaKerja();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const DeleteTenagaKerja = (kode) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', kode);

        axios.post(`${baseURL}/api/master/tenaga-kerja/delete.php`, formData, config).then(() => {
            GetTenagaKerja();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const EditTenagaKerja = (kode) => {
        document.querySelectorAll(`.data-${kode}`).forEach(item => item.classList.add('d-none'));
        document.querySelectorAll(`.edit-${kode}`).forEach(item => item.classList.remove('d-none'));
    }

    const GetTenagaKerja = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/tenaga-kerja/select.php`, config).then(response => {
            let dataTenagaKerja = response.data.data;

            let htmlTableDaftarTenagaKerja = [];

            if (dataTenagaKerja && dataTenagaKerja.length > 0) {
                dataTenagaKerja.forEach((item, index) => {
                    htmlTableDaftarTenagaKerja.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>
                                <div id={`data-nama-${item.kode}`} className={`data-${item.kode}`}>{item.nama}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-nama-${item.kode}`} className={`edit-${item.kode} d-none`} maxLength={50} defaultValue={item.nama} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-departemen-${item.kode}`} className={`data-${item.kode}`}>{item.departemen}</div>
                                <div className={global.input_group_row}>
                                    <select name={`edit-departemen-${item.kode}`} id={`edit-departemen-${item.kode}`} className={`edit-${item.kode} d-none`}>
                                        <option value="Desain">Desain</option>
                                        <option value="Canting/Cap">Canting/Cap</option>
                                        <option value="Pewarnaan">Pewarnaan</option>
                                        <option value="Packing">Packing</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div id={`data-telepon-${item.kode}`} className={`data-${item.kode}`}>{item.telepon}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-telepon-${item.kode}`} className={`edit-${item.kode} d-none`} defaultValue={item.telepon} maxLength={13} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td>
                                <div id={`data-upah-${item.kode}`} className={`data-${item.kode}`}>{item.upah}</div>
                                <div className={global.input_group_row}>
                                    <input type="text" id={`edit-upah-${item.kode}`} className={`edit-${item.kode} d-none`} defaultValue={item.upah} onInput={InputFormatNumber} required={true} />
                                </div>
                            </td>
                            <td className={global.table_action}>
                                <button type='button' id='button-apply' className={cx([global.apply, `d-none edit-${item.kode}`])} onClick={() => ApplyTenagaKerja(item.kode)}><FaCheck /> Apply</button>
                                <button type='button' id='button-edit' className={cx([global.edit, `data-${item.kode}`])} onClick={() => EditTenagaKerja(item.kode)}><FaPen /> Edit</button>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => DeleteTenagaKerja(item.kode)}><FaTrash />Delete</button>
                            </td>
                        </tr>
                    );
                });
            }

            setValueKodeTenagaKerja(GenerateCode('TK', dataTenagaKerja));
            setHTMLTableDaftarTenagaKerja(htmlTableDaftarTenagaKerja, () => {
                $(`#table-data`).DataTable();

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const InsertTenagaKerja = () => {
        if (!CheckInputValidity('form-data') || getValueDepartemen === null) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeTenagaKerja);
        formData.append('nama', getValueNamaTenagaKerja);
        formData.append('departemen', getValueDepartemen.value);
        formData.append('telepon', getValueTelepon);
        formData.append('upah', getValueUpah);

        axios.post(`${baseURL}/api/master/tenaga-kerja/insert.php`, formData, config).then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Tenaga Kerja</p>
                <p className={style.pathname}>Master / Tenaga Kerja </p>
            </div>
            <div className={style.content}>
                <form id='form-data' className={global.card}>
                    <p className={global.title}>Tambah Tenaga Kerja</p>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-3`}>Kode Tenaga Kerja <span className={global.important}>*</span></p>
                        <input type="text" className={global.input1} id='input-kode-tenaga-kerja' value={getValueKodeTenagaKerja} maxLength={10} readOnly={true} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-3`}>Nama Tenaga Kerja <span className={global.important}>*</span></p>
                        <input type="text" className={global.input2} id='input-nama-tenaga-kerja' value={getValueNamaTenagaKerja} maxLength={50} onChange={e => setValueNamaTenagaKerja(e.target.value)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-3`}>Departemen <span className={global.important}>*</span></p>
                        <Select id='select-departemen-tenaga-kerja' name='select-departemen-tenaga-kerja' isClearable={true} isSearchable={true} options={[
                            { value: 'Desain', label: 'Desain' },
                            { value: 'Canting/Cap', label: 'Canting/Cap' },
                            { value: 'Pewarnaan', label: 'Pewarnaan' },
                            { value: 'Packing', label: 'Packing' }
                        ]} placeholder={'Pilih Departemen...'} value={getValueDepartemen} styles={CustomSelect} onChange={e => setValueDepartemen(e)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-3`}>No. Telp <span className={global.important}>*</span></p>
                        <input type="text" className={global.input3} id='input-telepon-tenaga-kerja' value={getValueTelepon} maxLength={13} onInput={InputFormatNumber} onChange={e => setValueTelepon(e.target.value)} required={true} />
                    </div>
                    <div className={`${global.input_group_row}`}>
                        <p className={`${global.title} col-3`}>Upah <span className={global.important}>*</span></p>
                        <input type="text" className={global.input3} id='input-upah-tenaga-kerja' value={getValueUpah} onInput={InputFormatNumber} onChange={e => setValueUpah(e.target.value)} required={true} />
                    </div>
                    <button type='button' className={global.button} onClick={InsertTenagaKerja}><MdAdd /> Simpan</button>
                </form>
                <div className={`${global.card} col-12`}>
                    <div className={`${global.header}`}>
                        <p className={global.title}>Daftar Tenaga Kerja</p>
                    </div>
                    <div className={global.card}>
                        <form id='form-table' className={`table-responsive`}>
                            <table id='table-data' className={`table w-100`}>
                                <thead className="align-middle text-center text-nowrap">
                                    <tr>
                                        <th>No.</th>
                                        <th>Kode Tenaga Kerja</th>
                                        <th>Nama Tenaga Kerja</th>
                                        <th>Departemen</th>
                                        <th>No. Telp</th>
                                        <th>Upah</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarTenagaKerja}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}