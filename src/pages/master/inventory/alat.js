import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, generateCode, getInputValue } from '../../../component/helper';

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
        const formData = new FormData();

        formData.append('kode', getInputValue('input-kode-alat'));
        formData.append('nama', getInputValue('input-nama-alat'));
        formData.append('satuan', getInputValue('input-satuan-alat'));
        formData.append('jumlah', getInputValue('input-jumlah-alat'));
        formData.append('harga', getInputValue('input-harga-alat'));

        axios.post(`${baseURL}/api/master-inventory-alat/insert.php`, formData, config).then(response => {
            let dataAlat = response.data;

            console.log(dataAlat);
        }).catch(error => {
            console.log(error);
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
                    <div className={global.card}>
                    <p className={global.title}>Tambah Alat</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Alat</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-alat' name='input-kode-alat' value={generateCode('A', this.state.dataAlat.length + 1)} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Alat</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-alat' name='input-nama-alat' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah Unit</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-jumlah-unit-alat' name='input-jumlah-unit-alat' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga Perolehan</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-harga-perolehan-alat' name='input-harga-perolehan-alat' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kapasitas per Unit</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kapasitas-alat' name='input-kapasitas-alat' />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertAlat}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default alat