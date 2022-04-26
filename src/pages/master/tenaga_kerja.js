import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'

// Import CSS
import global from '../../css/master.module.css';
import style from '../../css/master.module.css';

export class tenaga_kerja extends Component {
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
                            <input type="text" className={global.input1} id='input-kode-tenaga-kerja' name='input-kode-tenaga-kerja' readOnly />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Nama Tenaga Kerja</p>
                            <input type="text" className={global.input2} id='input-nama-tenaga-kerja' name='input-nama-tenaga-kerja' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Departemen</p>
                            <input type="text" className={global.input2} id='input-departemen' name='input-departemen' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>No. Telp</p>
                            <input type="text" className={global.input3} id='input-telp' name='input-telp' />
                        </div>
                        <div className={`${global.input_group}`}>
                            <p className={`${global.title} col-3`}>Upah</p>
                            <input type="text" className={global.input3} id='input-upah' name='input-upah' />
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>
            </>
        )
    }
}

export default tenaga_kerja