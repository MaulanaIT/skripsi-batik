import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/produksi.module.css';

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

export class permintaanprod extends Component {

    state = {
        pilihProduksi: '',
    }

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectProduksi = (value) => {
        this.setState({ pilihProduksi: value ? value.value : '' });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Produksi</p>
                    <p className={style.pathname}>Transaksi / Produksi / Permintaan Produksi</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Permintaan Produksi</p>
                            </div>
                            <div className={global.input_group}>
                                <p className={global.title}>Pilih Produksi</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Stok', label: 'Stok' },
                                    { value: 'Pesanan', label: 'Pesanan' }
                                ]} placeholder={'Select Produksi...'} styles={CustomSelect} onChange={(value) => this.SelectProduksi(value)} />
                            </div>
                            {this.state.pilihProduksi === 'Stok' ?
                                <>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Permintaan</p>
                                            <input type="text" className={global.input1} id='input-kode-permintaan' name='input-kode-permintaan' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Kode Produk</p>
                                            <input type="text" className={global.input2} id='input-kode-produk' name='input-kode-produk' />
                                        </div>
                                    </div>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Nama Produk</p>
                                            <input type="text" className={`${global.input3}`} id='input-nama-produk' name='input-nama-produk' />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Jumlah Produksi</p>
                                            <input type="text" className={global.input3} id='input-jumlah-produksi' name='input-jumlah-produksi' />
                                        </div>
                                    </div>
                                    <button type='button' className={global.button}><MdAdd /> Simpan</button>
                                    <div className={`${global.card} col-12`}>
                                        <div className={`${global.header}`}>
                                            <p className={global.title}>Daftar Permintaan Produksi Stok</p>
                                        </div>
                                        <div className={global.card}>
                                            <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead className="align-middle text-center text-nowrap">
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Kode Permintaan</th>
                                                            <th>Kode Produk</th>
                                                            <th>Nama Produk</th>
                                                            <th>Jumlah Produksi</th>
                                                            <th>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : 
                                this.state.pilihProduksi === 'Pesanan' ?
                                <>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Permintaan</p>
                                            <input type="text" className={global.input1} id='input-kode-permintaan' name='input-kode-permintaan' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Kode Pesanan</p>
                                            <input type="text" className={global.input2} id='input-kode-pesanan' name='input-kode-pesanan' />
                                        </div>
                                    </div>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Nama Pesanan</p>
                                            <input type="text" className={global.input1} id='input-nama-pesanan' name='input-nama-pesanan' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Nama Customer</p>
                                            <input type="text" className={global.input2} id='input-nama-customer' name='input-nama-customer' />
                                        </div>
                                    </div>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Jumlah Pesanan</p>
                                            <input type="text" className={global.input1} id='input-jumlah-pesanan' name='input-jumlah-pesanan' readOnly />
                                        </div>
                                    </div>
                                        <button type='button' className={global.button}><MdAdd /> Simpan</button> 
                                        <div className={`${global.card} col-12`}>
                                        <div className={`${global.header}`}>
                                            <p className={global.title}>Daftar Permintaan Produksi Pesanan</p>
                                        </div>
                                        <div className={global.card}>
                                            <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead className="align-middle text-center text-nowrap">
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Kode Permintaan</th>
                                                            <th>Kode Pesanan</th>
                                                            <th>Nama Pesanan</th>
                                                            <th>Nama Customer</th>
                                                            <th>Jumlah Pesanan</th>
                                                            <th>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                                }
                                    
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}

export default permintaanprod