import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/transaksi_penjualan.module.css';

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

export class transaksi_penjualan extends Component {

    state = {
        jenisTransaksi: '',
    }

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectTransaksi = (value) => {
        this.setState({ jenisTransaksi: value ? value.value : '' });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Transaksi Penjualan</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Penjualan</p>
                            </div>
                            <div className={global.input_group}>
                                <p className={global.title}>Jenis Transaksi</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Tunai', label: 'Tunai' },
                                    { value: 'Konsinyasi', label: 'Konsinyasi' },
                                    { value: 'Pesanan', label: 'Pesanan' }
                                ]} placeholder={'Select Transaksi...'} styles={CustomSelect} onChange={(value) => this.SelectTransaksi(value)} />
                            </div>
                            {this.state.jenisTransaksi !== '' ?
                                <>
                                    <div className={`${bootstrap['d-flex']}`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Jual</p>
                                            <input type="text" id='input-kode-jual' name='input-kode-jual' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Tanggal</p>
                                            <input type="date" id='input-tanggal-jual' name='input-tanggal-jual' />
                                        </div>
                                    </div>
                                    {this.state.jenisTransaksi === 'Tunai' ?
                                        <>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Customer</p>
                                                    <Select id='select-kode-customer' name='select-kode-customer' isClearable={true} isSearchable={true} options={[
                                                        { value: 'CS0001', label: 'CS0001' },
                                                        { value: 'CS0002', label: 'CS0002' }
                                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Customer</p>
                                                    <Select id='select-nama-customer' name='select-nama-customer' isClearable={true} isSearchable={true} options={[
                                                        { value: 'Customer 1', label: 'Customer 1' },
                                                        { value: 'Customer 2', label: 'Customer 2' }
                                                    ]} placeholder={'Select Nama Customer...'} styles={CustomSelect} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Produk</p>
                                                    <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                                        { value: 'PROD0001', label: 'PROD0001' },
                                                        { value: 'PROD0002', label: 'PROD0002' }
                                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Produk</p>
                                                    <input type="text" id='input-nama-produk' name='input-nama-produk' placeholder='Nama Produk...' />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-4 pe-2`}>
                                                    <p className={global.title}>Jumlah</p>
                                                    <input type="text" id='input-jumlah-jual' name='input-jumlah-jual' readOnly />
                                                </div>
                                                <div className={`${global.input_group} col-4 px-2`}>
                                                    <p className={global.title}>Harga</p>
                                                    <input type="text" id='input-harga-jual' name='input-harga-jual' />
                                                </div>
                                                <div className={`${global.input_group} col-4 ps-2`}>
                                                    <p className={global.title}>Total Harga</p>
                                                    <input type="text" id='input-total-harga-jual' name='input-total-harga-jual' />
                                                </div>
                                            </div>
                                            <button type='button' className={global.button}><MdAdd /> Tambah</button>
                                        </>
                                        :
                                    this.state.jenisTransaksi === 'Pesanan' ?
                                        <>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Customer</p>
                                                    <Select id='select-kode-customer' name='select-kode-customer' isClearable={true} isSearchable={true} options={[
                                                        { value: 'CS0001', label: 'CS0001' },
                                                        { value: 'CS0002', label: 'CS0002' }
                                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Customer</p>
                                                    <Select id='select-nama-customer' name='select-nama-customer' isClearable={true} isSearchable={true} options={[
                                                        { value: 'Customer 1', label: 'Customer 1' },
                                                        { value: 'Customer 2', label: 'Customer 2' }
                                                    ]} placeholder={'Select Nama Customer...'} styles={CustomSelect} />
                                                </div>
                                            </div>
                                            <div className={`${global.input_group} col-6 pe-2`}>
                                                <p className={global.title}>Kode Kas Masuk</p>
                                                <input type="text" id='input-kode-kas-masuk' name='input-kode-kas-masuk' />
                                            </div>
                                        </>
                                        :
                                        <>
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
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Produk</p>
                                                    <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                                        { value: 'PROD0001', label: 'PROD0001' },
                                                        { value: 'PROD0002', label: 'PROD0002' }
                                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Produk</p>
                                                    <input type="text" id='input-nama-produk' name='input-nama-produk' placeholder='Nama Produk...' />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-4 pe-2`}>
                                                    <p className={global.title}>Jumlah</p>
                                                    <input type="text" id='input-jumlah-jual' name='input-jumlah-jual' readOnly />
                                                </div>
                                                <div className={`${global.input_group} col-4 px-2`}>
                                                    <p className={global.title}>Harga</p>
                                                    <input type="text" id='input-harga-jual' name='input-harga-jual' />
                                                </div>
                                                <div className={`${global.input_group} col-4 ps-2`}>
                                                    <p className={global.title}>Total Harga</p>
                                                    <input type="text" id='input-total-harga-jual' name='input-total-harga-jual' />
                                                </div>
                                            </div>
                                            <button type='button' className={global.button}><MdAdd /> Tambah</button>
                                        </>
                                    }
                                </>
                                : null}
                        </div>
                    </div>
                    {this.state.jenisTransaksi !== '' ?
                        <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                            <div className={`${global.card}`}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Daftar Penjualan</p>
                                </div>
                                    {this.state.jenisTransaksi === 'Tunai' ?
                                        <>
                                            <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Kode Produk</td>
                                                            <td>Nama Produk</td>
                                                            <td>Jumlah Jual</td>
                                                            <td>Harga Jual</td>
                                                            <td>Total Harga</td>
                                                            <td>Aksi</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Total Jual</p>
                                                    <input type="text" id='input-detail-total-jual' name='input-detail-total-jual' className={`${this.state.jenisTransaksi === 'Tunai' ? 'col-6' : 'col-9'}`} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Diskon</p>
                                                    <input type="text" id='input-detail-diskon' name='input-detail-diskon' className={`${this.state.jenisTransaksi === 'Tunai' ? 'col-6' : 'col-9'}`} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                                <input type="text" id='input-detail-ongkos-kirim' name='input-detail-ongkos-kirim' className={`col-6`} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Harga</p>
                                                <input type="text" id='input-detail-total-harga' name='input-detail-total-harga' className={`col-6`} />
                                                <div className='col-3 ps-2'>
                                                    <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                                        { value: '1', label: 'Akun 1' },
                                                        { value: '2', label: 'Akun 2' }
                                                    ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Bayar</p>
                                                <input type="text" id='input-detail-bayar' name='input-detail-bayar' className={`col-6`} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Kembalian</p>
                                                <input type="text" id='input-detail-kembalian' name='input-detail-kembalian' className={`col-6`} />
                                            </div>
                                        </>
                                        :
                                    this.state.jenisTransaksi === 'Pesanan' ?
                                        <>
                                        <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Kode Pesanan</td>
                                                            <td>Nama Pesanan</td>
                                                            <td>Jumlah Jual</td>
                                                            <td>Harga Jual</td>
                                                            <td>Total Harga</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Nilai Transaksi</p>
                                                <input type="text" id='input-nilai-transaksi' name='input-nilai-transaksi' className={`col-6`} readOnly />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Uang Muka</p>
                                                <input type="text" id='input-detail-uang-muka' name='input-detail-uang-muka' className={`col-6`} readOnly />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Sisa</p>
                                                <input type="text" id='input-detail-sisa-terima-uang' name='input-detail-sisa-terima-uang' className={`col-6`} readOnly />
                                                <div className='col-3 ps-2'>
                                                    <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                                        { value: '1', label: 'Akun 1' },
                                                        { value: '2', label: 'Akun 2' }
                                                    ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Bayar</p>
                                                <input type="text" id='input-detail-bayar' name='input-detail-bayar' className={`col-6`} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Kembalian</p>
                                                <input type="text" id='input-detail-kembalian' name='input-detail-kembalian' className={`col-6`} />
                                            </div>
                                            <div className='d-flex flex-column gap-5 pt-2'>
                                                <div>
                                                    <p>Upload File Transfer</p>
                                                    <input type="file" accept='.pdf' id='input-detail-file' name='input-detail-file' />
                                                </div>
                                            </div>    
                                            
                                        </>
                                        :
                                        <>
                                            <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Kode Produk</td>
                                                            <td>Nama Produk</td>
                                                            <td>Jumlah Jual</td>
                                                            <td>Harga Jual</td>
                                                            <td>Total Harga</td>
                                                            <td>Aksi</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Total Jual</p>
                                                    <input type="text" id='input-detail-total-jual' name='input-detail-total-jual' className={`${this.state.jenisTransaksi === 'Konsinyasi' ? 'col-6' : 'col-9'}`} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Diskon</p>
                                                    <input type="text" id='input-detail-diskon' name='input-detail-diskon' className={`${this.state.jenisTransaksi === 'Konsinyasi' ? 'col-6' : 'col-9'}`} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Piutang</p>
                                                <input type="text" id='input-detail-piutang' name='input-detail-piutang' className={`${this.state.jenisTransaksi === 'Konsinyasi' ? 'col-6' : 'col-9'}`} />
                                            </div>
                                        </>
                                    }
                                    <div className='d-flex flex-column gap-2 pt-2'>
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

export default transaksi_penjualan