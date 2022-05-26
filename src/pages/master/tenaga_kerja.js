import React, { Component } from 'react';

// Import Library
import axios from 'axios';
import { baseURL, config, GenerateCode, GetInputValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import global from '../../css/master.module.css';
import style from '../../css/master.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
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
        dataTenagaKerja: 0
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-tenaga-kerja/select.php`, config).then(response => {
            let dataTenagaKerja = response.data.data;

            this.setState({ dataTenagaKerja: dataTenagaKerja });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertTenagaKerja = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetInputValue('input-kode-tenaga-kerja'));
        formData.append('nama', GetInputValue('input-nama-tenaga-kerja'));
        formData.append('departemen', GetInputValue('input-departemen-tenaga-kerja'));
        formData.append('telepon', GetInputValue('input-telepon-tenaga-kerja'));
        formData.append('upah', GetInputValue('input-upah-tenaga-kerja'));

        axios.post(`${baseURL}/api/master-tenaga-kerja/insert.php`, formData, config).then(response => {
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
                    <p className={style.title}>Tenaga Kerja</p>
                    <p className={style.pathname}>Master / Tenaga Kerja </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Tenaga Kerja</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Kode Tenaga Kerja</p>
                            <input type="text" className={global.input1} id='input-kode-tenaga-kerja' name='input-kode-tenaga-kerja' value={GenerateCode('TK', this.state.dataTenagaKerja.length + 1)} maxLength={10} readOnly={true} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Tenaga Kerja</p>
                            <input type="text" className={global.input2} id='input-nama-tenaga-kerja' name='input-nama-tenaga-kerja' maxLength={50} />
                        </div>
                        <div className={`${global.input_group}`}>
                                            <p className={`${global.title} col-3`}>Departemen</p>
                                            <Select id='select-departemen-tenaga-kerja' name='select-departemen-tenaga-kerja' isClearable={true} isSearchable={true} options={[
                                                { value: 'Desain', label: 'Desain' },
                                                { value: 'Canting', label: 'Canting' },
                                                { value: 'Cap', label: 'Cap' },
                                                { value: 'Pewarnaan', label: 'Pewarnaan' },
                                                { value: 'Packing', label: 'Packing' }
                                            ]} placeholder={'Pilih Departemen...'} styles={CustomSelect} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>No. Telp</p>
                            <input type="text" className={global.input3} id='input-telepon-tenaga-kerja' name='input-telepon-tenaga-kerja' maxLength={13} onInput={InputFormatNumber} />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Upah</p>
                            <input type="text" className={global.input3} id='input-upah-tenaga-kerja' name='input-upah-tenaga-kerja' onInput={InputFormatNumber} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertTenagaKerja}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default tenaga_kerja