import React, { Component } from 'react';

// Import Library
import axios from 'axios';
import { baseURL, CheckInputValidity, config, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

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

export class tenaga_kerja extends Component {

    state = {
        dataTenagaKerja: []
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master/tenaga-kerja/select.php`, config).then(response => {
            let dataTenagaKerja = response.data.data;

            this.setState({ dataTenagaKerja: dataTenagaKerja });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertTenagaKerja = () => {
        if (!CheckInputValidity('form-data')) return;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-tenaga-kerja'));
        formData.append('nama', GetValue('input-nama-tenaga-kerja'));
        formData.append('departemen', GetValue('input-departemen-tenaga-kerja'));
        formData.append('telepon', GetValue('input-telepon-tenaga-kerja'));
        formData.append('upah', GetValue('input-upah-tenaga-kerja'));

        axios.post(`${baseURL}/api/master/tenaga-kerja/insert.php`, formData, config).then(response => {
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
                    <p className={style.title}>Tenaga Kerja</p>
                    <p className={style.pathname}>Master / Tenaga Kerja </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah Tenaga Kerja</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Tenaga Kerja</p>
                            <input type="text" className={global.input1} id='input-kode-tenaga-kerja' name='input-kode-tenaga-kerja' value={GenerateCode('TK', this.state.dataTenagaKerja.length + 1)} maxLength={10} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Tenaga Kerja</p>
                            <input type="text" className={global.input2} id='input-nama-tenaga-kerja' name='input-nama-tenaga-kerja' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Departemen</p>
                            <Select id='select-departemen-tenaga-kerja' name='select-departemen-tenaga-kerja' isClearable={true} isSearchable={true} options={[
                                { value: 'Desain', label: 'Desain' },
                                { value: 'Canting', label: 'Canting' },
                                { value: 'Cap', label: 'Cap' },
                                { value: 'Pewarnaan', label: 'Pewarnaan' },
                                { value: 'Packing', label: 'Packing' }
                            ]} placeholder={'Pilih Departemen...'} styles={CustomSelect} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>No. Telp</p>
                            <input type="text" className={global.input3} id='input-telepon-tenaga-kerja' name='input-telepon-tenaga-kerja' maxLength={13} onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Upah</p>
                            <input type="text" className={global.input3} id='input-upah-tenaga-kerja' name='input-upah-tenaga-kerja' onInput={InputFormatNumber} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertTenagaKerja}><MdAdd /> Simpan</button>
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

export default tenaga_kerja