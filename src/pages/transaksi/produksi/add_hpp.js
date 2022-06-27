import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import {FiXCircle} from 'react-icons/fi';
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

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

export class add_hpp extends Component {

    CloseDetail = () => {
        document.getElementById('add_hpp').classList.add('d-none');
    }

    state = {
        tabSelected: 0
    }

    componentDidMount() {
        $('#table-data-biaya-bahan-baku').DataTable();
        $('#table-data-bop-bahan-penolong').DataTable();
        $('#table-data-bop-alat').DataTable();
        $('#table-data-biaya-tenaga-kerja').DataTable();
    }

    SelectTab = (index) => {
        this.setState({ tabSelected: index });
    }

    render() {
        return (
            <>
            <div id='add_hpp' className={`${global.loading_background} d-none`}>
                <div><FiXCircle className='fs-4 col-12' onclick={this.CloseDetail} />
                    <div className={style.content}>
                        <div className={global.card_detail}>
                            <p className={global.title}>Tambah Perhitungan Harga Pokok Produksi</p>
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
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 0 ? '' : 'd-none'}`}>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Biaya Bahan Baku </p>
                                            <input type="text" id='input-kode-biaya-bahan-baku' name='input-biaya-bahan-baku' />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Tanggal </p>
                                            <input type="date" id='input-tanggal-bbb' name='input-tanggal-bbb' />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Produksi </p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' />
                                        </div>
                                        <div className={`${global.input_group} col-8 px-2`}>
                                            <p className={global.title}>Kode Permintaan Bahan</p>
                                            <input type="text" id='input-kode-permintaan-bahan' name='input-kode-permintaan-bahan' />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-8 pe-2`}>
                                            <p className={global.title}>Pilih Bahan Baku</p>
                                            <Select id='select-nama-bahan-bahan-baku' name='select-nama-bahan-bahan-baku' isClearable={true} isSearchable={true} options={[
                                                { value: 'Bahan 1', label: 'Bahan 1' },
                                                { value: 'Bahan 2', label: 'Bahan 2' }
                                            ]} placeholder={'Select Nama Bahan...'} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Harga</p>
                                            <input type="text" id='input-harga-bahan-baku' name='input-harga-bahan-baku' readOnly />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='input-jumlah-bahan-baku' name='input-jumlah-bahan-baku' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Biaya</p>
                                            <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
                                    <div className={`table-responsive`}>
                                        <table id='table-data-biaya-bahan-baku' className={`table w-100`}>
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
                                    <div className={`${global.input_group} col-12 ms-auto`}>
                                        <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Simpan</button>
                                    </div>
                                </div>
                            <div className={`${global.card} ${this.state.tabSelected === 1 ? '' : 'd-none'}`}>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Biaya Bahan Penolong </p>
                                            <input type="text" id='input-kode-biaya-bahan-penolong' name='input-biaya-bahan-penolong' />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Tanggal </p>
                                            <input type="date" id='input-tanggal-bop-penolong' name='input-tanggal-bop-penolong' />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Produksi </p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' />
                                        </div>
                                        <div className={`${global.input_group} col-8 px-2`}>
                                            <p className={global.title}>Kode Permintaan Bahan</p>
                                            <input type="text" id='input-kode-permintaan-bahan' name='input-kode-permintaan-bahan' />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-8 pe-2`}>
                                            <p className={global.title}>Pilih Bahan Penolong</p>
                                            <Select id='select-nama-bahan-bahan-penolong' name='select-nama-bahan-bahan-penolong' isClearable={true} isSearchable={true} options={[
                                                { value: 'Bahan Penolong 1', label: 'Bahan Penolong 1' },
                                                { value: 'Bahan Penolong 2', label: 'Bahan Penolong 2' }
                                            ]} placeholder={'Select Nama Bahan...'} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Harga</p>
                                            <input type="text" id='input-harga-bahan-penolong' name='input-harga-bahan-penolong' readOnly />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='input-jumlah-bahan-penolong' name='input-jumlah-bahan-penolong' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Biaya</p>
                                            <input type="text" id='input-biaya-bahan-penolong' name='input-biaya-bahan-penolong' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
                                    <div className={`table-responsive`}>
                                        <table id='table-data-bop-bahan-penolong' className={`table w-100`}>
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
                                    <div className={`${global.input_group} col-12 ms-auto`}>
                                        <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Simpan</button>
                                    </div>
                                </div>
                            <div className={`${global.card} ${this.state.tabSelected === 2 ? '' : 'd-none'}`}>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Kode BOP Alat </p>
                                        <input type="text" id='input-kode-bop-alat' name='input-kode-bop-alat' />
                                    </div>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Kode Produksi </p>
                                        <input type="text" id='input-kode-produksi' name='input-kode-produksi' />
                                    </div>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Tanggal </p>
                                        <input type="date" id='input-tanggal-bop-alat' name='input-tanggal-bop-alat' />
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Kode Alat</p>
                                        <Select id='select-kode-bop-alat' name='select-kode-bop-alat' isClearable={true} isSearchable={true} options={[
                                            { value: 'B0001', label: 'B0001' },
                                            { value: 'B0002', label: 'B0002' }
                                        ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                    </div>
                                    <div className={`${global.input_group} col-8 px-2`}>
                                        <p className={global.title}>Nama Alat</p>
                                        <Select id='select-nama-bop-alat' name='select-nama-bop-alat' isClearable={true} isSearchable={true} options={[
                                            { value: 'Alat 1', label: 'Alat 1' },
                                            { value: 'Alat 2', label: 'Alat 2' }
                                        ]} placeholder={'Select Nama Alat...'} styles={CustomSelect} />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                <div className={`${global.input_group} col-12 pe-2`}>
                                        <p className={global.title}>Tarif</p>
                                        <input type="text" id='input-tarif-bop-alat' name='input-tarif-bop-alat' />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-4 px-2`}>
                                        <p className={global.title}>Pemakaian</p>
                                        <input type="text" id='input-pemakaian-bop-alat' name='input-pemakian-bop-alat' />
                                    </div>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Biaya</p>
                                        <input type="text" id='input-biaya-bop-alat' name='input-biaya-bop-alat' />
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
                                                <td>Tarif</td>
                                                <td>Pemakaian</td>
                                                <td>Biaya</td>
                                                <td>Aksi</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div className={`${global.input_group} col-12 ms-auto`}>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Simpan</button>
                                </div>
                            </div>
                        <div className={`${global.card} ${this.state.tabSelected === 3 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Biaya Tenaga Kerja </p>
                                            <input type="text" id='input-kode-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Produksi </p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Tanggal </p>
                                            <input type="date" id='input-tanggal-btk' name='input-tanggal-btk' />
                                        </div>
                                    </div>
                            <div className='d-flex'>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Kode Tenaga Kerja</p>
                                        <input type="text" id='input-kode-tenaga-kerja' name='input-kode-tenaga-kerja' readOnly />
                                    </div>
                                    <div className={`${global.input_group} col-8 px-2`}>
                                        <p className={global.title}>Departemen</p>
                                        <Select id='select-departemen' name='select-departemen' isClearable={true} isSearchable={true} options={[
                                            { value: 'Desain', label: 'Desain' },
                                            { value: 'Canting', label: 'Canting' },
                                            { value: 'Warna', label: 'Warna' },
                                            { value: 'Packing', label: 'Packing' }
                                        ]} placeholder={'Select Departemen...'} styles={CustomSelect} />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-8 pe-2`}>
                                        <p className={global.title}>Nama Tenaga Kerja</p>
                                        <input type="text" id='input-nama-tenaga-kerja' name='input-nama-tenaga-kerja' />
                                    </div>
                                    <div className={`${global.input_group} col-4 px-2`}>
                                        <p className={global.title}>Upah</p>
                                        <input type="text" id='input-upah-tenaga-kerja' name='input-upah-tenaga-kerja' />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Jumlah Pengerjaan</p>
                                        <input type="text" id='input-jumlah-pengerjaan' name='input-jumlah-pengerjaan' />
                                    </div>
                                    <div className={`${global.input_group} col-4 px-2`}>
                                        <p className={global.title}>Biaya</p>
                                        <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' />
                                    </div>
                                    <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                        <p className={global.title}>Aksi</p>
                                        <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Tambah</button>
                                    </div>
                                </div>
                                <div className={`table-responsive`}>
                                    <table id='table-data-biaya-tenaga-kerja' className={`table w-100`}>
                                        <thead className='text-nowrap'>
                                            <tr>
                                                <td>No.</td>
                                                <td>Kode Tenaga Kerja</td>
                                                <td>Departemen</td>
                                                <td>Nama Tenaga Kerja</td>
                                                <td>Upah</td>
                                                <td>Jumlah Pengerjaan</td>
                                                <td>Biaya</td>
                                                <td>Aksi</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div className={`${global.input_group} col-12 ms-auto`}>
                                    <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }}><MdAdd /> Simpan</button>
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

export default add_hpp