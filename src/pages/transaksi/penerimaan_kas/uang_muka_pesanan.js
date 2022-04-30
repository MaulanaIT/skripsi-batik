import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penerimaan_kas/uang_muka_pesanan.module.css';

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

export class uang_muka_pesanan extends Component {

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
                    <p className={style.title}>Uang Muka Pesanan</p>
                    <p className={style.pathname}>Transaksi / Penerimaan Kas / Uang Muka Pesanan</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <p className={global.title}>Input Penerimaan Uang Muka Pesanan</p>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Kode Kas Masuk</p>
                                        <input type="text" id='input-kode-kas-masuk' name='input-kode-kas-masuk' readOnly />
                                    </div>
                                    <div className={`${global.input_group} col-6 ps-2`}>
                                        <p className={global.title}>Tanggal</p>
                                        <input type="date" id='input-tanggal' name='input-tanggal' />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-3 px-2`}>
                                        <p className={global.title}>Kode Customer</p>
                                        <input type="text" id='input-kode-customer' name='input-kode-customer' />
                                    </div>
                                    <div className={`${global.input_group} col-5 ps-2`}>
                                        <p className={global.title}>Nama Customer</p>
                                        <input type="text" id='input-nama-customer' name='input-nama-customer' />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-5 pe-2`}>
                                        <p className={global.title}>Kode Pesanan</p>
                                        <Select id='select-kode-pesanan' name='select-kode-pesanan' isClearable={true} isSearchable={true} options={[
                                            { value: 'PSN0001', label: 'PSN0001' },
                                            { value: 'PSN0001', label: 'PSN0001' },
                                        ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                    </div>
                                    <div className={`${global.input_group} col-7 pe-2`}>
                                        <p className={global.title}>Nama Pesanan</p>
                                        <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' placeholder='Nama Bahan...' />
                                    </div>
                                </div>      
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Jumlah</p>
                                        <input type="text" id='input-jumlah-beli' name='input-jumlah-beli' readOnly />
                                    </div>
                                    <div className={`${global.input_group} col-4 px-2`}>
                                        <p className={global.title}>Harga</p>
                                        <input type="text" id='input-harga-beli' name='input-harga-beli' />
                                    </div>
                                    <div className={`${global.input_group} col-4 ps-2`}>
                                        <p className={global.title}>Total Harga</p>
                                        <input type="text" id='input-total-harga-beli' name='input-total-harga-beli' />
                                    </div>
                                </div>
                                    <button type='button' className={global.button}><MdAdd /> Tambah</button>   
                            </div>
                        </div>  
                        <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                            <div className={global.card}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Daftar Pesanan</p>
                                </div>                          
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table table-striped table-hover w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Pesanan</td>
                                                    <td>Nama Pesanan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                    <td>Aksi</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Total Jual</p>
                                        <input type="text" id='input-detail-total-jual' name='input-detail-total-jual' className={`col-6`} />
                                    </div>
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Diskon</p>
                                        <input type="text" id='input-detail-diskon' name='input-detail-diskon' className={'col-6'} />
                                    </div>                                
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                        <input type="text" id='input-detail-ongkos-kirim' name='input-detail-ongkos-kirim' className={`col-6`} />
                                    </div>
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Total Harga</p>
                                        <input type="text" id='input-detail-total-harga' name='input-detail-total-harga' className={`col-6`} />
                                    </div>
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Uang Muka</p>
                                        <input type="text" id='input-detail-uang-muka' name='input-detail-uang-muka' className={`col-6`} />
                                        <div className='col-3 ps-2'>
                                            <Select id='select-kode-akun' name='select-kode-akun' isClearable={true} isSearchable={true} options={[
                                                { value: '1', label: 'Akun 1' },
                                                { value: '2', label: 'Akun 2' }
                                            ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Piutang</p>
                                        <input type="text" id='input-detail-piutang' name='input-detail-piutang' className={`col-6`} />
                                    </div>
                            <div className='d-flex flex-column gap-3 pt-2'>
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
                </div>
            </>
        )
    }
}
export default uang_muka_pesanan