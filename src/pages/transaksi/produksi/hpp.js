import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

import AddHPP from './add_hpp';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/hpp.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 0.6)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}


export class hpp extends Component {

    SelectAddHPP = () => {
        document.getElementById('add_hpp').classList.remove('d-none');
    }

    render() {
        return (
            <>
            <AddHPP/>
            <div className={style.header}>
                    <p className={style.title}>Produksi</p>
                    <p className={style.pathname}>Transaksi / Produksi / Perhitungan HPP</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Perhitungan Harga Pokok Produksi</p>
                            <Link to={'/transaksi/produksi/produksi'} className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}>Cetak</Link>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-5 pe-2`}>
                            <p className={global.title}>Kode Produksi</p>
                            <Select id='select-kode-produksi' name='select-kode-produksi' isClearable={true} isSearchable={true} options={[
                                { value: 'KP0001', label: 'KP0001' },
                                { value: 'KP0002', label: 'KP0002' }
                                ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                        </div>
                        </div>
                        <div className='d-flex flex-wrap'>
                            <div className='col-12 col-md-4 pe-2'>
                            <button type='button' className={global.button} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.SelectAddHPP}>Tambah Perhitungan HPP</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className={`${style.content}`}>
                    <div className={`${global.card} col-12`}>
                        <div className={`${global.header}`}>
                            <p className={`${global.title} text-center w-100`}>Kartu Harga Pokok Produksi</p>
                        </div>
                            <div className={`${bootstrap['d-flex']}`}>
                                <div className={`${global.input_group} col-3 pe-2`}>
                                    <p className={global.title}>Kode Produksi</p>
                                    <input type="text" id='input-kode-produksi' name='input-kode-produksi' readOnly />
                                </div>
                                <div className={`${global.input_group} col-3 ps-4`}>
                                    <p className={global.title}>Kode Pesanan</p>
                                    <input type="text" id='input-kode-pesanan' name='input-kode-pesanan' readOnly/>
                                </div>
                                <div className={`${global.input_group} col-3 ps-4`}>
                                    <p className={global.title}>Nama Pesanan</p>
                                    <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' readOnly/>
                                </div>
                            </div>
                            <div className={`${bootstrap['d-flex']}`}>
                                <div className={`${global.input_group} col-3 pe-2`}>
                                    <p className={global.title}>Nama Pelanggan</p>
                                    <input type="text" id='input-nama-pelanggan' name='input-nama-pelanggan' readOnly/>
                                </div>
                                <div className={`${global.input_group} col-3 ps-4`}>
                                    <p className={global.title}>Tanggal Pesan</p>
                                    <input type="date" id='input-tanggal-pesan' name='input-tanggal-pesan' readOnly/>
                                </div>
                            </div>
                            <div className={`${bootstrap['d-flex']}`}>
                                <div className={`${global.input_group} col-3 pe-2`}>
                                    <p className={global.title}>Nama Produk</p>
                                    <input type="text" id='input-nama-produk' name='input-nama-produk' readOnly/>
                                </div>
                                <div className={`${global.input_group} col-3 ps-4`}>
                                    <p className={global.title}>Tanggal Mulai</p>
                                    <input type="date" id='input-tanggal-mulai' name='input-tanggal-mulai' readOnly/>
                                </div>
                            </div>
                            <div className={`${bootstrap['d-flex']}`}>
                                <div className={`${global.input_group} col-3 pe-2`}>
                                    <p className={global.title}>Jumlah</p>
                                    <input type="text" id='input-jumlah' name='input-jumlah' readOnly/>
                                </div>
                                <div className={`${global.input_group} col-3 ps-4`}>
                                    <p className={global.title}>Tanggal Selesai</p>
                                    <input type="date" id='input-tanggal-selesai' name='input-tanggal-selesai' readOnly/>
                                </div>
                            </div>
                            <div className={`${global.card}`}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Perhitungan Harga Pokok</p>
                                </div>
                            <div className={`table-responsive`}>
                                    <table id='table-data' className={`table table-bordered table-striped table-hover w-100`}>
                                        <thead className='text-center'>
                                            <tr>
                                                <td colSpan={4}>Biaya Bahan Baku</td>
                                                <td colSpan={4}>Biaya Tenaga Kerja</td>
                                                <td colSpan={4}>Biaya Overhead Pabrik</td>
                                            </tr>
                                            <tr>
                                                <td>Tgl</td>
                                                <td>Harga</td>
                                                <td>Qty</td>
                                                <td>Total</td>
                                                <td>Tgl</td>
                                                <td>TK</td>
                                                <td>Upah</td>
                                                <td>Total</td>
                                                <td>Tgl</td>
                                                <td>Harga</td>
                                                <td>Qty</td>
                                                <td>Total</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                            </div>
                            </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={`${global.title} fw-bold`} style={{fontSize: 18}}>Biaya Produksi</p>
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-4`}>
                                <p className={global.title}>Biaya Bahan Baku</p>
                                <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' readOnly/>
                            </div>
                            <div className={`${global.input_group} col-3 pe-4`}>
                                <p className={global.title}>Biaya Tenaga Kerja</p>
                                <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' readOnly/>
                            </div>
                            <div className={`${global.input_group} col-3 pe-4`}>
                                <p className={global.title}>Biaya Overhead</p>
                                <input type="text" id='input-biaya-overhead' name='input-biaya-overhead' readOnly/>
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} col-3 pe-3`}>
                                <p className={`${global.title} fw-bold`} style={{fontSize: 18}}>Harga Pokok Produksi</p>
                                <input type="text" id='input-harga-pokok-produksi' name='input-harga-pokok-produksi' readOnly/>
                            </div>
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Simpan</button>
                    </div>
                </div>   
            </>
        )
    }
}

export default hpp