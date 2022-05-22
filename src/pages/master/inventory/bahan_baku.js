import React, { Component } from 'react'

// Import Library
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { baseURL, config, generateCode, getInputValue } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/master.module.css';

export class bahan_baku extends Component {

    state = {
        dataBahanBaku: 0
    }

    componentDidMount() {
        axios.get(`${baseURL}/api/master-inventory-bahan-baku/select.php`, config).then(response => {
            let dataBahanBaku = response.data.data;

            this.setState({ dataBahanBaku: dataBahanBaku });
        }).catch(error => {
            console.log(error);
        });
    }

    InsertBahanBaku = () => {
        const formData = new FormData();

        formData.append('kode', getInputValue('input-kode-bahan-baku'));
        formData.append('nama', getInputValue('input-nama-bahan-baku'));
        formData.append('satuan', getInputValue('input-satuan-bahan-baku'));
        formData.append('jumlah', getInputValue('input-jumlah-bahan-baku'));
        formData.append('harga', getInputValue('input-harga-bahan-baku'));

        axios.post(`${baseURL}/api/master-inventory-bahan-baku/insert.php`, formData, config).then(response => {
            let dataBahanBaku = response.data;

            console.log(dataBahanBaku);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Bahan Baku</p>
                    <p className={style.pathname}>Master / Inventory / Bahan Baku </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Bahan Baku</p>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Bahan Baku</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-bahan-baku' name='input-kode-bahan-baku' value={generateCode('BB', this.state.dataBahanBaku.length + 1)} readOnly={true} />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Nama Bahan Baku</p>
                            <input type="text" className="col12 col-md-8 col-lg-6" id='input-nama-bahan-baku' name='input-nama-bahan-baku' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Satuan</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-satuan-bahan-baku' name='input-satuan-bahan-baku' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah</p>
                            <input type="text" className="col col-lg-1 col-md-2" id='input-jumlah-bahan-baku' name='input-jumlah-bahan-baku' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Harga</p>
                            <input type="text" className="col col-lg-2 col-md-2" id='input-harga-bahan-baku' name='input-harga-bahan-baku' />
                        </div>
                        <button type='button' className={global.button} onClick={this.InsertBahanBaku}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default bahan_baku