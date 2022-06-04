import React, { Component } from 'react';

// Import Library
import axios from 'axios';
import { baseURL, CheckInputValidity, config, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class akun extends Component {

    state = {
        dataAkun: []
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
        if (!CheckInputValidity('form-data')) return;
        
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-akun'));
        formData.append('nama', GetValue('input-nama-akun'));
        formData.append('saldo', GetValue('input-saldo-akun'));

        axios.post(`${baseURL}/api/master/akun/insert.php`, formData, config).then(() => {
            window.location.href = '/master/daftar-akun';
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
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
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Akun</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-akun' name='input-kode-akun' maxLength={10} value={GenerateCode('A', this.state.dataAkun)} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Akun</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-akun' name='input-nama-akun' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Saldo</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-saldo-akun' name='input-saldo-akun' onInput={InputFormatNumber} defaultValue={0} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertAkun}>Simpan</button>
                    </form>
                </div>
            </>
        )
    }
}

export default akun