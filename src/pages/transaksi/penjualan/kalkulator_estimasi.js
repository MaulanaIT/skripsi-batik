import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
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

export class kalkulator_estimasi extends Component {

    state = {
        tabSelected: 0
    }

    componentDidMount() {
        $('#table-data-bahan-baku').DataTable();
    }

    SelectTab = (index) => {
        this.setState({ tabSelected: index });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Perhitungan Harga / Kalkulator Estimasi</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`col-12 col-md-5 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Kalkulator Estimasi</p>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Pesanan</p>
                                    <input type="text" id='input-kode-pesanan' name='input-kode-pesanan' readOnly />
                                </div>
                                <div className={`${global.input_group} col-6 ps-2`}>
                                    <p className={global.title}>Tanggal</p>
                                    <input type="date" id='input-tanggal-pesanan' name='input-tanggal-pesanan' />
                                </div>
                            </div>
                            <div className={`${global.input_group}`}>
                                <p className={global.title}>Nama Pesanan</p>
                                <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' />
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode Customer</p>
                                    <Select id='select-kode-customer' name='select-kode-customer' isClearable={true} isSearchable={true} options={[
                                        { value: 'C0001', label: 'C0001' },
                                        { value: 'C0002', label: 'C0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-8 ps-2`}>
                                    <p className={global.title}>Nama Customer</p>
                                    <Select id='select-nama-customer' name='select-nama-customer' isClearable={true} isSearchable={true} options={[
                                        { value: 'Customer 1', label: 'Customer 1' },
                                        { value: 'Customer 2', label: 'Customer 2' }
                                    ]} placeholder={'Select Nama Customer...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`${global.input_group}`}>
                                <p className={global.title}>Jenis Produk</p>
                                <Select id='select-jenis-produk' name='select-jenis-produk' isClearable={true} isSearchable={true} options={[
                                    { value: 'Alat', label: 'Alat' },
                                    { value: 'Bahan', label: 'Bahan' }
                                ]} placeholder={'Select Jenis Produk...'} styles={CustomSelect} />
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Jumlah</p>
                                    <input type="text" id='input-jumlah-pesanan' name='input-jumlah-pesanan' />
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>HPP</p>
                                    <input type="text" id='input-hpp-pesanan' name='input-hpp-pesanan' readOnly />
                                </div>
                                <div className={`${global.input_group} col-4 ps-2`}>
                                    <p className={global.title}>% Profit</p>
                                    <input type="text" id='input-profit-pesanan' name='input-profit-pesanan' />
                                </div>
                            </div>
                            <div className={`${global.input_group}`}>
                                <p className={global.title}>Harga Jual</p>
                                <input type="text" id='input-harga-jual-pesanan' name='input-harga-jual-pesanan' readOnly />
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
                                <p className={`${global.name}`}>Bahan Baku</p>
                            </div>
                            <div className={`${global.item} ${this.state.tabSelected === 1 ? global.active : ''}`} onClick={() => this.SelectTab(1)}>
                                <p className={`${global.name}`}>BOP (Penolong)</p>
                            </div>
                            <div className={`${global.item} ${this.state.tabSelected === 2 ? global.active : ''}`} onClick={() => this.SelectTab(2)}>
                                <p className={`${global.name}`}>BOP (Alat)</p>
                            </div>
                            <div className={`${global.item} ${this.state.tabSelected === 3 ? global.active : ''}`} onClick={() => this.SelectTab(3)}>
                                <p className={`${global.name}`}>BTKL</p>
                            </div>
                            <div className={`${global.item} ${this.state.tabSelected === 4 ? global.active : ''}`} onClick={() => this.SelectTab(4)}>
                                <p className={`${global.name}`}>Catatan Pesanan</p>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 0 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode Bahan</p>
                                    <Select id='select-kode-bahan-bahan-baku' name='select-kode-bahan-bahan-baku' isClearable={true} isSearchable={true} options={[
                                        { value: 'B0001', label: 'B0001' },
                                        { value: 'B0002', label: 'B0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-8 px-2`}>
                                    <p className={global.title}>Nama Bahan</p>
                                    <Select id='select-nama-bahan-bahan-baku' name='select-nama-bahan-bahan-baku' isClearable={true} isSearchable={true} options={[
                                        { value: 'Bahan 1', label: 'Bahan 1' },
                                        { value: 'Bahan 2', label: 'Bahan 2' }
                                    ]} placeholder={'Select Nama Bahan...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Harga</p>
                                    <input type="text" id='input-harga-bahan-baku' name='input-harga-bahan-baku' />
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Jumlah</p>
                                    <input type="text" id='input-harga-bahan-baku' name='input-harga-bahan-baku' />
                                </div>
                                <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                    <p className={global.title}>Aksi</p>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                </div>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data-bahan-baku' className={`table table-striped table-hover w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Bahan</td>
                                            <td>Nama Bahan</td>
                                            <td>Jumlah</td>
                                            <td>Harga</td>
                                            <td>Biaya</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 1 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode Bahan</p>
                                    <Select id='select-kode-bahan-bop-penolong' name='select-kode-bahan-bop-penolong' isClearable={true} isSearchable={true} options={[
                                        { value: 'B0001', label: 'B0001' },
                                        { value: 'B0002', label: 'B0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-8 px-2`}>
                                    <p className={global.title}>Nama Bahan</p>
                                    <Select id='select-nama-bahan-bop-penolong' name='select-nama-bahan-bop-penolong' isClearable={true} isSearchable={true} options={[
                                        { value: 'Bahan 1', label: 'Bahan 1' },
                                        { value: 'Bahan 2', label: 'Bahan 2' }
                                    ]} placeholder={'Select Nama Bahan...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Harga</p>
                                    <input type="text" id='input-harga-bop-penolong' name='input-harga-bop-penolong' />
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Jumlah</p>
                                    <input type="text" id='input-harga-bop-penolong' name='input-harga-bop-penolong' />
                                </div>
                                <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                    <p className={global.title}>Aksi</p>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                </div>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data-bop-penolong' className={`table table-striped table-hover w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Bahan</td>
                                            <td>Nama Bahan</td>
                                            <td>Jumlah</td>
                                            <td>Harga</td>
                                            <td>Biaya</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 2 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode Bahan</p>
                                    <Select id='select-kode-bahan-bop-alat' name='select-kode-bahan-bop-alat' isClearable={true} isSearchable={true} options={[
                                        { value: 'B0001', label: 'B0001' },
                                        { value: 'B0002', label: 'B0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-8 px-2`}>
                                    <p className={global.title}>Nama Bahan</p>
                                    <Select id='select-nama-bahan-bop-alat' name='select-nama-bahan-bop-alat' isClearable={true} isSearchable={true} options={[
                                        { value: 'Bahan 1', label: 'Bahan 1' },
                                        { value: 'Bahan 2', label: 'Bahan 2' }
                                    ]} placeholder={'Select Nama Bahan...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Harga</p>
                                    <input type="text" id='input-harga-bop-alat' name='input-harga-bop-alat' />
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Jumlah</p>
                                    <input type="text" id='input-harga-bop-alat' name='input-harga-bop-alat' />
                                </div>
                                <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                    <p className={global.title}>Aksi</p>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                </div>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data-bop-alat' className={`table table-striped table-hover w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Bahan</td>
                                            <td>Nama Bahan</td>
                                            <td>Jumlah</td>
                                            <td>Harga</td>
                                            <td>Biaya</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 3 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode BTKL</p>
                                    <Select id='select-kode-btkl' name='select-kode-btkl' isClearable={true} isSearchable={true} options={[
                                        { value: 'B0001', label: 'B0001' },
                                        { value: 'B0002', label: 'B0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-8 px-2`}>
                                    <p className={global.title}>Bagian</p>
                                    <Select id='select-bagian-btkl' name='select-bagian-btkl' isClearable={true} isSearchable={true} options={[
                                        { value: 'Bahan 1', label: 'Bahan 1' },
                                        { value: 'Bahan 2', label: 'Bahan 2' }
                                    ]} placeholder={'Select Bagian...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Tarif</p>
                                    <input type="text" id='input-tarif-btkl' name='input-tarif-btkl' />
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Jumlah Kain</p>
                                    <input type="text" id='input-jumlah-btkl' name='input-jumlah-btkl' />
                                </div>
                                <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                    <p className={global.title}>Aksi</p>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                </div>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data-btkl' className={`table table-striped table-hover w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode BTKL</td>
                                            <td>Bagian</td>
                                            <td>Jumlah</td>
                                            <td>Tarif</td>
                                            <td>Biaya</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 4 ? '' : 'd-none'}`}>
                            <div className={`${global.input_group}`}>
                                <p className={global.title}>Deskripsi Pesanan</p>
                                <textarea name="input-descripsi-pesanan" id="input-descripsi-pesanan" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default kalkulator_estimasi