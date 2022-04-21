import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import bootstrap from '../../css/bootstrap.module.css';
import global from '../../css/master.module.css';
import style from '../../css/master.module.css';

export class consignee extends Component {
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Consignee</p>
                    <p className={style.pathname}>Master / Consignee </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Tambah Consignee</p>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Kode Consignee</p>
                            <input type="text" className={global.input1} id='input-kode-consignee' name='input-kode-consignee' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Nama Consignee</p>
                            <input type="text" className={global.input2} id='input-nama-consignee' name='input-nama-consignee' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>Alamat</p>
                            <input type="text" className={global.input2} id='input-alamat' name='input-alamat' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} ${bootstrap['col-3']}`}>No. Telp</p>
                            <input type="text" className={global.input3} id='input-telp' name='input-telp' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default consignee