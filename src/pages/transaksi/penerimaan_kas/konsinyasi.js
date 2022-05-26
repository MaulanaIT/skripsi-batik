import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/kalkulator_estimasi.module.css';

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

export class konsinyasi extends Component {

    state = {
        tabSelected: 0
    }

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectTab = (index) => {
        this.setState({ tabSelected: index });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Konsinyasi</p>
                    <p className={style.pathname}>Transaksi / Penerimaan Kas / Konsinyasi</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`col-12 col-md-5 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Konsinyasi</p>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Kas Masuk</p>
                                    <input type="text" id='input-kode-kas-masuk' name='input-kode-kas-masuk' readOnly />
                                </div>
                                <div className={`${global.input_group} col-6 ps-2`}>
                                    <p className={global.title}>Tanggal</p>
                                    <input type="date" id='input-tanggal' name='input-tanggal' />
                                </div>
                            </div>
                            <div className={`${bootstrap['d-flex']}`}>
                                <div className={`${global.input_group} col-5 pe-2`}>
                                    <p className={global.title}>Kode Consignee</p>
                                    <Select id='select-kode-consignee' name='select-kode-consignee' isClearable={true} isSearchable={true} options={[
                                        { value: 'CN0001', label: 'CN0001' },
                                        { value: 'CN0002', label: 'CN0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-7 pe-2`}>
                                    <p className={global.title}>Nama Consignee</p>
                                    <Select id='select-nama-consignee' name='select-nama-consignee' isClearable={true} isSearchable={true} options={[
                                        { value: 'Consignee 1', label: 'Consignee 1' },
                                        { value: 'Consignee 2', label: 'Consignee 2' }
                                    ]} placeholder={'Select Nama Consignee...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className='d-flex'>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Jual</p>
                                <input type="text" id='input-kode-jual' name='input-kode-jual' />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Sisa Piutang</p>
                                <input type="text" id='input-sisa-piutang' name='input-sisa-piutang' />
                            </div>
                            </div>
                            <div>
                            <p className={global.title}>Pelunasan</p>
                            </div>
                            <div className='d-flex'>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Pilih Akun</p>
                                <Select id='select-jenis-akun' name='select-jenis-akun' isClearable={true} isSearchable={true} options={[
                                    { value: '1', label: 'Akun1' },
                                    { value: '2', label: 'Akun2' }
                                ]} placeholder={'Select Jenis Akun...'} styles={CustomSelect} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Terima Piutang</p>
                                <input type="text" id='input-terima-piutang' name='input-terima-piutang' />
                            </div>
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
                    <div className={`col-12 col-md-7 ps-md-2 pt-2 pt-md-0`}>
                        <div className={`${global.tab_card} pb-2`}>
                            <div className={`${global.item} ${this.state.tabSelected === 0 ? global.active : ''}`} onClick={() => this.SelectTab(0)}>
                                <p className={`${global.name}`}>Belum Lunas</p>
                            </div>
                            <div className={`${global.item} ${this.state.tabSelected === 1 ? global.active : ''}`} onClick={() => this.SelectTab(1)}>
                                <p className={`${global.name}`}>Sudah Lunas</p>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 0 ? '' : 'd-none'}`}>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Jual</td>
                                            <td>Tanggal</td>
                                            <td>Kode Consignee</td>
                                            <td>Nama Consignee</td>
                                            <td>Jumlah Piutang</td>
                                            <td>Terima Piutang</td>
                                            <td>Sisa Piutang</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 1 ? '' : 'd-none'}`}>
                            <div className={`table-responsive`}>
                                    <table id='table-data' className={`table w-100`}>
                                        <thead className='text-nowrap'>
                                            <tr>
                                                <td>No.</td>
                                                <td>Kode Jual</td>
                                                <td>Tanggal</td>
                                                <td>Kode Consignee</td>
                                                <td>Nama Consignee</td>
                                                <td>Jumlah Piutang</td>
                                                <td>Aksi</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </>
        )
    }
}

export default konsinyasi