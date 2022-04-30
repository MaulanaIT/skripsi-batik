import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/pengeluaran_kas.module.css';

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
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export class pengeluaran_kas extends Component {

    state = {
        jenisPembelian: '',
    }

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectPembelian = (value) => {
        this.setState({ jenisPembelian: value ? value.value : '' });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Pengeluaran Kas</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Pengeluaran Kas</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <p className={global.title}>Input Pengeluaran Kas</p>
                            <div className={`${global.input_group} col-4 pe-2`}>
                                <p className={global.title}>Jenis Pembelian</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Bahan', label: 'Bahan' },
                                    { value: 'Alat', label: 'Alat' }
                                ]} placeholder={'Select Pembelian...'} styles={CustomSelect} onChange={(value) => this.SelectPembelian(value)} />
                            </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Kode Kas Keluar</p>
                                        <input type="text" id='input-kode-kas-keluar' name='input-kode-kas-keluar' readOnly />
                                    </div>
                                    <div className={`${global.input_group} col-6 ps-2`}>
                                        <p className={global.title}>Tanggal Bayar</p>
                                        <input type="date" id='input-tanggal-bayar' name='input-tanggal-bayar' />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-3 px-2`}>
                                        <p className={global.title}>Kode Order</p>
                                        <input type="text" id='input-kode-order' name='input-kode-order' />
                                    </div>
                                    <div className={`${global.input_group} col-5 ps-2`}>
                                        <p className={global.title}>Tanggal Order</p>
                                        <input type="text" id='input-tanggal-order' name='input-tanggal-order' readOnly/>
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-3 px-2`}>
                                        <p className={global.title}>Kode Supplier</p>
                                        <input type="text" id='input-kode-supplier' name='input-kode-supplier' readOnly/>
                                    </div>
                                    <div className={`${global.input_group} col-5 ps-2`}>
                                        <p className={global.title}>Nama Supplier</p>
                                        <input type="text" id='input-nama-supplier' name='input-nama-supplier' readOnly/>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    {this.state.jenisPembelian !== '' ?   
                        <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                            <div className={global.card}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Daftar Pembelian</p>
                                </div>
                                {this.state.jenisPembelian === 'Bahan' ?
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table table-striped table-hover w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Bahan</td>
                                                    <td>Nama Bahan</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table table-striped table-hover w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Alat</td>
                                                    <td>Nama Alat</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </>
                                }
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Pembelian</p>
                                    <input type="text" id='input-detail-total-pembelian' name='input-detail-total-pembelian' className={`col-6`} />
                                </div>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Diskon</p>
                                    <input type="text" id='input-detail-diskon' name='input-detail-diskon' className={`col-6`} />
                                </div>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                    <input type="text" id='input-detail-ongkos-kirim' name='input-detail-ongkos-kirim' className={`col-6`} />
                                </div>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Bayar</p>
                                    <input type="text" id='input-detail-total-harga' name='input-detail-total-harga' className={`col-6`} />
                                    <div className='col-3 ps-2'>
                                        <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                            { value: '1', label: 'Akun 1' },
                                            { value: '2', label: 'Akun 2' }
                                        ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-column gap-2 pt-2'>
                                <div className='align-items-center d-flex justify-content-between'>
                                    <p>Upload File Transfer</p>
                                    <input type="file" accept='.pdf' id='input-detail-file' name='input-detail-file' />
                                </div>
                                <div className='d-flex'>
                                    <div className='col-6 pe-2'>
                                        <button type='button' className={`${global.button} w-100`}>Simpan</button>
                                    </div>
                                    <div className='col-6 ps-2'>
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    : null}
                </div>
            </>
        )
    }
}
export default pengeluaran_kas