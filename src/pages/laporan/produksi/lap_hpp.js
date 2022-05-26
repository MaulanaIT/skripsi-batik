import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/laporanproduksi.module.css';

export class laporan_hpp extends Component {
    render() {
        return (
            <>
            <div className={style.header}>
                    <p className={`style.title`}>Laporan Produksi</p>
                    <p className={style.pathname}>Laporan / Produksi / Laporan Harga Pokok Produksi</p>
            </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-2`}>Kode Permintaan</p>
                            <input type="text" className={global.input1} id='input-kode-permintaan' name='input-kode-permintaan'/>
                        </div>
                        <div className='d-flex'>
                                <div className='col-6 pe-3'>
                                    <button type='button' className={`${global.button} w-100`}>Lihat</button>
                                </div>
                                <div className='col-6 ps-3'>
                                    <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Cetak</button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                    <p className={`${style.title} text-center w-100 fw-bold`}>Leksana Batik Jaya</p>
                    <p className={`${style.title} text-center w-100 fw-bold`}>Laporan Harga Pokok Produksi</p>
                    
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Kode Pesanan</p>
                            <input type="text" id='input-kode-pesanan' name='input-kode-pesanan' readOnly />
                        </div>
                        <div className={`${global.input_group} col-3 ps-2`}>
                            <p className={global.title}>Tanggal Pesanan</p>
                            <input type="date" id='input-tanggal-pesanan' name='input-tanggal-pesanan' readOnly />
                        </div>
                    </div>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Nama Pelanggan</p>
                            <input type="text" id='input-nama-pelanggan' name='input-nama-pelanggan' readOnly />
                        </div>
                        <div className={`${global.input_group} col-3 ps-2`}>
                            <p className={global.title}>Nama Produksi</p>
                            <input type="text" id='input-nama-produksi' name='input-nama-produksi' />
                        </div>
                    </div>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Jumlah Produksi</p>
                            <input type="text" id='input-jumlah-pesanan' name='input-jumlah-pesanan' readOnly />
                        </div>
                    </div>

                    <p className={`style.title fw-bold`}>Rincian Harga Pokok Produksi</p>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Biaya Bahan Baku</p>
                            <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' readOnly />
                        </div>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Biaya Tenaga Kerja</p>
                            <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' readOnly />
                        </div>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Biaya Overhead</p>
                            <input type="text" id='input-biaya-overhead' name='input-biaya-overhead' readOnly />
                        </div>
                    </div>
                        <div className={`d-flex`}>
                            <p className={`${global.title} col-3`}>Harga Pokok Produksi</p>
                            <input type="text" id='input-harga-pokok-produksi' name='input-harga-pokok-produksi' className='col-6' readOnly />
                        </div>

                        <div className='d-flex'>
                            <p className={`${global.title} col-3`}>Jumlah Produksi</p>
                            <input type="text" id='input-jumlah-produksi' name='input-jumlah-produksi'className='col-6' readOnly />
                        </div>

                        <div className='d-flex'>
                            <p className={`${global.title} col-3`}>Harga Pokok Produksi / Unit</p>
                            <input type="text" id='input-harga-pokok-produksi-unit' name='input-harga-pokok-produksi-unit' className='col-6' readOnly />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default laporan_hpp