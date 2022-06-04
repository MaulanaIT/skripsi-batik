import React, { Component } from 'react';

// Import Library
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL, config, GenerateCode, GetInputValue, HideLoading, InputFormatNumber, ShowLoading } from '../../component/helper';

// Import CSS
import global from '../../css/global.module.css';
import style from '../../css/master.module.css';

export class akun extends Component {

    state = {
        dataAkun: 0
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-akun/select.php`, config).then(response => {
            let dataAkun = response.data.data;

            this.setState({ dataAkun: dataAkun });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertAkun = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetInputValue('input-kode-akun'));
        formData.append('nama', GetInputValue('input-nama-akun'));
        formData.append('saldo', GetInputValue('input-saldo-akun'));

        axios.post(`${baseURL}/api/master-akun/insert.php`, formData, config).then(response => {
            // let dataAkun = response.data;

            // HideLoading();

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
                    <div className={global.card}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Tambah Akun</p>
                            <Link to={'/master/daftar-akun'} className={`${global.button}`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }}>Kembali</Link>
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Akun</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-akun' name='input-kode-akun' maxLength={10} value={GenerateCode('A', this.state.dataAkun.length + 1)} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Akun</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-akun' name='input-nama-akun' maxLength={50} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Saldo</p>
                            <input type="text" className="col col-lg-3 col-md-6" id='input-saldo-akun' name='input-saldo-akun' onInput={InputFormatNumber} defaultValue={0} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertAkun}>Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default akun