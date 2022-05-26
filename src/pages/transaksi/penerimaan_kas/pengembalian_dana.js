import React, { Component } from 'react';

// Import Library
import $ from 'jquery';
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/pengembalian_dana.module.css';

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
export class pengembalian_dana extends Component {
    componentDidMount() {
        $('#table-data').DataTable();
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Pengembalian Dana</p>
                    <p className={style.pathname}>Penerimaan Kas / Pengembalian Dana </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                    <p className={global.title}>Input Penerimaan Uang atas Retur</p>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Kode Kas Masuk</p>
                                <input type="text" id='input-kode-kas-masuk' name='input-kode-kas-masuk' readOnly />
                            </div>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Kode Supplier</p>
                                <input type="text" id='input-kode-supplier' name='input-kode-supplier' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Tanggal</p>
                                <input type="date" id='input-tanggal' name='input-tanggal' />
                            </div>
                            <div className={`${global.input_group_row} col-6`}>
                                <p className={`${global.title} col-12 col-lg-4 col-md-3 pb-2 pb-md-0`}>Nama Supplier</p>
                                <input type="text" id='input-nama-supplier' name='input-nama-supplier' />
                            </div>
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Kode Retur</p>
                            <input type="text" className="col col-lg-2 col-md-3" id='input-kode-retur' name='input-kode-retur' />
                        </div>
                        <div className={`${global.input_group_row}`}>
                            <p className={`${global.title} col-12 col-lg-2 col-md-3 pb-2 pb-md-0`}>Jumlah Uang yang Diterima</p>
                            <input type="text" className="col col-lg-2 col-md-3"id='input-detail-jumlah-uang' name='input-detail-jumlah-uang' />
                            <div className='col-2 ps-2'>
                                <Select id='select-kode-akun' name='select-kode-akun' isClearable={true} isSearchable={true} options={[
                                    { value: '1', label: 'Akun 1' },
                                    { value: '2', label: 'Akun 2' }
                                ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-5 pt-2'>
                            <div>
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
            </>
        )
    }
}

export default pengembalian_dana