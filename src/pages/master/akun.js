import React, { Component } from 'react';

// Import Library
import axios from 'axios';
import Select from 'react-select';
import { baseURL, CheckInputValidity, config, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';

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
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export class akun extends Component {

    state = {
        dataAkun: [],

        valueJenisAkun: []
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master/akun/select.php`, config).then(response => {
            let dataAkun = response.data.data;

            this.setState({ dataAkun: dataAkun });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertAkun = () => {
        if (!CheckInputValidity('form-data') || !this.state.valueJenisAkun.length > 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-akun'));
        formData.append('nama', GetValue('input-nama-akun'));
        formData.append('saldo', GetValue('input-saldo-akun'));
        formData.append('jenis', this.state.valueJenisAkun.value.toLowerCase());

        axios.post(`${baseURL}/api/master/akun/insert.php`, formData, config).then(() => {
            window.location.href = '/master/daftar-akun';
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    SelectJenis = (data) => {
        if (data) {
            this.setState({ valueJenisAkun: {value: data?.value, label: data?.label} });
        } else {
            this.setState({ valueJenisAkun: '' });
        }
    }

    render() {

        const { valueJenisAkun } = this.state;

        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Akun</p>
                    <p className={style.pathname}>Master / Akun </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah Akun</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Akun <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-akun' name='input-kode-akun' maxLength={10}  required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Akun <span className={global.important}>*</span></p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-akun' name='input-nama-akun' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Saldo <span className={global.important}>*</span></p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-saldo-akun' name='input-saldo-akun' onInput={InputFormatNumber} defaultValue={0} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jenis Akun <span className={global.important}>*</span></p>
                            <Select id='select-jenis-akun' isClearable={true} isSearchable={true} options={[
                                { value: 'Debit', label: 'Debit' },
                                { value: 'Kredit', label: 'Kredit' }
                            ]} placeholder={'Select Jenis...'} styles={CustomSelect} value={valueJenisAkun} onChange={(data) => this.SelectJenis(data)} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertAkun}>Simpan</button>
                    </form>
                </div>
            </>
        )
    }
}

export default akun