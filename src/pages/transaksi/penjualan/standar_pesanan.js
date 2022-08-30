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
        color: 'black',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'black'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)',
        color: state.isSelected ? 'rgba(0, 0, 0, 0.6)' : 'black',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(0, 0, 0, 0.8)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'black',
        fontSize: 12
    })
}

export class standar_pesanan extends Component {

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
                    <p className={style.title}>Standar Pesanan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Perhitungan Harga / Kalkulator Estimasi</p>
                </div>
                <div className={`${style.content}`}>
                <div className={`col-12`}>
                    <div className={`${global.card}`}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Tambah Standar Pesanan</p>
                        </div>
                        <div className='d-flex'>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Standar</p>
                                <input type="text" id='input-kode-standar' name='input-kode-standar' />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Tanggal</p>
                                <input type="date" id='input-nama-standar' name='input-nama-standar' />
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
                    <div className={`col-12`}>
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
                                <table id='table-data-bahan-baku' className={`table w-100`}>
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
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Bahan Baku</p>
                                    <input type="text" id='input-total-bahan-baku' name='input-total-bahan-baku' />
                                </div>
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
                                <table id='table-data-bop-penolong' className={`table w-100`}>
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
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total BOP Penolong</p>
                                    <input type="text" id='input-total-bahan-penolong' name='input-total-bahan-penolong' />
                                </div>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 2 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode Alat</p>
                                    <Select id='select-kode-bahan-bop-alat' name='select-kode-bahan-bop-alat' isClearable={true} isSearchable={true} options={[
                                        { value: 'B0001', label: 'B0001' },
                                        { value: 'B0002', label: 'B0002' }
                                    ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-8 px-2`}>
                                    <p className={global.title}>Nama Alat</p>
                                    <Select id='select-nama-bahan-bop-alat' name='select-nama-bahan-bop-alat' isClearable={true} isSearchable={true} options={[
                                        { value: 'Bahan 1', label: 'Bahan 1' },
                                        { value: 'Bahan 2', label: 'Bahan 2' }
                                    ]} placeholder={'Select Nama Bahan...'} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Tarif</p>
                                    <input type="text" id='input-harga-bop-alat' name='input-harga-bop-alat' />
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Jumlah Kain</p>
                                    <input type="text" id='input-harga-bop-alat' name='input-harga-bop-alat' />
                                </div>
                                <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                    <p className={global.title}>Aksi</p>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                </div>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data-bop-alat' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Alat</td>
                                            <td>Nama Alat</td>
                                            <td>Jumlah Kain</td>
                                            <td>Harga</td>
                                            <td>Biaya</td>
                                            <td>Aksi</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total BOP Alat</p>
                                    <input type="text" id='input-total-bahan-baku' name='input-total-bahan-baku' />
                                </div>
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
                                <table id='table-data-btkl' className={`table w-100`}>
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
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total BTKL</p>
                                    <input type="text" id='input-total-bahan-baku' name='input-total-bahan-baku' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default standar_pesanan