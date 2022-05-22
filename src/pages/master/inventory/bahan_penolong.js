import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, generateCode, getInputValue } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export class bahan_penolong extends Component {

    state = {
        dataBahanPenolong: 0
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-inventory-bahan-penolong/select.php`, config).then(response => {
            let dataBahanPenolong = response.data.data;

            this.setState({ dataBahanPenolong: dataBahanPenolong });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertBahanPenolong = () => {
        const formData = new FormData();

        formData.append('kode', getInputValue('input-kode-bahan-penolong'));
        formData.append('nama', getInputValue('input-nama-bahan-penolong'));
        formData.append('satuan', getInputValue('input-satuan-bahan-penolong'));
        formData.append('jumlah', getInputValue('input-jumlah-bahan-penolong'));
        formData.append('harga', getInputValue('input-harga-bahan-penolong'));

        axios.post(`${baseURL}/api/master-inventory-bahan-penolong/insert.php`, formData, config).then(response => {
            let dataBahanPenolong = response.data;

            console.log(dataBahanPenolong);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Bahan Penolong</p>
                    <p className={style.pathname}>Master / Inventory / Bahan Penolong </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Bahan Penolong</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Bahan Penolong</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-bahan-penolong' name='input-kode-bahan-penolong' value={generateCode('BP', this.state.dataBahanPenolong.length + 1)} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Bahan Penolong</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-bahan-penolong' name='input-nama-bahan-penolong' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Satuan</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-satuan-bahan-penolong' name='input-satuan-bahan-penolong' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-jumlah-bahan-penolong' name='input-jumlah-bahan-penolong' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga</p>
                            <input type="text" className="col col-lg-2 col-md-2" id='input-harga-bahan-penolong' name='input-harga-bahan-penolong' />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertBahanPenolong}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default bahan_penolong