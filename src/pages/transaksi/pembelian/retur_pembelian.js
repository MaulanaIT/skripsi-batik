import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/retur_pembelian.module.css';

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

export class retur_pembelian extends Component {

    state = {
        jenisRetur: '',
    }

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectRetur = (value) => {
        this.setState({ jenisRetur: value ? value.value : '' });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Retur Pembelian</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Retur Pembelian</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <p className={global.title}>Input Retur Pembelian</p>
                            <div className={`${global.input_group} col-4 pe-2`}>
                                <p className={global.title}>Jenis Retur</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Bahan', label: 'Bahan' },
                                    { value: 'Alat', label: 'Alat' }
                                ]} placeholder={'Select Retur...'} styles={CustomSelect} onChange={(value) => this.SelectRetur(value)} />
                            </div>
                            {this.state.jenisRetur !== '' ?
                                <>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Kode Retur</p>
                                        <input type="text" id='input-kode-retur' name='input-kode-retur' maxLength={10} readOnly />
                                    </div>
                                    <div className={`${global.input_group} col-6 ps-2`}>
                                        <p className={global.title}>Tanggal</p>
                                        <input type="date" id='input-tanggal-retur' name='input-tanggal-retur' />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Tanggal Terima</p>
                                        <input type="date" id='input-tanggal-terima' name='input-tanggal-terima' />
                                    </div>
                                    <div className={`${global.input_group} col-6 ps-2`}>
                                        <p className={global.title}>Kode Penerimaan</p>
                                        <input type="text" id='input-kode-penerimaan' name='input-kode-penerimaan' maxLength={10} />
                                    </div>
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-3 px-2`}>
                                        <p className={global.title}>Kode Supplier</p>
                                        <input type="text" id='input-kode-supplier' name='input-kode-supplier' maxLength={10} />
                                    </div>
                                    <div className={`${global.input_group} col-5 ps-2`}>
                                        <p className={global.title}>Nama Supplier</p>
                                        <input type="text" id='input-nama-supplier' name='input-nama-supplier' maxLength={50} />
                                    </div>
                                </div>
                                {this.state.jenisRetur === 'Bahan' ?
                                    <>
                                        <div className={`d-flex`}>
                                            <div className={`${global.input_group} col-5 pe-2`}>
                                                <p className={global.title}>Kode Bahan</p>
                                                <Select id='select-kode-bahan' name='select-kode-bahan' isClearable={true} isSearchable={true} options={[
                                                    { value: 'BB0001', label: 'BB0001' },
                                                    { value: 'BP0001', label: 'BP0001' },
                                                ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                            </div>
                                            <div className={`${global.input_group} col-7 pe-2`}>
                                                <p className={global.title}>Nama Bahan</p>
                                                <input type="text" id='input-nama-bahan' name='input-nama-bahan' placeholder='Nama Bahan...' />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className={`d-flex`}>
                                            <div className={`${global.input_group} col-5 pe-2`}>
                                                <p className={global.title}>Kode Alat</p>
                                                <Select id='select-kode-alat' name='select-kode-alat' isClearable={true} isSearchable={true} options={[
                                                    { value: 'ALAT0001', label: 'ALAT0001' }
                                                ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                            </div>
                                            <div className={`${global.input_group} col-7 pe-2`}>
                                                <p className={global.title}>Nama Alat</p>
                                                <input type="text" id='input-nama-alat' name='input-nama-alat' placeholder='Nama Alat...' />
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-4 pe-2`}>
                                        <p className={global.title}>Jumlah Retur</p>
                                        <input type="text" id='input-jumlah-retur' name='input-jumlah-retur' />
                                    </div>
                                    <div className={`${global.input_group} col-4 px-2`}>
                                        <p className={global.title}>Harga</p>
                                        <input type="text" id='input-harga' name='input-harga' readOnly/>
                                    </div>
                                    <div className={`${global.input_group} col-4 ps-2`}>
                                        <p className={global.title}>Total Harga</p>
                                        <input type="text" id='input-total-harga' name='input-total-harga' />
                                    </div>
                                </div>
                                    <button type='button' className={global.button}><MdAdd /> Tambah</button>
                                </>
                                :null}    
                            </div>
                        </div>
                    {this.state.jenisRetur !== '' ?   
                        <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                            <div className={global.card}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Daftar Retur Pembelian</p>
                                </div>
                                {this.state.jenisRetur === 'Bahan' ?
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Bahan</td>
                                                    <td>Nama Bahan</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah Retur</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                    <td>Aksi</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode Alat</td>
                                                    <td>Nama Alat</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah Retur</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                    <td>Aksi</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </>
                                }
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Harga</p>
                                    <input type="text" id='input-detail-total-jual' name='input-detail-total-jual' />
                                </div>
                                <div className='align-items-center d-flex justify-content-between'>
                                    <p>Upload Nota Pembelian</p>
                                    <input type="file" accept='.pdf' id='input-detail-file' name='input-detail-file' />
                                </div>
                            </div>
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
export default retur_pembelian