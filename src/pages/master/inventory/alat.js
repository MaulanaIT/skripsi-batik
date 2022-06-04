import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { baseURL, CheckInputValidity, config, GenerateCode, GetValue, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export class alat extends Component {

    state = {
        dataAlat: 0
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-inventory-alat/select.php`, config).then(response => {
            let dataAlat = response.data.data;

            this.setState({ dataAlat: dataAlat });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertAlat = () => {
        if (!CheckInputValidity('form-data')) return;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', GetValue('input-kode-alat'));
        formData.append('nama', GetValue('input-nama-alat'));
        formData.append('jumlah', GetValue('input-jumlah-alat'));
        formData.append('harga', GetValue('input-harga-alat'));
        formData.append('kapasitas', GetValue('input-kapasitas-alat'));

        axios.post(`${baseURL}/api/master-inventory-alat/insert.php`, formData, config).then(() => {
            window.location.href = '/master/inventory/daftar-alat';
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Alat</p>
                    <p className={style.pathname}>Master / Inventory / Alat </p>
                </div>
                <div className={style.content}>
                    <form id='form-data' className={global.card}>
                        <p className={global.title}>Tambah Alat</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Alat</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-alat' name='input-kode-alat' value={GenerateCode('A', this.state.dataAlat.length + 1)} maxLength={13} readOnly={true} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Alat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-alat' name='input-nama-alat' maxLength={50} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah Unit</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-jumlah-alat' name='input-jumlah-alat' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga Perolehan</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-harga-alat' name='input-harga-alat' onInput={InputFormatNumber} required={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kapasitas per Unit</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kapasitas-alat' name='input-kapasitas-alat' onInput={InputFormatNumber} required={true} />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertAlat}><MdAdd /> Simpan</button>
                    </form>
                </div>
            </>
        )
    }
}

export default alat